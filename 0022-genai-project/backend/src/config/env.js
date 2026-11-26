const required = (name) => {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};

const accessTokenSecret = required("ACCESS_TOKEN_SECRET");
const refreshTokenSecret = required("REFRESH_TOKEN_SECRET");

if (accessTokenSecret.length < 32 || refreshTokenSecret.length < 32) {
  throw new Error("Access and refresh token secrets must each be at least 32 characters");
}

if (accessTokenSecret === refreshTokenSecret) {
  throw new Error("Access and refresh token secrets must be different");
}

const port = Number(process.env.PORT ?? 5000);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("PORT must be a valid TCP port");
}

const nodeEnv = process.env.NODE_ENV ?? "development";
if (!["development", "test", "production"].includes(nodeEnv)) {
  throw new Error("NODE_ENV must be development, test, or production");
}

export const env = Object.freeze({
  port,
  nodeEnv,
  mongoUri: required("MONGODB_URI"),
  accessTokenSecret,
  refreshTokenSecret,
});
