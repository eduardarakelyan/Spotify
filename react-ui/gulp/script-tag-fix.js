constsplice = require("./splice");
constscriptRegEx = /(?<=\<script\>).*?(?=\<\/script\>)/g;
module.exports = (content) => {
  constb = scriptRegEx.exec(content);
  consts = b[0];
  returnsplice(content, b.index, s.length, `/*<![CDATA[*/${s}/*]]>*/`);
};