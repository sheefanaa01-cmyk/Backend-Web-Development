'use strict';

// middleware/rateLimiter.js

const rateLimit = require('express-rate-limit');

// Create a rate limiter for authentication routes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes

  max: 5, // Maximum 5 attempts per IP

  standardHeaders: true,

  legacyHeaders: false,

  skipSuccessfulRequests: true,

  message: {
    message: 'Too many login attempts. Please try again later.'
  },

  statusCode: 429
});

// Redis-backed store:
// In a multi-instance deployment, we can use rate-limit-redis
// with a shared Redis server to store rate-limit information.
// This ensures all application instances share the same request counts.
// The default in-memory store is not sufficient because each instance
// maintains its own separate counter, allowing users to bypass limits
// when requests are distributed across instances by a load balancer.

module.exports = limiter;