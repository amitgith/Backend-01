#!/usr/bin/env node
import "dotenv/config";
import os from "os";
import path from "path";
const homeDir = os.homedir();
console.log(homeDir);

console.log("Hello Cohort");
console.log(process.env.BETA_CODE);
