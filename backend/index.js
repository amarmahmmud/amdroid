const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = 3001;

app.use('/', createProxyMiddleware({
  target: 'https://www.myandroid.org',
  changeOrigin: true,
  onProxyReq: (proxyReq, req, res) => {
    // Remove headers that might cause issues
    proxyReq.removeHeader('origin');
    proxyReq.removeHeader('referer');
  },
  onProxyRes: (proxyRes, req, res) => {
    // Add CORS headers to allow fetches from localhost
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    proxyRes.headers['Access-Control-Allow-Methods'] = 'GET,POST,PUT,DELETE,OPTIONS';
    proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
  }
}));

app.listen(port, () => {
  console.log(`Backend proxy running on http://localhost:${port}`);
});