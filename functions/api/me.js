import { assertEnv, getCookie, json, verifySession } from './_utils';

export async function onRequest({ request, env }) {
  const jwtSecret = assertEnv(env, 'JWT_SECRET');
  const token = getCookie(request, 'session');
  const payload = await verifySession(token, jwtSecret);
  if (!payload) return json({ user: null }, { status: 200 });

  return json({
    user: {
      id: payload.sub,
      login: payload.login,
      name: payload.name,
      avatar_url: payload.avatar_url,
    },
  });
}
