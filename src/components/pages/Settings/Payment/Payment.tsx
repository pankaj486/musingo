import React, { useState } from "react";

import { CustomerPaymentView } from "./CustomerPaymentView";
import { Grid } from "@material-ui/core";
import { ProviderPaymentView } from "./ProviderPaymentView";

enum ViewTypes {
  Customer,
  Provider,
}

export const Payment: React.FC = () => {
  const [currentView, setCurrentView] = useState(ViewTypes.Customer);

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <a
            className={
              "defBorder settingButton px-3 mr-2 font-14 " +
              (currentView === ViewTypes.Customer ? "activeSettingsButton" : "")
            }
            onClick={() => setCurrentView(ViewTypes.Customer)}
          >
            Für Kunden
          </a>
          <a
            className={
              "defBorder settingButton px-3 font-14  " +
              (currentView === ViewTypes.Provider ? "activeSettingsButton" : "")
            }
            onClick={() => setCurrentView(ViewTypes.Provider)}
          >
            Für Anbieter
          </a>
        </Grid>

        {currentView === ViewTypes.Customer && <CustomerPaymentView />}
        {currentView === ViewTypes.Provider && <ProviderPaymentView />}
      </Grid>
    </div>
  );
};
