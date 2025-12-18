function base64UrlEncode(bytes) {
  const bin = Array.from(bytes, (b) => String.fromCharCode(b)).join('');
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function base64UrlEncodeString(str) {
  return base64UrlEncode(new TextEncoder().encode(str));
}

function base64UrlDecodeToBytes(str) {
  const pad = str.length % 4 === 0 ? '' : '='.repeat(4 - (str.length % 4));
  const b64 = (str + pad).replace(/-/g, '+').replace(/_/g, '/');
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i += 1) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

async function hmacSha256(secret, data) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data));
  return new Uint8Array(sig);
}

export async function signSession(payload, jwtSecret) {
  const header = { alg: 'HS256', typ: 'JWT' };
  const encodedHeader = base64UrlEncodeString(JSON.stringify(header));
  const encodedPayload = base64UrlEncodeString(JSON.stringify(payload));
  const data = `${encodedHeader}.${encodedPayload}`;
  const sigBytes = await hmacSha256(jwtSecret, data);
  const encodedSig = base64UrlEncode(sigBytes);
  return `${data}.${encodedSig}`;
}

export async function verifySession(token, jwtSecret) {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const [h, p, s] = parts;
  const data = `${h}.${p}`;
  const expectedSig = await hmacSha256(jwtSecret, data);
  const actualSig = base64UrlDecodeToBytes(s);

  if (expectedSig.length !== actualSig.length) return null;
  // constant-time compare
  let diff = 0;
  for (let i = 0; i < expectedSig.length; i += 1) diff |= expectedSig[i] ^ actualSig[i];
  if (diff !== 0) return null;

  try {
    const payloadJson = new TextDecoder().decode(base64UrlDecodeToBytes(p));
    const payload = JSON.parse(payloadJson);
    // optional exp check
    if (payload.exp && Date.now() / 1000 > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

export function getCookie(request, name) {
  const cookie = request.headers.get('Cookie') || '';
  const parts = cookie.split(';').map((p) => p.trim());
  for (const part of parts) {
    if (!part) continue;
    const idx = part.indexOf('=');
    if (idx === -1) continue;
    const k = part.slice(0, idx).trim();
    const v = part.slice(idx + 1).trim();
    if (k === name) return decodeURIComponent(v);
  }
  return null;
}

export function setCookie(name, value, options = {}) {
  const {
    path = '/',
    httpOnly = true,
    secure = true,
    sameSite = 'Lax',
    maxAge,
  } = options;

  let cookie = `${name}=${encodeURIComponent(value)}`;
  cookie += `; Path=${path}`;
  cookie += `; SameSite=${sameSite}`;
  if (httpOnly) cookie += '; HttpOnly';
  if (secure) cookie += '; Secure';
  if (typeof maxAge === 'number') cookie += `; Max-Age=${maxAge}`;
  return cookie;
}

export function json(data, init = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      ...(init.headers || {}),
    },
  });
}

export function redirect(url, init = {}) {
  return new Response(null, {
    ...init,
    status: 302,
    headers: {
      Location: url,
      ...(init.headers || {}),
    },
  });
}

export function getUtcDateString(date = new Date()) {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function assertEnv(env, key) {
  const val = env?.[key];
  if (!val) throw new Error(`Missing env var: ${key}`);
  return val;
}
