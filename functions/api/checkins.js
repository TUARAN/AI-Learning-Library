import {
  assertEnv,
  getCookie,
  getUtcDateString,
  json,
  verifySession,
} from './_utils';

function keyForUser(userId) {
  return `checkins:${userId}`;
}

async function readCheckins(kv, userId) {
  const raw = await kv.get(keyForUser(userId));
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeCheckins(kv, userId, list) {
  await kv.put(keyForUser(userId), JSON.stringify(list));
}

export async function onRequest({ request, env }) {
  const jwtSecret = assertEnv(env, 'JWT_SECRET');
  const kv = env.CHECKINS_KV;
  if (!kv) {
    return json(
      { ok: false, error: 'Missing KV binding CHECKINS_KV' },
      { status: 500 }
    );
  }

  const token = getCookie(request, 'session');
  const session = await verifySession(token, jwtSecret);
  if (!session?.sub) return json({ ok: false, error: 'Unauthorized' }, { status: 401 });

  const userId = session.sub;
  const today = getUtcDateString();

  if (request.method === 'GET') {
    const checkins = await readCheckins(kv, userId);
    const todayCheckedIn = checkins.some((c) => c.date === today);
    return json({ ok: true, today, todayCheckedIn, checkins });
  }

  if (request.method === 'POST') {
    const checkins = await readCheckins(kv, userId);
    const already = checkins.some((c) => c.date === today);
    if (already) {
      return json({ ok: true, today, todayCheckedIn: true, checkins });
    }

    const record = {
      date: today,
      ts: Date.now(),
    };

    const next = [record, ...checkins].slice(0, 365);
    await writeCheckins(kv, userId, next);

    return json({ ok: true, today, todayCheckedIn: true, checkins: next });
  }

  return json({ ok: false, error: 'Method not allowed' }, { status: 405 });
}
