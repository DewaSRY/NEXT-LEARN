import { FC, createContext, PropsWithChildren, useState } from "react";

interface LinkOption {
  url: string;
  openInWeb: boolean;
}
interface StoreContext {
  LinksState: LinkOption;

  setStoreLink: (l: LinkOption) => void;
}
export const StoreContext = createContext<StoreContext>({
  LinksState: {} as LinkOption,
  setStoreLink: () => {},
});
export const StoreProvider = ({ children }: PropsWithChildren) => {
  const [LinksState, setStoreLink] = useState<LinkOption>({
    url: "",
    openInWeb: false,
  });
  const values = {
    LinksState,
    setStoreLink,
  };

  return (
    <StoreContext.Provider value={values}>{children}</StoreContext.Provider>
  );
};
