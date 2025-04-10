// context/ApplicationContext.js
import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [appliedAds, setAppliedAds] = useState([]);

  const markAsApplied = (adId) => {
    setAppliedAds((prev) => [...prev, adId]);
  };

  const isApplied = (adId) => appliedAds.includes(adId);

  return (
    <AppContext.Provider value={{ markAsApplied, isApplied }}>
      {children}
    </AppContext.Provider>
  );
};
