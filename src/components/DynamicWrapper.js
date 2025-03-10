import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Header from "./Header";
import Footer from "./Footer";
import UserHeader from "./user/UserHeader";
import ClubHeader from "./club/ClubHeader";
import UserFooter from "./user/UserFooter";
import ClubFooter from "./club/ClubFooter";

const DynamicWrapper = ({ children }) => {
  const { user } = useContext(AuthContext);

  const renderHeader = () => {
    if (user?.role === "player") return <UserHeader />;
    if (
      user?.role === "club" ||
      user?.role === "coach" ||
      user?.role === "agent"
    )
      return <ClubHeader />;
    return <Header />;
  };

  const renderFooter = () => {
    if (user?.role === "player") return <UserFooter />;
    if (
      user?.role === "club" ||
      user?.role === "coach" ||
      user?.role === "agent"
    )
      return <ClubFooter />;
    return <Footer />;
  };

  return (
    <>
      {renderHeader()}
      {children}
      {renderFooter()}
    </>
  );
};

export default DynamicWrapper;
