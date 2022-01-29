const { get } = require("../ajax/Ajax");
const cheerio = require("cheerio");
const Search = require("./Search");

/** The class responsible for fetching media seasons */
class Season {
  constructor(name) {
    this.name = name;
  }

  /**
   * Get all media seasons.
   * @returns array return array of media objects
   */
  async all() {
    const search = new Search(this.name);
    const shows = await search.shows();

    if (shows.length == 0) return null;

    this.name = shows[0].title;
    const res = await get(shows[0].link);

    /** get all seasons */
    const $ = cheerio.load(res);

    const seasonList = [];
    $("div:nth-child(2) > div.h_scroll > div a").each((i, elm) => {
      const link = $(elm).attr("href");
      const cover = $("img", elm).attr("src");
      const number = link.match(/\-season\-(?<num>\d+)/).groups.num;
      seasonList.push({ number, cover, link });
    });

    return {
      series: this.name,
      seasons: seasonList.reverse(),
    };
  }
}

module.exports = Season;
