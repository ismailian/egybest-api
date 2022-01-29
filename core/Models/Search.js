const needle = require("needle");

/** The class responsible for searching */
class Search {
  constructor(keyword) {
    this.keyword = keyword;
  }

  /** search for movies and tv shows */
  async all() {
    if (!this.content) {
      const res = await needle(
        "get",
        process.env.EGYBEST_SEARCH + this.keyword
      );
      this.content = res.body;
    }

    /** parse results */
    const mediaList = [];
    const data = JSON.parse(this.content);

    /** check if body is empty */
    if (!data.hasOwnProperty(this.keyword)) {
      return null;
    }

    data[this.keyword].forEach((m) => {
      mediaList.push({
        title: m.t,
        type: m.u.startsWith("series") ? "show" : "movie",
        cover: process.env.EGYBEST_IMG_CDN.replace("[id]", m.i),
        link: process.env.EGYBEST_URL + m.u,
      });
    });

    return mediaList;
  }

  /**
   * search movies
   * @returns Array returns an array of results
   */
  async movies() {
    if (!this.content) {
      const res = await needle(
        "get",
        `${process.env.EGYBEST_URL}autoComplete.php?q=${this.keyword}`
      );
      this.content = res.body;
    }

    /** parse results */
    const mediaList = [];
    const data = JSON.parse(this.content);

    /** check if body is empty */
    if (!data.hasOwnProperty(this.keyword)) {
      return null;
    }

    data[this.keyword].forEach((m) => {
      if (m.u.startsWith("movie")) {
        mediaList.push({
          title: m.t,
          type: m.u.startsWith("series") ? "show" : "movie",
          cover: process.env.EGYBEST_IMG_CDN.replace("[id]", m.i),
          link: process.env.EGYBEST_URL + m.u,
        });
      }
    });

    return mediaList;
  }

  /**
   * search tv shows
   * @returns Array returns an array of objects.
   */
  async shows() {
    if (!this.content) {
      const res = await needle(
        "get",
        `${process.env.EGYBEST_URL}autoComplete.php?q=${this.keyword}`
      );
      this.content = res.body;
    }

    /** parse results */
    const mediaList = [];
    const data = JSON.parse(this.content);

    /** check if body is empty */
    if (!data.hasOwnProperty(this.keyword)) {
      return null;
    }

    data[this.keyword].forEach((m) => {
      if (m.u.startsWith("series")) {
        mediaList.push({
          title: m.t,
          type: m.u.startsWith("series") ? "show" : "movie",
          cover: process.env.EGYBEST_IMG_CDN.replace("[id]", m.i),
          link: process.env.EGYBEST_URL + m.u,
        });
      }
    });

    return mediaList;
  }
}

module.exports = Search;
