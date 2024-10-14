import EmailIcon from "~/components/icons/Email-Icon";
import { FullWidth } from "~/components/layouts/Full-Width";
import Instagram from "~/components/icons/Instagram";
import LinkedIn from "~/components/icons/Linked-In";
import sgMail from "@sendgrid/mail";
import { createSignal } from "solid-js";
import { Portal } from "solid-js/web";
import { Button } from "~/components/Button";
import { Headline } from "~/components/typo/Headline";
import { useForm } from "~/components/Validation";
import { createStore } from "solid-js/store";

type ContactFormValue = {
  email: string;
  message: string;
};

const sendMail = async (
  message: ContactFormValue,
): Promise<{ success: boolean; message: string }> => {
  "use server";
  sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
  const msg = {
    to: "nikolaj@threea.io",
    from: "nikolaj@threea.io",
    replyTo: message.email,
    subject: "Website Nachricht: " + message.message.substring(0, 30) + "...",
    text: message.message,
  };
  return await sgMail
    .send(msg)
    .then(() => {
      return {
        success: true,
        message: "Email send successfully.",
      };
    })
    .catch((error: string) => {
      return {
        success: false,
        message: "Send Email failed. " + error,
      };
    });
};

export default function Contact() {
  const [open, setOpen] = createSignal(false);

  const { validate, formSubmit, errors } = useForm({
    errorClass: "!border-3a-red",
  });
  const [fields, setFields] = createStore();

  const submitFn = (form: HTMLFormElement) => {
    // form.submit();
    const data = new FormData(form);
    sendMail({
      message: data.get("message") as string,
      email: data.get("email") as string,
    })
      .then((m) => {
        form.reset();
        setOpen(false);
      })
      .catch((err) => alert(err));
  };

  return (
    <FullWidth>
      <div class="py-32">
        <div class="mx-auto w-1/3 grid grid-cols-3 ">
          <div
            class="flex flex-row justify-center"
            onClick={() => {
              setOpen(true);
            }}
          >
            <EmailIcon class="size-5 cursor-pointer" />
          </div>
          <div class="flex flex-row justify-center">
            <a href="" target="_blank" title="">
              <Instagram class="size-5" />
            </a>
          </div>

          <div class="flex flex-row justify-center">
            <a href="" target="_blank" title="">
              <LinkedIn class="size-5" />
            </a>
          </div>
        </div>
      </div>

      <Portal>
        <div
          class={`fixed inset-0 flex justify-center items-center z-50 ${open() ? "" : "pointer-events-none"}`}
        >
          <div
            class={`absolute inset-0 bg-3a-black transition-opacity ${open() ? " opacity-70 " : "opacity-0 pointer-events-none delay-200"}`}
            onClick={() => setOpen(false)}
          ></div>
          <form
            method="post"
            use:formSubmit={submitFn}
            class={`relative w-1/3 min-w-[400px] bg-3a-gray-darker p-12 rounded-lg  transition-all ${open() ? "opacity-100 translate-y-0 blur-0 delay-200" : " opacity-0 translate-y-[200px] pointer-events-none blur-lg"}`}
          >
            <Headline>
              <h3 class="mb-8">Deine Nachricht</h3>
            </Headline>

            <div class="mb-6">
              <label
                for="email"
                class="block mb-2 text-sm font-display text-3a-paper "
              >
                Deine E-Mail-Adresse
              </label>
              <input
                id="email"
                required={true}
                type="email"
                name="email"
                class="block transition-all p-2 w-full text-3a-white  bg-3a-gray-darkest placeholder:text-3a-paper focus:placeholder:text-3a-gray border border-3a-gray-darkest"
                placeholder="test@123.com"
                use:validate={[]}
              ></input>
              {errors.email && <ErrorMessage error={errors.email} />}
            </div>

            <div class="mb-6">
              <label
                for="message"
                class="block mb-2 text-sm font-display text-3a-paper "
              >
                Deine Nachricht
              </label>
              <textarea
                id="message"
                required={true}
                minLength={50}
                rows="4"
                name="message"
                class="block transition-all p-2 w-full text-3a-white bg-3a-gray-darkest placeholder:text-3a-paper focus:placeholder:text-3a-gray border border-3a-gray-darkest"
                placeholder="Schreibe hier, was auch immer du schreiben möchtest..."
                use:validate={[]}
              ></textarea>
              {errors.message && <ErrorMessage error={errors.message} />}
            </div>

            <div class="flex justify-between">
              <Button
                buttonType={"reset"}
                isBack={true}
                handleClick={() => setOpen(false)}
              >
                Zurück
              </Button>
              <Button buttonType={"submit"}>Senden</Button>
            </div>
          </form>
        </div>
      </Portal>
    </FullWidth>
  );
}

function ErrorMessage(props: { error: string }) {
  return (
    <span class="text-xs text-3a-red transition-all overflow-hidden empty:max-h-0 empty:bg-3a-red empty:opacity-0 opacity-100 max-h-100px">
      {props.error}
    </span>
  );
}
