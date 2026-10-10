require("dotenv").config();
const identity = require("./lib/identity");

// Sanitize env variables (strip non-printable/non-ASCII characters)
const cleanEnv = (key) => (process.env[key] || "").replace(/[^\x20-\x7E]/g, "").trim();

const config = {
  BOT_NAME: identity.BOT_NAME,
  BOT_VERSION: identity.BOT_VERSION,
  OWNER_NUMBER: cleanEnv("OWNER_NUMBER") || identity.OWNER_NUMBER,
  CHANNEL_LINK: identity.CHANNEL_LINK,
  MENU_IMAGE_URL: identity.MENU_IMAGE_URL,

  PREFIX: process.env.PREFIX || "!",
  SESSION_ID: cleanEnv("SESSION_ID"),

  GEMINI_API_KEY: cleanEnv("GEMINI_API_KEY"),
  GEMINI_MODEL: process.env.GEMINI_MODEL || "gemini-flash-latest",
  GROK_API_KEY: cleanEnv("GROK_API_KEY") || cleanEnv("GROQ_API_KEY"),
  GROK_MODEL: process.env.GROK_MODEL || "openai/gpt-oss-20b",
  OPENAI_API_KEY: cleanEnv("OPENAI_API_KEY"),
  OPENAI_MODEL: process.env.OPENAI_MODEL || "gpt-5.6-sol",
  CLAUDE_API_KEY: cleanEnv("CLAUDE_API_KEY"),
  CLAUDE_MODEL: process.env.CLAUDE_MODEL || "claude-opus-5",
  PERPLEXITY_API_KEY: cleanEnv("PERPLEXITY_API_KEY"),
  PERPLEXITY_MODEL: process.env.PERPLEXITY_MODEL || "sonar-reasoning",
  DEEPSEEK_API_KEY: cleanEnv("DEEPSEEK_API_KEY"),
  DEEPSEEK_MODEL: process.env.DEEPSEEK_MODEL || "deepseek-v4-pro",
  OPENROUTER_API_KEY: cleanEnv("OPENROUTER_API_KEY"),
  OPENROUTER_MODEL: process.env.OPENROUTER_MODEL || "meta-llama/llama-3.3-70b-instruct:free",
  TOGETHER_API_KEY: cleanEnv("TOGETHER_API_KEY"),
  LLAMA_MODEL: process.env.LLAMA_MODEL || "meta-llama/Llama-3.3-70B-Instruct-Turbo",
  MISTRAL_API_KEY: cleanEnv("MISTRAL_API_KEY"),
  MIXTRAL_MODEL: process.env.MIXTRAL_MODEL || "mistral-large-latest",

  REMOVEBG_API_KEY: cleanEnv("REMOVEBG_API_KEY"),
  FOOTBALL_API_KEY: cleanEnv("FOOTBALL_API_KEY"),
  ELEVENLABS_API_KEY: cleanEnv("ELEVENLABS_API_KEY"),
  FISH_AUDIO_API_KEY: cleanEnv("FISH_AUDIO_API_KEY") || cleanEnv("FISH_API_KEY"),

  TIMEZONE: process.env.TIMEZONE || "Africa/Lagos",
  AUTO_READ: process.env.AUTO_READ === "true" || false,
  AUTO_TYPING: process.env.AUTO_TYPING === "true" || false,
  AUTO_RECONNECT: process.env.AUTO_RECONNECT !== "false",

  SESSION_DIR: "./sessions",
};

// Startup config validation
function validateConfig() {
  const warnings = [];
  const errors = [];

  if (!config.SESSION_ID) {phantom-eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0Z4UVNvcWI5aVdwblRoeTZ0VnNYa2lSUnlZZ01vOVVSeEg5WUhrR3luND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieHlxUWpibm4rTTBzdHlmTEhKeTdPdCtjVEVwYjFBN0hMK0pLV1drOWtWST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyQVU2bGVnNFM4VHY4bFBGb2xTZ2hqVlR3Qm5UT0NPckc5cEJwUVBmRTFJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJMNSswWG9TYnhrZTFzWXBBa3VUdzI4VHBFb2R4LzJSdEx5YzMvSzFqTDJJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNLd3hsN3drK0Z3RVJUQytSaEd6bWtVMkh5OHJTQ2dCUGtCN1IzMW5lbFk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9rVjlRY2loY01IUS9FaW81VDBpZjFPU0VvY0hsQ05JSVF6MzlNTFN5eTA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0hVRVhYS09odGM5aWoyTlIxbWx1bXhkNng2YjhXZFFLMWZiRGZHMVVWND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaTJndkxxNXc4S3ZSdkNBL1RRV28rYTBja1hjdmdlMENING5PaUE2SkpsND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkgvUEJRNDFjQmdHSzg1eU43OUhhN3dab2J3VFFzQmZPTTZYTjQySUdZd25IZlpNVjMxc21seUhHR2JwOXg4aG1pQkF1K3AxdTR2MnNtS2tGWUdkc0JBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTYxLCJhZHZTZWNyZXRLZXkiOiJRdkptcGFBeldoMnhMUkU1K0dNVzdsNFFmd1FFNHpPd0d2T1E0cTNhQmpnPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjE0MzQ3MzY2NzczNTU5MEBsaWQiLCJmcm9tTWUiOnRydWUsImlkIjoiQUM2N0FERDkyRUU3RTNEODMyNjJGNDZBOEJEODY2NUMiLCJwYXJ0aWNpcGFudCI6IiIsImFkZHJlc3NpbmdNb2RlIjoibGlkIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3OTE2NDU2MjR9XSwibmV4dFByZUtleUlkIjo4MTMsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjo4MTMsImFjY291bnRTeW5jQ291bnRlciI6MCwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiTFBGRUM2NEIiLCJtZSI6eyJpZCI6IjkxNzAwNDQ5OTgwMzoyOEBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjE0MzQ3MzY2NzczNTU5MDoyOEBsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ01qUnFkVUdFSyt2cWRZR0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjRxMTQrcWRFUWpjaVNkRHh0NHZza0NtbCtBUGJWcHpPK1RjT1ZLVjlOWFU9IiwiYWNjb3VudFNpZ25hdHVyZSI6Imc1cW9ycXNDK2RjajRZUDdyTlBPUzBvd2Z4NnlZa3c5aDlUR0ljM1JldUloUS9hOHZJd3ZkZ2N6V0hPZVBDb1R0VFZPOTEyOTBWL0JTblZTeUgrSUFRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiIyRTRRSVd5YjhiQ2w1MXk0ZXBxdGM4dTRwMFFZaDIrRTk1Uy8vbFBLTzZqMy93TnF4bnRENXhPREs3QXJhb2JoSFNBMGN6RGQvWGZXNCtPU0t0OXJDdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjE0MzQ3MzY2NzczNTU5MDoyOEBsaWQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZUt0ZVBxblJFSTNJa25ROGJlTDdKQXBwZmdEMjFhY3p2azNEbFNsZlRWMSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FrSUFnZ0wifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzkxNjQ1NjIxLCJsYXN0UHJvcEhhc2giOiJDT1NPQSIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBUDhwIn0=
    errors.push("SESSION_ID is missing in .env — bot cannot authenticate without it");
  }

  if (!config.GEMINI_API_KEY && !config.GROK_API_KEY && !config.DEEPSEEK_API_KEY) {
    warnings.push("No AI API keys set in .env — AI features (autoreply, !ai, !grok, etc.) will be disabled");
  }
  if (!config.GEMINI_API_KEY) {
    warnings.push("GEMINI_API_KEY not set in .env — primary AI model unavailable");
  }
  if (!config.FOOTBALL_API_KEY) {
    warnings.push("FOOTBALL_API_KEY not set in .env — football commands will be limited");
  }
  if (!config.ELEVENLABS_API_KEY) {
    warnings.push("ELEVENLABS_API_KEY not set in .env — premium TTS unavailable");
  }
  if (!config.REMOVEBG_API_KEY) {
    warnings.push("REMOVEBG_API_KEY not set in .env — background removal unavailable");
  }

  if (errors.length > 0 || warnings.length > 0) {
    console.log("[Config] Status:");
    for (const err of errors) console.log(`  ❌ ${err}`);
    for (const warn of warnings) console.log(`  ⚠️  ${warn}`);
    console.log("");
  }

  const aiKeys = ["GEMINI_API_KEY", "GROK_API_KEY", "OPENAI_API_KEY", "CLAUDE_API_KEY", "DEEPSEEK_API_KEY", "PERPLEXITY_API_KEY", "TOGETHER_API_KEY", "MISTRAL_API_KEY"];
  const activeAI = aiKeys.filter(k => config[k]).length;
  console.log(`  🤖 AI models configured: ${activeAI}/${aiKeys.length}`);
  console.log(`  📌 Prefix: "${config.PREFIX}" | Timezone: ${config.TIMEZONE}`);
  console.log(`  📖 Auto-read: ${config.AUTO_READ} | Auto-typing: ${config.AUTO_TYPING}\n`);
}

validateConfig();

module.exports = config;
