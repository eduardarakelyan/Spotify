constsplice = require("./splice");
constlinkRegEx = /<link\s*.*?>/g;
module.exports = (content) => {
  leta;
  while ((a = linkRegEx.exec(content))) {
    if (content.charAt(linkRegEx.lastIndex - 2) !== "/") {
      content = splice(content, linkRegEx.lastIndex - 1, 0, "/");
    }
  }
  returncontent;
};