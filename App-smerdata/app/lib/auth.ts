// Funzioni di autenticazione e middleware ruoli

export function isAuthenticated(req: any): boolean {
  // Logica per verificare autenticazione
  return !!req.user;
}

export function hasRole(user: any, role: string): boolean {
  return user?.role === role;
}
