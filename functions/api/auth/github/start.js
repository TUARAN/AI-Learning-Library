import { assertEnv, getCookie, redirect, setCookie } from '../../_utils';
import { json } from '../../_utils';

function randomState() {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

export async function onRequest({ request, env }) {
  try {
    const clientId = assertEnv(env, 'GITHUB_CLIENT_ID');
    const appUrl = assertEnv(env, 'APP_URL');

    const url = new URL(request.url);
    const next = url.searchParams.get('next') || '/?page=checkin';

    const state = randomState();

    const authorize = new URL('https://github.com/login/oauth/authorize');
    authorize.searchParams.set('client_id', clientId);
    authorize.searchParams.set('redirect_uri', `${appUrl}/api/auth/github/callback`);
    authorize.searchParams.set('scope', 'read:user');
    authorize.searchParams.set('state', state);

    // store state + next in cookies (short-lived)
    const cookieState = setCookie('gh_oauth_state', state, { maxAge: 10 * 60 });
    const cookieNext = setCookie('gh_oauth_next', next, { maxAge: 10 * 60, httpOnly: true });

    // If already logged in, we still allow re-auth, but this keeps flow simple.
    const already = getCookie(request, 'session');
    void already;

    const headers = new Headers();
    headers.append('Set-Cookie', cookieState);
    headers.append('Set-Cookie', cookieNext);
    return redirect(authorize.toString(), { headers });
  } catch (e) {
    return json({ ok: false, error: e?.message || 'Internal error' }, { status: 500 });
  }
}
