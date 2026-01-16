const UMAMI_HOST = process.env.UMAMI_HOST;
const UMAMI_USERNAME = process.env.UMAMI_USERNAME;
const UMAMI_PASSWORD = process.env.UMAMI_PASSWORD;
const UMAMI_WEBSITE_ID = process.env.UMAMI_WEBSITE_ID;

async function getAuthToken() {
  const res = await fetch(`${UMAMI_HOST}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: UMAMI_USERNAME, password: UMAMI_PASSWORD }),
  });
  if (!res.ok) throw new Error(`Login failed: ${res.statusText}`);
  const data = await res.json();
  return data.token;
}

async function getStats(token, startAt, endAt) {
  const url = `${UMAMI_HOST}/api/websites/${UMAMI_WEBSITE_ID}/stats?startAt=${startAt}&endAt=${endAt}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Failed to fetch stats: ${res.statusText}`);
  return res.json();
}

async function run() {
  try {
    if (!UMAMI_HOST || !UMAMI_USERNAME || !UMAMI_PASSWORD || !UMAMI_WEBSITE_ID) {
      console.error('Missing Umami environment variables.');
      process.exit(1);
    }

    console.log('Authenticating with Umami...');
    const token = await getAuthToken();
    
    const now = Date.now();
    const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;
    const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;

    console.log('Fetching stats...');
    const stats7d = await getStats(token, sevenDaysAgo, now);
    const stats30d = await getStats(token, thirtyDaysAgo, now);

    console.log('\n--- Weekly Growth Report ---');
    console.log(`Period: ${new Date(sevenDaysAgo).toLocaleDateString()} - ${new Date(now).toLocaleDateString()}`);
    console.log(`Visitors (7d):  ${stats7d.visitors?.value ?? stats7d.visitors ?? 0}`);
    console.log(`Pageviews (7d): ${stats7d.pageviews?.value ?? stats7d.pageviews ?? 0}`);
    console.log(`Visitors (30d):  ${stats30d.visitors?.value ?? stats30d.visitors ?? 0}`);
    console.log(`Pageviews (30d): ${stats30d.pageviews?.value ?? stats30d.pageviews ?? 0}`);
    console.log('----------------------------\n');

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

run();