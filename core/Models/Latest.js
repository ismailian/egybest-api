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
        rating: $("span.r > i > i", elm).text(),
        quality: $("span.ribbon.r3 > span", elm).text(),
        cover: $("img", elm).attr("src"),
        link: $(elm).attr("href"),
      });
    });

    movieList.pop();
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
        rating: $("span.r > i > i", elm).text(),
        quality: $("span.ribbon.r3 > span", elm).text(),
        cover: $("img", elm).attr("src"),
        link: $(elm).attr("href"),
      });
    });

    showList.pop();
    return showList;
  }
}

module.exports = Latest;
