import { createStore } from "solid-js/store";

interface ValidatorConfig {
  element: HTMLInputElement;
  validators: Array<(element: HTMLInputElement) => Promise<string | undefined>>;
}

type ValidationFunction = (
  element: HTMLInputElement,
) => Promise<string | undefined>;

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      formSubmit: (
        ref: HTMLFormElement,
        acessor: () => HTMLFormElement,
      ) => void;
      validate: ValidationFunction[];
    }
  }
}

interface ErrorStore {
  [key: string]: string | undefined;
}

function checkValid(
  { element, validators = [] }: ValidatorConfig,
  setErrors: (errors: Partial<ErrorStore>) => void,
  errorClass?: string,
) {
  return async () => {
    element.setCustomValidity("");
    element.checkValidity();
    let message = element.validationMessage;

    if (!message) {
      for (const validator of validators) {
        const text = await validator(element);
        if (text) {
          element.setCustomValidity(text);
          break;
        }
      }
      message = element.validationMessage;
    }

    if (message) {
      errorClass && element.classList.toggle(errorClass, true);
      setErrors({ [element.name]: message });
    }
  };
}

interface UseFormOptions {
  errorClass?: string;
}

export function useForm({ errorClass }: UseFormOptions) {
  const [errors, setErrors] = createStore<ErrorStore>({}),
    fields: Record<string, ValidatorConfig> = {};

  const validate = (
    ref: HTMLInputElement,
    accessor: () => Array<
      (element: HTMLInputElement) => Promise<string | undefined>
    >,
  ) => {
    const validators = Array.isArray(accessor()) ? accessor() : [];
    const config: ValidatorConfig = { element: ref, validators };
    fields[ref.name] = config;

    ref.onblur = checkValid(config, setErrors, errorClass);

    ref.oninput = () => {
      if (!errors[ref.name]) {
        errorClass && ref.classList.toggle(errorClass, false);
        ref.classList.toggle("!border-3a-green", true);
        return;
      }
      setErrors({ [ref.name]: undefined });
      ref.classList.toggle("!border-3a-green", false);
      errorClass && ref.classList.toggle(errorClass, true);
    };
  };

  const formSubmit = (
    ref: HTMLFormElement,
    accessor: () => ((form: HTMLFormElement) => void) | undefined,
  ) => {
    const callback = accessor() || (() => {});
    ref.setAttribute("novalidate", "");

    ref.onsubmit = async (e: Event) => {
      e.preventDefault();
      let errored = false;

      const res = {};
      for (const k in fields) {
        const field = fields[k];
        await checkValid(field, setErrors, errorClass)();
        if (!errored && field.element.validationMessage) {
          field.element.focus();
          errored = true;
        }
      }

      !errored && callback(ref);
    };
  };

  return { validate, formSubmit, errors };
}
