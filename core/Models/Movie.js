const { get } = require("../ajax/Ajax");
const cheerio = require("cheerio");
const Search = require("./Search");

/**
 * this class is responsible for fetching movie info
 */
class Movie {
  constructor(name) {
    this.name = name;
  }

  /**
   * fetch info about a movie.
   * @return Object returns an object
   */
  async get() {
    const search = new Search(this.name);
    const movies = await search.movies();
    if (movies.length == 0) {
      return null;
    }

    this.name = movies[0].title;
    const res = await get(movies[0].link);
    const $ = cheerio.load(res.body);

    // extract data
    const title = $(
      ".full_movie.table.full.mgb > div:nth-child(2) > table > tbody > tr:nth-child(1) > td > h1"
    ).text();

    var language = $(
      ".full_movie.table.full.mgb > div:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(2) > a:nth-child(1)"
    ).attr("href");

    var country = $(
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
        .match(/movies\/(?<gr>\S+)\//).groups.gr;
      genres.push(genre);
    });

    const rate = $(
      ".full_movie.table.full.mgb > div:nth-child(2) > table > tbody > tr:nth-child(5) > td:nth-child(2) > strong > span"
    ).text();

    const duration = $(
      ".full_movie.table.full.mgb > div:nth-child(2) > table > tbody > tr:nth-child(6) > td:nth-child(2)"
    ).text();

    // quality
    const quality = [];
    $(
      ".full_movie.table.full.mgb > div:nth-child(2) > table > tbody > tr:nth-child(7) > td:nth-child(2) > a"
    ).each((i, elm) => {
      quality.push(
        $(elm)
          .attr("href")
          .match(/movies\/(?<qlt>\S+)/).groups.qlt
      );
    });

    const votes = $(".ItemRatingScore > span > span.cpnt").text();

    const description = $(
      "#mainLoad > div:nth-child(1) > div:nth-child(5) > div:nth-child(2)"
    ).text();

    const cover = $(
      ".full_movie.table.full.mgb > div.movie_cover.mgb.tam.td.vat.pdl > div > a > img"
    ).attr("src");

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

    language = language.match(/movies\/(?<lang>\S+)/).groups.lang;
    country = country.match(/movies\/(?<ctr>\S+)/).groups.ctr;

    return {
      title,
      language,
      country,
      category,
      genres,
      rate,
      votes,
      quality,
      duration,
      description,
      cover,
      downloadable_formats,
    };
  }
}

module.exports = Movie;
