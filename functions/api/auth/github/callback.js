import {
  assertEnv,
  getCookie,
  json,
  redirect,
  setCookie,
  signSession,
} from '../../_utils';

export async function onRequest({ request, env }) {
  const clientId = assertEnv(env, 'GITHUB_CLIENT_ID');
  const clientSecret = assertEnv(env, 'GITHUB_CLIENT_SECRET');
  const jwtSecret = assertEnv(env, 'JWT_SECRET');

  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');

  const expectedState = getCookie(request, 'gh_oauth_state');
  const next = getCookie(request, 'gh_oauth_next') || '/?page=checkin';

  if (!code || !state) {
    return json({ ok: false, error: 'Missing code/state' }, { status: 400 });
  }

  if (!expectedState || expectedState !== state) {
    return json({ ok: false, error: 'Invalid state' }, { status: 400 });
  }

  // Exchange code for access token
  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'User-Agent': 'ai-learning-library',
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
    }),
  });

  const tokenJson = await tokenRes.json();
  if (!tokenRes.ok || !tokenJson.access_token) {
    return json(
      { ok: false, error: 'Token exchange failed', details: tokenJson },
      { status: 400 }
    );
  }

  const accessToken = tokenJson.access_token;

  // Fetch user profile
  const userRes = await fetch('https://api.github.com/user', {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${accessToken}`,
      'User-Agent': 'ai-learning-library',
    },
  });

  const user = await userRes.json();
  if (!userRes.ok || !user?.id) {
    return json(
      { ok: false, error: 'Failed to fetch GitHub user', details: user },
      { status: 400 }
    );
  }

  const now = Math.floor(Date.now() / 1000);
  const sessionPayload = {
    sub: String(user.id),
    login: user.login,
    name: user.name,
    avatar_url: user.avatar_url,
    iat: now,
    exp: now + 60 * 60 * 24 * 30, // 30 days
  };

  const sessionToken = await signSession(sessionPayload, jwtSecret);

  const cookieSession = setCookie('session', sessionToken, {
    maxAge: 60 * 60 * 24 * 30,
  });

  // clear oauth cookies
  const clearState = setCookie('gh_oauth_state', '', { maxAge: 0 });
  const clearNext = setCookie('gh_oauth_next', '', { maxAge: 0 });

  const headers = new Headers();
  headers.append('Set-Cookie', cookieSession);
  headers.append('Set-Cookie', clearState);
  headers.append('Set-Cookie', clearNext);
  return redirect(next, { headers });
}
