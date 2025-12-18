import { redirect, setCookie } from '../_utils';

export async function onRequest() {
  const clearSession = setCookie('session', '', { maxAge: 0 });
  const headers = new Headers();
  headers.append('Set-Cookie', clearSession);
  return redirect('/', { headers });
}
