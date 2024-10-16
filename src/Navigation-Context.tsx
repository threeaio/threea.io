import { createStore } from "solid-js/store";
import {
  Accessor,
  Context,
  createContext,
  createMemo,
  createRoot,
  createSignal,
  ParentProps,
  Setter,
  useContext,
} from "solid-js";

export type LinkType = "link" | "anchor";

export interface BaseNavigationProps {
  type: LinkType;
}

export interface LinkProps extends BaseNavigationProps {
  type: "link";
  href: string;
}
export interface AnchorProps extends BaseNavigationProps {
  type: "anchor";
  target: string;
}

export interface NavigationItem {
  title: string;
  linkProps: LinkProps | AnchorProps;
}
// }

export type NavigationConfiguration = {
  onThisPage: NavigationItem[];
  pages: NavigationItem[]; // or section-wise?
};

type NavigationContextType = [
  {
    onThisPage: Accessor<NavigationItem[]>;
    pages: Accessor<NavigationItem[]>;
  },
  {
    setOnThisPage(items: NavigationItem[]): void;
    setPages(items: NavigationItem[]): void;
  },
];

export const NavigationContext: Context<NavigationContextType | undefined> =
  createContext();

export const useNavigationContext = () => {
  const context = useContext(NavigationContext);
  if (!context) throw new Error("NavigationContext is not valid");
  return context;
};

export const NavigationProvider = (props: ParentProps) => {
  const [navigation, setNavigation] = createSignal<NavigationConfiguration>({
    onThisPage: [],
    pages: [],
  });
  const navigationState: NavigationContextType = [
    {
      onThisPage: createMemo(() => navigation().onThisPage),
      pages: createMemo(() => navigation().pages),
    },
    {
      setOnThisPage(items: NavigationItem[]) {
        setNavigation((c) => ({
          ...c,
          onThisPage: items,
        }));
      },
      setPages(items: NavigationItem[]) {
        setNavigation((c) => ({
          ...c,
          pages: items,
        }));
      },
    },
  ];

  return (
    <NavigationContext.Provider value={navigationState}>
      {props.children}
    </NavigationContext.Provider>
  );
};
