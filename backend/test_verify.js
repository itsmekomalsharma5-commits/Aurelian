import http from 'http';
import app from './src/app.js';

const testServer = http.createServer(app);
const TEST_PORT = 5099;

function request(path, options = {}) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        hostname: '127.0.0.1',
        port: TEST_PORT,
        path,
        method: options.method || 'GET',
        headers: options.headers || {},
      },
      (res) => {
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => {
          try {
            const json = JSON.parse(body);
            resolve({ status: res.statusCode, headers: res.headers, body: json, raw: body });
          } catch {
            resolve({ status: res.statusCode, headers: res.headers, raw: body });
          }
        });
      }
    );
    req.on('error', reject);
    if (options.body) {
      req.write(typeof options.body === 'string' ? options.body : JSON.stringify(options.body));
    }
    req.end();
  });
}

async function runTests() {
  testServer.listen(TEST_PORT, async () => {
    console.log(`Test server running on port ${TEST_PORT}`);
    let passed = 0;
    let failed = 0;

    const assert = (condition, msg) => {
      if (condition) {
        console.log(` [PASS] ${msg}`);
        passed++;
      } else {
        console.error(`❌ [FAIL] ${msg}`);
        failed++;
      }
    };

    try {
      // 1. Health check
      const health = await request('/api/health');
      assert(health.status === 200 && health.body.status === 'healthy', 'Health check endpoint returns healthy status');

      // 2. Products endpoint
      const products = await request('/api/products');
      assert(products.status === 200 && products.body.data.length > 0, `Products endpoint returns ${products.body?.data?.length} products`);

      // 3. Categories endpoint
      const categories = await request('/api/categories');
      assert(categories.status === 200 && categories.body.data.length > 0, `Categories endpoint returns ${categories.body?.data?.length} categories`);

      // 4. Promo validation
      const promo = await request('/api/promos/validate?code=AURELIAN15&amount=2450');
      assert(promo.status === 200 && promo.body.valid === true, 'Promo validation works for AURELIAN15');

      // 5. Auth Login
      const login = await request('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: { email: 'eleanor@aurelian-maison.com', password: 'AurelianVIP2026!' },
      });
      assert(login.status === 200 && login.body.success === true && login.body.data?.token, 'Login with Eleanor VIP credentials succeeds and issues token');

      const token = login.body.data?.token;

      // 6. Auth /me
      const me = await request('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      assert(me.status === 200 && me.body.data?.firstName === 'Eleanor', 'Auth /me returns Eleanor VIP profile');

      // 7. Order creation
      const order = await request('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: {
          customer: { firstName: 'Eleanor', lastName: 'Vance', email: 'eleanor@aurelian-maison.com' },
          items: [{ id: 'amethyst-empress-bracelet', quantity: 1, price: 2450 }],
          promoCode: 'AURELIAN15',
        },
      });
      assert(order.status === 201 && order.body.data?.orderNumber, `Order creation succeeds: ${order.body?.data?.orderNumber}`);

      // 8. Consultation booking
      const consultation = await request('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: {
          clientName: 'Eleanor Vance',
          email: 'eleanor@aurelian-maison.com',
          boutiqueId: 'paris-place-vendome',
          interest: 'Private Salon Viewing',
        },
      });
      assert(consultation.status === 201 && consultation.body.data?.id, `Consultation booking succeeds: ${consultation.body?.data?.id}`);

      // 9. Newsletter subscription
      const news = await request('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: { email: 'vip@patron.com' },
      });
      assert((news.status === 200 || news.status === 201) && news.body.success === true, 'Newsletter subscription succeeds');

      // 10. Static frontend serving check
      const rootRes = await request('/');
      assert(rootRes.status === 200 && rootRes.raw.includes('<!DOCTYPE html>'), 'Root URL serves frontend production HTML bundle');

      // 11. Security headers check
      assert(
        rootRes.headers['x-content-type-options'] === 'nosniff' &&
        rootRes.headers['x-frame-options'] === 'SAMEORIGIN',
        'Security headers (X-Content-Type-Options, X-Frame-Options) present on responses'
      );

      // 12. 404 on invalid API endpoint returns JSON
      const invalid = await request('/api/nonexistent-route');
      assert(invalid.status === 404 && invalid.body.success === false, 'Invalid API route returns clean JSON 404 response');

      console.log(`\n================================`);
      console.log(`TEST SUMMARY: ${passed} Passed, ${failed} Failed`);
      console.log(`================================`);

      testServer.close();
      process.exit(failed > 0 ? 1 : 0);
    } catch (err) {
      console.error('Test execution failed:', err);
      testServer.close();
      process.exit(1);
    }
  });
}

runTests();
