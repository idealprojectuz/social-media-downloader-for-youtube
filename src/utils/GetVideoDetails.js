import axios from "axios";
import jwt from "jsonwebtoken";
import path from "path";
const GetVideoDetails = async (videoarr) => {
  const videos = [];
  videoarr.map((e) => {
    let obj = videos.find((d) => d.url == e.url);
    if (!obj) {
      videos.push(e);
    }
  });
  const processing = videos.map(async (el) => {
    try {
      const { thumbnail, url } = el;
      let params = url.split("?")[1];
      const urlparam = new URLSearchParams(params);
      let token = urlparam.get("token");
      if (!token) {
        const { headers } = await axios.head(url);
        if (!headers) throw new Error("url not recomended");
        let type = headers["content-type"].split("/")[0];
        let filename = headers["content-disposition"].split(
          "attachment; filename="
        )[1];
        return {
          thumbnail,
          url,
          type,
          filename,
        };
      } else {
        const decoded = jwt.decode(token);
        let type;
        if (path.extname(decoded?.filename) == ".mp4") {
          type = "video";
        } else {
          type = "image";
        }
        return {
          thumbnail,
          url,
          filename: decoded.filename,
          type: type,
        };
      }
    } catch (e) {
      console.log(e);
    }
  });
  return await Promise.all(processing);
};
export { GetVideoDetails };
