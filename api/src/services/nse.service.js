const timeOut = 10000;
const axios = require("axios");
const cache = {};

const defaultHeaders = {
  "User-Agent":
    "Mozilla/ 5.0(Windows NT 10.0; Win64; x64) AppleWebKit / 537.36(KHTML, like Gecko) Chrome / 92.0.4515.159 Safari / 537.36",
  "Accept-Encoding": "gzip",
  "Accept-Language": "en-IN,en-US;q=0.9,en;q=0.8,hi;q=0.7",
  Connection: "Keep-alive",
  "Keep-Alive": "timeout=5, max=5",
};

const parseCookie = (headers) => {
  const setCookie = headers["set-cookie"][3].split("; ");
  const cookie = setCookie[0].split("ak_bmsc=")[1];
  const expires = setCookie[3].split("Expires=")[1];
  cache["cookie"] = cookie;
  cache["cookieExpires"] = expires;
  return cookie;
};

const getCookie = async (index) => {
  let cookie = "";
  console.log(new Date(cache["cookieExpires"]));
  console.log(new Date());
  if (new Date(cache["cookieExpires"]) - new Date() > 0) {
    cookie = cache["cookie"];
  } else {
    const headersResponse = await axios.get(
      `https://www.nseindia.com/market-data/live-equity-market?symbol=${index}`,
      {
        //timeout: timeOut,
        headers: {
          Referer: "https://www.nseindia.com/get-quotes/equity?symbol=SBIN",
          "X-Requested-With": "XMLHttpRequest",
          ...defaultHeaders,
        },
      }
    );
    cookie = parseCookie(headersResponse.headers);
  }
  return cookie;
};

const getData = async (index) => {
  console.log("fetching data for index: " + index);
  await getCookie(index);
  const result = await axios.get(
    `https://www.nseindia.com/api/equity-stockIndices?index=${index}`,
    {
      //timeout: timeOut,
      headers: {
        Referer: `https://www.nseindia.com/market-data/live-equity-market?symbol=${index}`,
        cookie: cache["cookie"],
        ...defaultHeaders,
      },
    }
  );
  return result;
};

module.exports = {
  getData,
};
