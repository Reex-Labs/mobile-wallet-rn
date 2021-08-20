import React from "react";
import { TAuthContext } from "../types";

const AuthContext = React.createContext<TAuthContext>();
export const AuthProvider = AuthContext.Provider;
export default AuthContext;