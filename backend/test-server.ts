import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'CarFinder Backend API',
    version: '2.0.0',
    environment: 'development',
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/auth/test', (req, res) => {
  res.json({
    success: true,
    message: 'Auth endpoint working'
  });
});

app.post('/api/auth/login', (req, res) => {
  res.json({
    success: true,
    message: 'Login endpoint working',
    data: {
      user: {
        id: 'test-user-id',
        name: 'Test User',
        email: 'test@example.com',
        role: 'USER'
      },
      token: 'test-token',
      refreshToken: 'test-refresh-token'
    }
  });
});

app.post('/api/auth/register', (req, res) => {
  res.json({
    success: true,
    message: 'Register endpoint working',
    data: {
      user: {
        id: 'test-user-id',
        name: 'Test User',
        email: 'test@example.com',
        role: 'USER'
      },
      token: 'test-token',
      refreshToken: 'test-refresh-token'
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚗 Test server running on port ${PORT}`);
  console.log(`📝 Health check: http://localhost:${PORT}/health`);
  console.log(`🔐 Auth test: http://localhost:${PORT}/api/auth/test`);
}); 