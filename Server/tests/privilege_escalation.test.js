const http = require('http');

const postData = JSON.stringify({
  name: 'Attacker',
  email: `attacker_${Date.now()}@example.com`,
  password: 'password123',
  role: 'admin'
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/users',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    try {
      const response = JSON.parse(data);
      console.log('Response:', response);

      if (res.statusCode !== 201 && res.statusCode !== 200) {
          console.error('Request failed with status:', res.statusCode);
          process.exit(1);
      }

      if (response.role === 'admin') {
        console.log('FAILED: Vulnerability Exists! User created as admin!');
        process.exit(1);
      } else {
        console.log('User created as:', response.role);
        if (response.role === 'customer') {
             console.log('PASSED: Vulnerability Fixed!');
             process.exit(0);
        } else {
             console.log('Unexpected role:', response.role);
             process.exit(1);
        }
      }
    } catch (e) {
      console.error('Error parsing response:', e);
      process.exit(1);
    }
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
  process.exit(1);
});

req.write(postData);
req.end();
