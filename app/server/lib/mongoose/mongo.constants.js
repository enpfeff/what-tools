/**
 * @module what-tools
 * @since 10/16/16
 * @author Ian Pfeffer
 * @copyright Copyright (c) 2016 NETSCOUT
 */
"use strict";

module.exports = {
    MONGO_URL: process.env.MONGO_URL || 'mongdb://localhost:27017/what-tools',
    MONGO_POOL_SIZE: process.env.MONGO_POOL_SIZE || 10
};