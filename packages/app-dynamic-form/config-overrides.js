const path = require("path");
const { name } = require("./package");

module.exports = {
  webpack: function override(config, env) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.join(__dirname, "./src")
    };
    return config;
  },
  devServer: function(configFunction) {
    return function(proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost);
      config.headers = {
        "Access-Control-Allow-Origin": "*"
      };
      return config;
    };
  }
};
