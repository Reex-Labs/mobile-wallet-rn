import * as React from 'react';
import { Auth } from "../utils/store/";

export default async function useAuth(pass: string) {
  const auth = await Auth.auth(pass);
  return auth;
}