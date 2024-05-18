import "dotenv/config";
import fs from "fs";
import path from "path";
import { Telegraf } from "telegraf";
import { instagramDownloader } from "./commands/instagram.js";
import { tiktok } from "./commands/tiktok.js";
import { youtube } from "./commands/youtube.js";
import ytdl from "ytdl-core";

const API_ROOT = process.env.BOT_API_ROOT || "https://api.telegram.org/bot";

const bot = new Telegraf(process.env.BOT_TOKEN, {
  telegram: {
    apiRoot: API_ROOT,
  },
});

bot.start((ctx) => {
  ctx.replyWithPhoto(
    {
      source: fs.createReadStream(
        path.join(process.cwd(), "static", "logo.jpg")
      ),
    },
    {
      caption:
        "Assalomu alaykum " +
        ctx.update.message.from.first_name +
        " botimiz orqali ijtimoiy tarmoqlardan content ko`chirishingiz mumkin",
    }
  );
});

bot.hears(
  /(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am|instagr.com)\/(\w+)/gim,
  instagramDownloader
);
bot.hears(/^https?:\/\/(?:[a-z0-9-]+\.)?tiktok\.com\//, tiktok);
// bot.hears(
//   /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/gm,
//   youtube
// );

bot.on("text", (ctx) => {
  let url = ytdl.validateURL(ctx?.message?.text);
  if (url) {
    return youtube(ctx);
  } else ctx.reply("bunday buyruq yoq iltimos qaytadan urinib ko`ring");
});

bot.launch(() => {
  console.log("Bot listing...");
});
