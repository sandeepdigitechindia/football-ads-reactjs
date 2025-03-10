import React, { useContext } from "react";
import { SettingContext } from "../context/SettingContext";
const TermsOfService = () => {
  const { settingData } = useContext(SettingContext);
  
  return (
    <div className="home">
      <div className="container mx-auto py-16 px-4">
        <div className="prose prose-lg text-gray-700">
          {settingData.terms_and_conditions}
        </div>
      </div>
    </div>
  );
};
export default TermsOfService;
