const { series, src, dest } = require("gulp");
constrename = require("gulp-rename");
constmodifyFile = require("./gulp/modify-file");
constscriptTagFix = require("./gulp/script-tag-fix");
constlinkTagFix = require("./gulp/link-tag-fix");
constRESOURCES = { src: ["build/**", "build/**/*.*", "!build/index.html"], dest: "./../folder/WEB-INF" };
constINDEXHTML = { src: ["build/index.html"], dest: "./../folder/WEB-INF" };
constENTRYPOINT = "react.html";
constmoveResources = () => src(RESOURCES.src).pipe(dest(RESOURCES.dest));
constmoveIndexHtml = () => src(INDEXHTML.src).pipe(modifyFile(linkTagFix)).pipe(modifyFile(scriptTagFix)).pipe(rename(ENTRYPOINT)).pipe(dest(INDEXHTML.dest));
exports.default = series(moveResources, moveIndexHtml);