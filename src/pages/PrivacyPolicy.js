import React, { useContext } from "react";
import { SettingContext } from "../context/SettingContext";
const PrivacyPolicy = () => {
  const { settingData } = useContext(SettingContext);

  return (
    <div className="home">
      <div className="container py-16 px-4 mx-auto">
        <div className="prose prose-lg text-gray-700">
          {settingData.privacy_policy}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
