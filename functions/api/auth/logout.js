import { json, redirect, setCookie } from '../_utils';

export async function onRequest() {
  try {
    const clearSession = setCookie('session', '', { maxAge: 0 });
    const headers = new Headers();
    headers.append('Set-Cookie', clearSession);
    return redirect('/', { headers });
  } catch (e) {
    return json({ ok: false, error: e?.message || 'Internal error' }, { status: 500 });
  }
}
