import { Context } from "telegraf";
import { TiktokDownloader } from "@tobyg74/tiktok-api-dl";
/**
 *
 * @param {Context} ctx
 */
export const tiktok = async (ctx) => {
  const text = ctx.update.message.text;
  const data = await TiktokDownloader(text, {
    version: "v3",
  });

  if (data.status != "success") {
    return ctx.reply("xatolik yuz berdi");
  }
  ctx.reply("Video yuklandi yuborilmoqda...");
  ctx.sendChatAction("upload_video");
  await ctx.replyWithVideo(
    {
      url: data.result.video_hd,
      filename: "video.mp4",
    },
    {
      supports_streaming: true,
      caption: `@${process.env.BOT_USERNAME} orqali yuklandi`,
      width: 1080,
      height: 1920,
    }
  );

  //   console.log(data);
};
