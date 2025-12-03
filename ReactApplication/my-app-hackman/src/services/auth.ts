const TOKEN_KEY = 'app_auth_token';
const USER_KEY = 'app_auth_user';

export function login(username: string, password: string) {
  // static credentials
  if (username === 'admin' && password === 'password123') {
    localStorage.setItem(TOKEN_KEY, 'static-token-123');
    localStorage.setItem(USER_KEY, username);
    return true;
  }
  return false;
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function isAuthenticated(): boolean {
  return !!localStorage.getItem(TOKEN_KEY);
}

export function getUser(): string | null {
  return localStorage.getItem(USER_KEY);
}