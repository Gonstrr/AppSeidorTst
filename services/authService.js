// services/authService.js
export async function login(username, password) {
  if (username === 'admin' && password === '1234') {
    return { success: true, message: 'Login exitoso' };
  }
  return { success: false, message: 'Credenciales inválidas' };
}
