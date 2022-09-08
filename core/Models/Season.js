const { get } = require("../ajax/Ajax");
const cheerio = require("cheerio");
const Search = require("./Search");

/** The class responsible for fetching media seasons */
class Season {
  constructor(name, number) {
    this.name = name;
    this.number = number;
  }

  /**
   * Get season info
   * @returns Object returns object of data
   */
  async get() {
    const search = new Search(this.name);
    const shows = await search.shows();

    if (shows.length === 0) return null;

    /** extract name */
    this.name = shows[0].title;
    let link = shows[0].link;
    link = `${process.env.EGYBEST_URL}season/${this.name}-season-${this.number}/`;
    link = link.replaceAll(" ", "-");

    /** get all episodes */
    const res = await get(link);
    const $ = cheerio.load(res);
    const nodeList = $("div:nth-child(3) > div.movies_small a");

    const episodeList = [];
    nodeList.each((n, elm) => {
      const title = $("span.title", elm).text();
      const format = $("span.ribbon > span", elm).text();
      const rating = $("span.r > i > i", elm).text();
      const cover = $("img", elm).attr("src");
      const link = $(elm).attr("href");

      episodeList.push({
        title,
        rating,
        format,
        cover,
        link,
      });
    });

    return {
      series: this.name,
      season: this.number,
      episodes: episodeList.reverse(),
    };
  }
}

module.exports = Season;
