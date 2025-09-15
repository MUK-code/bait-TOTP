import axios from "axios";
import https from "https";

const httpsAgent = new https.Agent({ rejectUnauthorized: false }); // for self-signed certs during testing

// Tries legacy login first (/api/login) — works for many non-OS controllers and UDM older setups.
// If your UDM/UniFi OS needs a different flow we can adjust later.
export async function loginUnifi(unifiHost, username, password) {
  const url = `${unifiHost.replace(/\/$/, "")}/api/login`;
  const resp = await axios.post(url, { username, password }, { httpsAgent, timeout: 8000 });
  const setCookie = resp.headers["set-cookie"];
  if (!setCookie) throw new Error("No cookie from UniFi login");
  return setCookie.join("; ");
}

export async function authorizeGuest(unifiHost, site, cookie, clientMac, minutes = 60) {
  const url = `${unifiHost.replace(/\/$/, "")}/api/s/${site}/cmd/stamgr`;
  const payload = { cmd: "authorize-guest", mac: clientMac, minutes };
  const resp = await axios.post(url, payload, {
    httpsAgent,
    headers: { Cookie: cookie },
    timeout: 8000
  });
  return resp.data;
}
