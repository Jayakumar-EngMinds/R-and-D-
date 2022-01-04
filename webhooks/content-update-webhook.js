const http = require("http");
const https = require("https");

const body = JSON.stringify({
  event_type: "content-updated",
});

const options = {
  host: "api.github.com",
  protocol: "https:",
  path: `/repos/${process.env.GITHUB_REPO_OWNER}/${process.env.GITHUB_REPOSITORY}/dispatches`,
  method: "POST",
  headers: {
    Accept: "application/vnd.github.v3+json",
    Authorization: `token ${process.env.GITHUB_TOKEN}`,
    "User-Agent": "strapi-cms",
  },
  body: {
    event_type: "content-updated",
  },
};

const server = http.createServer();
server.on("request", (request, response) => {
  const req = https.request(options, (res) => {
    console.log("Github response status code:", res.statusCode);
    var str = "";
    res.on("data", function (chunk) {
      str += chunk;
    });

    res.on("end", function () {
      console.log("Github response", str);
      response.end(str);
    });
  });
  req.end(body);
});
server.listen(1338);
