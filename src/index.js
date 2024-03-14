import "dotenv/config";
import fs from "fs";
import path from "path";
import { Telegraf } from "telegraf";
import { instagramDownloader } from "./commands/instagram.js";
import { tiktok } from "./commands/tiktok.js";
import { youtube } from "./commands/youtube.js";

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
bot.hears(
  /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/gm,
  youtube
);
bot.hears(
  /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/[^/]+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/gi,
  (ctx) => {
    ctx.reply("hello world");
  }
);

bot.command("test", async (ctx) => {
  try {
    ctx.reply("hello");
    await ctx.replyWithVideo({
      url: "https://rr4---sn-1gi7znes.googlevideo.com/videoplayback?expire=1710450877&ei=XRTzZdjjBLDQi9oPq9yA2AM&ip=89.149.24.165&id=o-AA33vCSLCZ8gXBq3bKDyycdzvC1bGChnJmaaWn1hOGHJ&itag=22&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&mh=Qe&mm=31%2C26&mn=sn-1gi7znes%2Csn-nv47zne7&ms=au%2Conr&mv=m&mvi=4&pl=24&initcwndbps=258750&vprv=1&svpuc=1&mime=video%2Fmp4&cnr=14&ratebypass=yes&dur=150.558&lmt=1699609236070772&mt=1710428987&fvip=1&c=ANDROID&txp=5318224&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cvprv%2Csvpuc%2Cmime%2Ccnr%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRAIgGJSI73hFxwJ03LrEfqxBlFZB-7gUaxrIzQAo3FkQ9GsCIFRLYFU926MJACtmzbmaenIs2vo5ir3nFc_Y_jvuyt__&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=APTiJQcwRQIgEk-VSdALXMFQ6hXPfaZ-nR7IuewSh8mv2WLouI3OKYUCIQD8Pd97gZOCuV6gKxQdCHu777GQpNMbD089XuHH1M6sJw%3D%3D&title=Ravil%20aka%20-%20Har%20kun%20cover%20(Radius%2021)%20%F0%9F%94%A5%20premyera%20music%20video",
    });
  } catch (error) {
    console.log(error);
  }
});

bot.launch(() => {
  console.log("Bot listing...");
});
