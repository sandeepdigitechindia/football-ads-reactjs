import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { SettingProvider } from "./context/SettingContext";
import { ServiceProvider } from "./context/ServiceContext";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext";
import RoutesConfig from "./routes/RoutesConfig";
import DynamicWrapper from "./components/DynamicWrapper";
import { HelmetProvider } from "react-helmet-async";
import ErrorBoundary from "./components/ErrorBoundary";

const App = () => {
  return (
    <SettingProvider>
      <ServiceProvider>
        <HelmetProvider>
          <ErrorBoundary>
            <AuthProvider>
              <ToastContainer position="top-right" autoClose={3000} />
              <Router>
                <DynamicWrapper>
                  <RoutesConfig />
                </DynamicWrapper>
              </Router>
            </AuthProvider>
          </ErrorBoundary>
        </HelmetProvider>
      </ServiceProvider>
    </SettingProvider>
  );
};

export default App;
