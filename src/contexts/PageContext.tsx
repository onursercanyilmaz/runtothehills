import React, { createContext, useContext, useState } from "react";

interface PageContextProps {
  pageName: string;
  setPageName: React.Dispatch<React.SetStateAction<string>>;
}

const PageContext = createContext<PageContextProps | undefined>(undefined);

export const usePage = () => {
  const contextValue = useContext(PageContext);

  if (!contextValue) {
    throw new Error("usePage must be used within a PageProvider");
  }

  return contextValue;
};

export const PageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pageName, setPageName] = useState<string>("");

  const contextValue: PageContextProps = {
    pageName,
    setPageName,
  };

  return <PageContext.Provider value={contextValue}>{children}</PageContext.Provider>;
};
