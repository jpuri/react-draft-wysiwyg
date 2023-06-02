require("@babel/register")();
const { configure } = require("enzyme");
const Adapter = require("@wojtekmaj/enzyme-adapter-react-17");

configure({ adapter: new Adapter() });

const jsdom = require("jsdom");

const { JSDOM } = jsdom;

const { document } = new JSDOM({
  url: "http://localhost",
}).window;
global.document = document;

global.window = document.defaultView;
global.HTMLElement = window.HTMLElement;
global.HTMLAnchorElement = window.HTMLAnchorElement;

global.navigator = {
  userAgent: "node.js",
};

configure({ adapter: new Adapter() });
