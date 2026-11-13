import fs from "fs/promises";
import { CONFIG_DIR, HOME_DIR } from "./constant.js";
import path from "path";
export async function getSettingsFile() {
  // Ensure the config directory exists
  try {
    await fs.access(CONFIG_DIR);
  } catch (error) {
    await fs.mkdir(CONFIG_DIR, { recursive: true });
  }
  const settingsFilePath = path.join(CONFIG_DIR, "settings.json");
  try {
    await fs.access(settingsFilePath);
    const content = await fs.readFile(settingsFilePath, "utf-8");
    return JSON.parse(content);
  } catch (error) {
    await fs.writeFile(settingsFilePath, JSON.stringify({}));
    return {};
  }
}
// saveApiKey
export async function saveApiKey(apiKey) {
  const settingsFilePath = path.join(CONFIG_DIR, "settings.json");
  const settingsContent = await getSettingsFile();
  await fs.writeFile(
    settingsFilePath,
    JSON.stringify({
      ...settingsContent,
      apiKey,
    }),
  );
}
// Get api key from the settings file
export async function getApiKey() {
  const settings = await getSettingsFile();
  return settings.apiKey || null;
}