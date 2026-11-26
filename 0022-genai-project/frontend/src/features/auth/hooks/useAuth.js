import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAuthError,
  loadCurrentUser,
  restoreSession,
  signIn,
  signOut,
  signUp,
} from "../state/authSlice.js";

/**
 * Exposes authentication state and the supported account actions to UI.
 * @returns {{ user: object|null, status: string, error: string|null, initialized: boolean, signIn: Function, signUp: Function, signOut: Function, restore: Function, clearError: Function }}
 */
export function useAuth() {
  const dispatch = useDispatch();
  const { user, accessToken, status, error, initialized } = useSelector(
    (state) => state.auth,
  );

  return {
    user,
    accessToken,
    status,
    error,
    initialized,
    signIn: useCallback((credentials) => dispatch(signIn(credentials)).unwrap(), [dispatch]),
    signUp: useCallback((credentials) => dispatch(signUp(credentials)).unwrap(), [dispatch]),
    signOut: useCallback(() => dispatch(signOut()), [dispatch]),
    restore: useCallback(() => dispatch(restoreSession()), [dispatch]),
    loadCurrentUser: useCallback(
      () => dispatch(loadCurrentUser(accessToken)).unwrap(),
      [accessToken, dispatch],
    ),
    clearError: useCallback(() => dispatch(clearAuthError()), [dispatch]),
  };
}
