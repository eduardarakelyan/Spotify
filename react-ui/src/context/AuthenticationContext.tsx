import { AuthenticationType } from "../utils/type";
import React, { createContext, FC, ReactNode, useState } from "react";

export const AuthenticationContext = createContext<AuthenticationContextType>({
  authentication: null,
  setAuthentication: () => {},
});

export const AuthenticationProvider: FC<AuthenticationProviderType> =
  function ({ children }: AuthenticationProviderType) {
    const [auth, setAuth] = useState<AuthenticationType | null>({
      credentials: {
        clientId: "db65b796543848cd832fcc8a143a9f06",
        clientSecret: "63cfbf269b39438da73931a7a98591df",
      },
      code: "AQDVbNZV3nQD64BlsCBimH4umNx4G21FNKcCWeyBX2nHRbTarVTADsTgZAcSrPnhQc5Hmp4jSDO8Zw7BmZl6I4GOsbVEzSlI22czBIVoI8P3xJWDXKLk3eAuo3hYi_-yxSCcVcTBjuHSvmJziCclPUQbI804unOfmOOCSZ6Bn16oF0FLyN4-dqsVMVNghiDmrbpiaQf_OFNL2aIGUNDVuHlDpW-CCf8zt2LmgbS97543xUX1SsoetQ5XxSWtMnbYO-Bsi4AzfzX1efejo-3mxTp4qNs5f02uN6oTgyyrmkmKhCQu10jpzJ4IoxaxrDz4jfxWRlLTsImmwNcs3y7ZD1zg8JDHw-A90g548xxBYOI8-tmQNUk",
      token:
        "BQB3OVs9ybGWf3F85PNdHZn3poyWsyrorsy1kRHol5iJ_1ZygY2C5wwatSLlc_Eg861M2noBiNcg7hv6z7DciDrwQydlreGzDL86k0_W4hiA2dACuY0B5baTrN5tpmR81u_fXoYfEf0V-CkLaa1owcgf484iMZtnyL04gDfu2hjXtCLvNsjvDWfzmWtIxKAUqGCRjLmja_ihYQamSA4M2tS1_-PDDf68a1gg7Yu3vUh5w4R_T0EiqHNiPKQSBjCeGA5h5SPCIjyWfj1zqiK5Uyc",
    });

    return (
      <AuthenticationContext.Provider
        value={{ authentication: auth, setAuthentication: setAuth }}
      >
        {children}
      </AuthenticationContext.Provider>
    );
  };
type AuthenticationProviderType = {
  children: ReactNode;
};
type AuthenticationContextType = {
  authentication: null | AuthenticationType;
  setAuthentication: (u: AuthenticationType | null) => void;
};
