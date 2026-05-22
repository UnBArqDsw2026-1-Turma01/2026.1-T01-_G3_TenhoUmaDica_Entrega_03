const DEBUG_TOKEN_STORAGE_KEY = "firebase-debug-token";

export function saveDebugToken(token: string): void {
  localStorage.setItem(DEBUG_TOKEN_STORAGE_KEY, token);
}

export function loadDebugToken(): string {
  return localStorage.getItem(DEBUG_TOKEN_STORAGE_KEY) ?? "";
}