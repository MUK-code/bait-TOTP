console.log("Guest.js loaded");

window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  console.log("DEBUG params:", Object.fromEntries(params.entries()));

  const mac = params.get("id") || params.get("client_mac") || params.get("client") || "";
  const redirect = params.get("url") || "/";

  const macInput = document.getElementById("client_mac");
  const redirectInput = document.getElementById("redirect");

  if (macInput) macInput.value = mac;
  if (redirectInput) redirectInput.value = redirect;

  console.log("DEBUG mac:", mac, "redirect:", redirect);
});
