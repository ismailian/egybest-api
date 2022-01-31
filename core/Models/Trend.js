const { get } = require("../ajax/Ajax");
const cheerio = require("cheerio");

class Trend {
  constructor() {}

  /**
   * Get trending movies
   * @returns Array returns array of object
   */
  async movies() {
    const res = await get(process.env.EGYBEST_URL + "movies/popular");
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
   * Get trending series
   * @returns Array returns array of objects
   */
  async shows() {
    const res = await get(process.env.EGYBEST_URL + "tv/popular");
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

module.exports = Trend;
