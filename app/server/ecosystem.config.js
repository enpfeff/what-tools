module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
        name      : "API",
        script    : "app.js",
        env: {
          COMMON_VARIABLE: "true",
          PORT:3000,
          MONGO_URL:"mongodb://198.100.146.8:27017/what-tools",
          COMPRESSION_ENABLED:true
        },
        env_production : {
        NODE_ENV: "production"
        },
        "error_file" : "./log/child-err.log",
        "out_file"   : "./log/child-out.log",
        "pid_file"   : "./log/child.pid"
    },


  ]

};
