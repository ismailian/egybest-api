const needle = require("needle");

/**
 * send a get request and return response
 */
const get = async (url) => {
  return (
    await needle("get", url, {
      headers: {
        accept: "*/*",
        connection: "close",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Safari/605.1.15",
      },
    })
  ).body;
};

module.exports = { get };
