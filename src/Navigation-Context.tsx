import {
  Accessor,
  Context,
  createContext,
  createMemo,
  createSignal,
  ParentProps,
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

export interface NavigationItem<T extends LinkProps | AnchorProps> {
  title: string;
  linkProps: T;
}

export type NavigationConfiguration = {
  onThisPage: NavigationItem<AnchorProps>[];
  pages: NavigationItem<LinkProps>[]; // or section-wise?
};

type NavigationContextType = [
  {
    onThisPage: Accessor<NavigationItem<AnchorProps>[]>;
    pages: Accessor<NavigationItem<LinkProps>[]>;
  },
  {
    setOnThisPage(items: NavigationItem<AnchorProps>[]): void;
    setPages(items: NavigationItem<LinkProps>[]): void;
  },
];

export const NavigationContext: Context<NavigationContextType | undefined> =
  createContext();

export const useNavigationContext = () => {
  const context = useContext(NavigationContext);
  if (!context) throw new Error("NavigationContext is not valid");
  return context;
};

export const DefaultPages: NavigationItem<LinkProps>[] = [
  {
    linkProps: { type: "link", href: "/brockmann-arc" },
    title: "Brockmanns Beethoven",
  },
  {
    linkProps: { type: "link", href: "/lerped-randomness" },
    title: "Lerped Randomness",
  },
  {
    linkProps: { type: "link", href: "/simple-functions" },
    title: "Simple Functions",
  },
];

export const NavigationProvider = (props: ParentProps) => {
  const [navigation, setNavigation] = createSignal<NavigationConfiguration>({
    onThisPage: [],
    pages: DefaultPages,
  });
  const navigationState: NavigationContextType = [
    {
      onThisPage: createMemo(() => navigation().onThisPage),
      pages: createMemo(() => navigation().pages),
    },
    {
      setOnThisPage(items: NavigationItem<AnchorProps>[]) {
        setNavigation((c) => ({
          ...c,
          onThisPage: items,
        }));
      },
      setPages(items: NavigationItem<LinkProps>[]) {
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
