// app.config.ts
import { defineConfig } from "@solidjs/start/config";
import UnoCSS from "unocss/vite";
console.log(process.env);
var isNodejs = typeof process !== "undefined" && typeof Deno.version !== "undefined" && typeof Deno.version.deno !== "undefined";
var app_config_default = defineConfig({
  vite: {
    plugins: [UnoCSS()]
  },
  server: {
    preset: "deno"
  }
});
export {
  app_config_default as default
};
