import "dotenv/config";
import fs from "fs";
import path from "path";
import { Telegraf } from "telegraf";
import { instagramDownloader } from "./commands/instagram.js";
import { tiktok } from "./commands/tiktok.js";
const bot = new Telegraf(process.env.BOT_TOKEN);

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

bot.launch(() => {
  console.log("Bot listing...");
});
