import snap from "snapsave-downloader2";
import { GetVideoDetails } from "../utils/GetVideoDetails.js";
import { Context } from "telegraf";

/**
 *
 * @param {Context} ctx
 * @returns
 */
const instagramDownloader = async (ctx) => {
  try {
    const link = ctx.update.message.text;
    const data = await snap(link);
    if (!data.status) {
      throw new Error(
        "Xatolik yuz berdi qaytadan urinib ko`ring linkni tekshirib"
      );
    }
    const video = await GetVideoDetails(data?.data || []);
    ctx.reply("yuborilmoqda kutib turing");
    if (video.length == 0 && video[0].type == "image") {
      ctx.sendChatAction("upload_photo");
      await ctx.replyWithPhoto(
        {
          url: video[0].url,
          thumbnail: video[0].thumbnail,
          filename: video[0].filename,
        },
        {
          width: 1080,
          height: 1920,

          caption: `@${process.env.BOT_USERNAME} orqali yuklandi kuningiz hayrli o'tsin 😊`,
        }
      );
    } else if (video.length == 0 && video[0].type == "video") {
      ctx.sendChatAction("upload_video");
      await ctx.replyWithVideo(
        {
          url: video[0].url,
          filename: video[0].filename,
        },
        {
          caption: `@${process.env.BOT_USERNAME} orqali yuklandi kuningiz hayrli o'tsin 😊`,
          width: 1080,
          height: 1920,
          supports_streaming: true,
        }
      );
    } else if (video.length > 0) {
      const mediagroup = video.map((el) => {
        const { type, thumbnail, url } = el;
        return {
          type: type == "image" ? "photo" : "video",
          media: {
            url: url,
          },
          parse_mode: "HTML",
          thumbnail: thumbnail,
          width: 1080,
          height: 1920,
          supports_streaming: type == "video" && true,
        };
      });

      if (mediagroup.length) {
        mediagroup[0].caption = `@${process.env.BOT_USERNAME} orqali yuklandi kuningiz hayrli o'tsin 😊`;
        ctx.sendChatAction("upload_document");
        await ctx.replyWithMediaGroup(mediagroup);
      }
    }
  } catch (error) {
    ctx.reply(error.message || "xatolik yuz berdi ");
  }

  //   console.log("hello world");
  //   const video = await getVideoDetails(data?.data);
};

export { instagramDownloader };
