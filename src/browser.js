const puppeteer = require("puppeteer");

class Browser {
  async init() {
    this.browser = await puppeteer.launch({ headless: true });
  }

  async fetchElement(page, tag, attribute) {
    console.log(tag, attribute);
    switch (tag) {
      case "head":
        return await page.$$eval("head", res => res);
      case "a":
      case "links":
        return await page.$$eval("a", links => links.map(a => a.href));
      case "img":
        return await page.$$eval("img", links => links.map(a => a.src));
      default:
        return await page.$$eval(
          tag,
          (res, attr) =>
            res.map(a => {
              return a[attr];
            }),
          attribute
        );
    }
  }

  async run(url, tag, attribute) {
    console.log(url, tag, attribute);
    const page = await this.browser.newPage();
    await page.goto(url);
    // let ss = await page.screenshot();
    let response = {};
    // response.title = await page.title();
    // response.links = await page.$$eval("a", links => links.map(a => a.href));
    // response.images = await page.$$eval("img", links => links.map(a => a.src));
    console.log(url, tag, attribute);
    response[tag] = await this.fetchElement(page, tag, attribute);

    // return ss;
    return response;
  }
}

module.exports = new Browser();
