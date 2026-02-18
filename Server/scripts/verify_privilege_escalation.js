const http = require('http');

// Generate a random email to avoid collision on re-runs
const randomEmail = `attacker-${Date.now()}@example.com`;

const data = JSON.stringify({
  name: 'Attacker',
  email: randomEmail,
  password: 'password123',
  role: 'admin' // Attempting to register as Admin
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/users',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

console.log(`Attempting to register user with role: 'admin' and email: ${randomEmail}`);

const req = http.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    console.log('Status Code:', res.statusCode);
    if (res.statusCode >= 400) {
        console.error('Request failed:', body);
        process.exit(1);
    }

    try {
        const json = JSON.parse(body);
        console.log('Response Role:', json.role);

        if (json.role === 'admin') {
            console.log('⚠️ VULNERABILITY CONFIRMED: User created with admin role!');
            process.exit(1); // Exit with error code to indicate failure/vulnerability present
        } else if (json.role === 'customer') {
             console.log('✅ SECURE: User created with customer role despite requesting admin.');
             process.exit(0);
        } else {
             console.log(`User created with unexpected role: ${json.role}`);
             process.exit(1);
        }
    } catch (e) {
        console.error('Failed to parse response:', e);
        process.exit(1);
    }
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
  process.exit(1);
});

req.write(data);
req.end();
