const cheerio = require("cheerio");
const needle = require("needle");
const Search = require("./Search");

/** The class responsible for fetching media seasons */
class Episode {
  constructor(name, season) {
    this.name = name;
    this.season = season;
  }

  /**
   * Get all season episodes.
   * @returns array return array of media objects
   */
  async all() {
    const search = new Search(this.name);
    const shows = await search.shows();

    if (shows.length == 0) return null;

    /** extract name */
    var link = shows[0].link;
    this.name = shows[0].title;
    link = `${process.env.EGYBEST_URL}season/${this.name}-season-${this.season}/`;

    /** get all episodes */
    const res = await needle("get", link);
    const $ = cheerio.load(res.body);
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
      season: this.season,
      episodes: episodeList.reverse(),
    };
  }

  /**
   * Get episode info by number
   * @param {Number} episode the episode number
   */
  async get(episode) {
    const search = new Search(this.name);
    const shows = await search.shows();

    if (shows.length == 0) return null;

    /** extract name */
    this.name = shows[0].title;
    var link = shows[0].link;
    link = `${process.env.EGYBEST_URL}episode/${this.name}-season-${this.season}-ep-${episode}/`;

    /** get all episodes */
    const res = await needle("get", link);
    const $ = cheerio.load(res.body);

    // title
    const title = $(
      ".full_movie.table.full.mgb > div:nth-child(2) > table > tbody > tr:nth-child(1) > td > h1"
    ).text();

    // language
    var language = $(
      ".full_movie.table.full.mgb > div:nth-child(2) > table > tbody > tr:nth-child(3) > td:nth-child(2) > a:nth-child(1)"
    ).attr("href");

    // country
    var country = $(
      ".full_movie.table.full.mgb > div:nth-child(2) > table > tbody > tr:nth-child(3) > td:nth-child(2) > a:nth-child(2)"
    ).attr("href");

    // duration
    const duration = $(
      ".full_movie.table.full.mgb > div:nth-child(2) > table > tbody > tr:nth-child(7) > td:nth-child(2)"
    ).text();

    // category
    var category = $(
      ".full_movie.table.full.mgb > div:nth-child(2) > table > tbody > tr:nth-child(4) > td:nth-child(2) > a"
    ).attr("href");

    // rating
    const rating = $(
      ".full_movie.table.full.mgb > div:nth-child(2) > table > tbody > tr:nth-child(6) > td:nth-child(2) > span:nth-child(2) > strong"
    ).text();

    // genres
    const genres = [];
    $(
      ".full_movie.table.full.mgb > div:nth-child(2) > table > tbody > tr:nth-child(5) > td:nth-child(2) > a"
    ).each((i, elm) => {
      genres.push(
        $(elm)
          .attr("href")
          .match(/tv\/(?<gr>\S+)\//).groups.gr
      );
    });

    // votes
    const votes = $(".ItemRatingScore .cpnt").text();

    // quality
    const quality = [];
    $(
      ".full_movie.table.full.mgb > div:nth-child(2) > table > tbody > tr:nth-child(8) > td:nth-child(2) > a"
    ).each((i, elm) => {
      quality.push(
        $(elm)
          .attr("href")
          .match(/tv\/(?<gr>\S+)/).groups.gr
      );
    });

    const cover = $(
      ".full_movie.table.full.mgb > div.movie_cover.mgb.tam.td.vat.pdl > div > a > img"
    ).attr("src");

    // download formats
    const downloadable_formats = [];
    $(".dls_table tbody tr").each((n, elm) => {
      const tds = $("td", elm);
      downloadable_formats.push({
        quality: tds.eq(0).text(),
        format: tds
          .eq(1)
          .text()
          .match(/(?<fmt>\d+p)/).groups.fmt,
        size: tds.eq(2).text(),
      });
    });

    country = country.match(/tv\/(?<ctr>\S+)/).groups.ctr;
    language = language.match(/tv\/(?<lang>\S+)/).groups.lang;
    category = category.match(/tv\/(?<cat>\S+)/).groups.cat;

    return {
      series: this.name,
      season: this.season,
      episode: {
        number: episode,
        title,
        country,
        language,
        category,
        genres,
        rating,
        duration,
        quality,
        votes,
        downloadable_formats,
        cover,
        link,
      },
    };
  }
}

module.exports = Episode;
