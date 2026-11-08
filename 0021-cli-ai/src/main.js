import { getSettingsFile, saveApiKey, getApiKey } from "./utils/file.utils.js";
import rl from "./utils/readline.js";
// getSettingsFile
async function main() {
  const settings = await getSettingsFile();
  console.log(settings);
  if (!settings.apiKey) {
    const apiKey = await rl.question("Please enter your API key: ");
    await saveApiKey(apiKey);
  }
  const apiKey = await getApiKey();
  console.log(apiKey);
  rl.close();
}
export default main;
