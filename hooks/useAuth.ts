import * as React from 'react';
import { checkAuth } from '../utils/auth';

export default async function useAuth() {
  const auth = await checkAuth()
  return auth;
}