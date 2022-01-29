const { get } = require("../ajax/Ajax");
const cheerio = require("cheerio");

/**
 * The home class
 */
class Home {
  constructor() {}

  /**
   * grab all recent movies.
   */
  async movies() {
    if (!this.content) {
      this.content = await get(process.env.EGYBEST_URL);
    }

    /** get media objects */
    const $ = cheerio.load(this.content);
    const mediaList = [];
    $("div:nth-child(2) > div.h_scroll > div > .movie").each((i, elm) => {
      const title = $("span.title", elm).text();
      const format = $("span.ribbon > span", elm).text();
      const rating = $("span.r > i > i", elm).text();
      const cover = $("img", elm).attr("src");
      const link = $(elm).attr("href");

      mediaList.push({
        title,
        format,
        rating,
        cover,
        link,
      });
    });

    return mediaList;
  }

  /**
   * grab all recent tv shows.
   */
  async shows() {
    if (!this.content) {
      this.content = await get(process.env.EGYBEST_URL);
    }

    const $ = cheerio.load(this.content);

    /** get media objects */
    const mediaList = [];
    $("div:nth-child(3) > div.h_scroll > div > .movie").each((i, elm) => {
      const title = $("span.title", elm).text();
      const format = $("span.ribbon > span", elm).text();
      const rating = $("span.r > i > i", elm).text();
      const cover = $("img", elm).attr("src");
      const link = $(elm).attr("href");

      mediaList.push({
        title,
        format,
        rating,
        cover,
        link,
      });
    });

    return mediaList;
  }
}

module.exports = Home;
