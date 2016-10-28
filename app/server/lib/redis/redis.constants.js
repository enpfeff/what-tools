/**
 * @module what-tools
 * @since 10/27/16
 * @author Ian Pfeffer
 */
"use strict";

module.exports = {
    REDIS_HOST: process.env.REDIS_HOST || 'localhost',
    REDIS_PORT: process.env.REDIS_PORT || '6379',
    REDIS_PASS: process.env.REDIS_PASS,
    REDIS_REVOKE_KEY: 'JWT_REVOKE'
};