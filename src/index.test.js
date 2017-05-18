import { expect } from "chai";
import jsdom from "jsdom";
import fs from "fs";

const { JSDOM } = jsdom;

describe("Our first test", () => {
  it("should pass", () => {
    expect(true).to.equal(true);
  });
});

describe("index.html", () => {
  it("should say hello", (done) => {
    const index = fs.readFileSync("./src/index.html", "utf-8");
    const dom = new JSDOM(index);
    const h1 = dom.window.document.getElementsByTagName("h1")[0];

    expect(h1.innerHTML).to.equal("Hello world! :D");
    done();
    dom.window.close();
  });
});
