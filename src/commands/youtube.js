import { log } from "console";
import { Context } from "telegraf";
import ytdl from "ytdl-core";
/**
 *
 * @param {Context} ctx
 */
export const youtube = async (ctx) => {
  let url = ctx.update.message.text;
  const info = await ytdl.getInfo(url);
  if (info) {
    await ctx.reply("🔎");
    const format = ytdl.chooseFormat(info.formats, {
      quality: "highest",
    });
    ctx.sendChatAction("upload_video");
    await ctx.replyWithVideo(
      {
        url: format.url,
      },
      {
        supports_streaming: true,
        caption: `@${process.env.BOT_USERNAME} orqali yuklandi kuningiz hayrli o'tsin 😊`,
        width: 1080,
        height: 1920,
      }
    );
  }
};
