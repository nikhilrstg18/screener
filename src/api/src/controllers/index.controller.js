const express = require("express");
const router = express.Router();
const timeOut = 10000;
const axios = require("axios");

function getCookie(headers) {
  const cookie = headers["set-cookie"][3].split("; ")[0].split("ak_bmsc=")[1];
  return cookie;
}

router.get("/:index", async (req, rep) => {
  let result = null;
  let headersResponse = null;
  let errors = null;
  if (!req.params["index"]) {
    rep.status(400).send("Missing index");
  }
  const index = encodeURIComponent(req.params["index"].toUpperCase());
  try {
    headersResponse = await axios.get(
      `https://www.nseindia.com/market-data/live-equity-market?symbol=${index}`,
      {
        timeout: timeOut,
        headers: {
          Host: "www.nseindia.com",
          Referer: "https://www.nseindia.com/get-quotes/equity?symbol=SBIN",
          "X-Requested-With": "XMLHttpRequest",
          pragma: "no-cache",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36",
          Accept: "application/json",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
          "Cache-Control": "no-cache",
          //Connection: "Keep-alive",
        },
      }
    );
  } catch (err) {
    errors = err;
  }
  const cookie = getCookie(headersResponse.headers);
  console.log("cookie", cookie);
  try {
    result = await axios.get(
      `https://www.nseindia.com/api/equity-stockIndices?index=${index}`,
      {
        timeout: timeOut,
        headers: {
          "User-Agent":
            "Mozilla/ 5.0(Windows NT 10.0; Win64; x64) AppleWebKit / 537.36(KHTML, like Gecko) Chrome / 92.0.4515.159 Safari / 537.36",
          Referer: `https://www.nseindia.com/market-data/live-equity-market?symbol=${index}`,
          "Accept-Encoding": "gzip",
          "Accept-Language": "en-IN,en-US;q=0.9,en;q=0.8,hi;q=0.7",
          cookie: cookie,
          //Connection: "Keep-alive",
        },
      }
    );
  } catch (err) {
    errors = err;
  }
  if (errors) {
    const { message, name, stack, status } = errors;
    return rep.status(status).send({ name, message, stack });
  }
  rep.status(result.status).send(result.data);
});

module.exports = router;
