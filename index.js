require("dotenv").config();

const http = require("http");
const url = require("url");
const fs = require("fs");

http
  .createServer((req, res) => {
    const q = url.parse(req.url, true);
    const filename = `.${q.pathname}.html`;
    const myURL = process.env.VIDEO_URL;

    fs.readFile(filename, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        return res.end("404 Not Found");
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      console.log(myURL);
      return res.end();
    });

    if (process.env.NODE_ENV === "prod") {
      // do production-specific stuff
    }

    // don't want to ruin the surprise by hardcoding the URL!
    // it might even change every few days!
  })
  .listen(8080);
