const { get } = require("../ajax/Ajax");
const cheerio = require("cheerio");
const Search = require("./Search");

/** This class is responsible for fetching Tv Show info */
class Show {
  constructor(name) {
    this.name = name;
  }

  /**
   * Get info about a tv show.
   */
  async get() {
    const search = new Search(this.name);
    const shows = await search.shows();
    if (shows.length === 0) {
      return null;
    }

    this.name = shows[0].title;
    const res = await get(shows[0].link);
    const $ = cheerio.load(res);

    // extract data
    const title = $(
      ".full_movie.table.full.mgb > div:nth-child(2) > table > tbody > tr:nth-child(1) > td > h1"
    ).text();

    let language = $(
        ".full_movie.table.full.mgb > div:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(2) > a:nth-child(1)"
    ).attr("href");

    let country = $(
        ".full_movie.table.full.mgb > div:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(2) > a:nth-child(2)"
    ).attr("href");

    const category = $(
      ".full_movie.table.full.mgb > div:nth-child(2) > table > tbody > tr:nth-child(3) > td:nth-child(2) > a"
    ).text();

    const genres = [];
    $(
      ".full_movie.table.full.mgb > div:nth-child(2) > table > tbody > tr:nth-child(4) > td:nth-child(2) > a"
    ).each((i, elm) => {
      const genre = $(elm)
        .attr("href")
        .match(/tv\/(?<gr>\S+)\//).groups.gr;
      genres.push(genre);
    });

    const rate = $(
      ".full_movie.table.full.mgb > div:nth-child(2) > table > tbody > tr:nth-child(5) > td:nth-child(2) > strong > span"
    ).text();

    const cover = $(
      ".full_movie.table.full.mgb > div.movie_cover.mgb.tam.td.vat.pdl > div > a > img"
    ).attr("src");

    const votes = $(".ItemRatingScore > span > span.cpnt").text();

    const description = $(
      "#mainLoad > div:nth-child(1) > div:nth-child(5) > div:nth-child(2)"
    ).text();

    const seasons = [];
    $("#mainLoad > div:nth-child(2) > div.h_scroll > div > a").each(
      (i, elm) => {
        seasons.push({
          title: $(".title", elm).text(),
          cover: $("img", elm).attr("src"),
          link: $(elm).attr("href"),
        });
      }
    );

    language = language.match(/tv\/(?<lang>\S+)/).groups.lang;
    country = country.match(/tv\/(?<ctr>\S+)/).groups.ctr;

    return {
      series: this.name,
      title,
      language,
      country,
      genres,
      category,
      rate,
      votes,
      description,
      cover,
      seasons: seasons.reverse(),
    };
  }
}

module.exports = Show;
