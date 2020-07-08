export function LoginRequest(id) {
  return {
    type: '@auth/LOGIN_REQUEST',
    payload: { id },
  };
}

export function LoginSuccess(token, user) {
  return {
    type: '@auth/LOGIN_SUCCESS',
    payload: { token, user },
  };
}

export function LoginFailure() {
  return {
    type: '@auth/LOGIN_FAILURE',
  };
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
