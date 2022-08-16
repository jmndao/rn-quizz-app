import React from "react";

const TabContext = React.createContext(null);

const TabProvider = ({ children }) => {
  const [curTab, setCurTab] = React.useState("Home");

  const changeTab = (tab) => {
    setCurTab(tab);
  };

  return (
    <TabContext.Provider
      value={{
        curTab,
        changeTab,
      }}
    >
      {children}
    </TabContext.Provider>
  );
};

const useTab = () => React.useContext(TabContext);

export { TabProvider, useTab };
