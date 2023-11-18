import { createContext, useContext, useState } from "react";

const UiContext = createContext({toggleMenu:()=>{}});

export const UiProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleMenu = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <UiContext.Provider value={{ toggleMenu, sidebarOpen }}>
      {children}
    </UiContext.Provider>
  );
};

export const useUi = () => useContext(UiContext);
