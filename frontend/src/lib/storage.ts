const key = 'catalogo_motos_session';
export type Session = { authenticated: boolean; usuario: string };

export function getSession(): Session | null {
  if (typeof localStorage === 'undefined') return null;
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) as Session : null;
}

export function saveSession(usuario: string) { localStorage.setItem(key, JSON.stringify({ authenticated: true, usuario })); }
export function clearSession() { localStorage.removeItem(key); }
