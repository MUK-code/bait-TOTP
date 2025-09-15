import speakeasy from "speakeasy";

const s = speakeasy.generateSecret({ name: "BossHouse:owner" });
console.log("BASE32 (put this in .env as OWNER_SECRET):");
console.log(s.base32);
console.log("\notpauth URL (scan with Google Authenticator if you can display):");
console.log(s.otpauth_url);
