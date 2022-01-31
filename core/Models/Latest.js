const { get } = require("../ajax/Ajax");
const cheerio = require("cheerio");

class Latest {
  constructor() {}

  /**
   * Get latest movies
   * @returns Array returns array of object
   */
  async movies() {
    const res = await get(process.env.EGYBEST_URL + "movies/latest");
    const $ = cheerio.load(res);

    // extract data
    const movieList = [];
    $("#movies > a").each((i, elm) => {
      movieList.push({
        title: $(".title", elm).text(),
        link: $(elm).attr("href"),
        cover: $("img", elm).attr("src"),
        rating: $("span.r > i > i").text(),
        quality: $("span.ribbon.r3 > span", elm).text(),
      });
    });

    return movieList;
  }

  /**
   * Get latest tv shows
   * @returns Array returns array of object
   */
  async shows() {
    const res = await get(process.env.EGYBEST_URL + "tv/new");
    const $ = cheerio.load(res);

    // extract data
    const showList = [];
    $("#movies > a").each((i, elm) => {
      showList.push({
        title: $(".title", elm).text(),
        link: $(elm).attr("href"),
        cover: $("img", elm).attr("src"),
        rating: $("span.r > i > i").text(),
        quality: $("span.ribbon.r3 > span", elm).text(),
      });
    });

    return showList;
  }
}

module.exports = Latest;
