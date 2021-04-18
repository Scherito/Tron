/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_js_canvasUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/js/canvasUtil */ \"./src/js/canvasUtil.js\");\n/* harmony import */ var _src_js_playerInteraction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/js/playerInteraction */ \"./src/js/playerInteraction.js\");\n\r\n\r\n\r\n(0,_src_js_canvasUtil__WEBPACK_IMPORTED_MODULE_0__.createCanvas)()\r\nconsole.log(\"test\")\r\nvar myCanvas = document.getElementsByTagName(\"canvas\")\r\nconsole.log(myCanvas[0].getContext(\"2d\"))\r\nvar canvasContext = myCanvas[0].getContext(\"2d\")\r\nconsole.log(canvasContext)\r\n;(0,_src_js_canvasUtil__WEBPACK_IMPORTED_MODULE_0__.setDrawingColor)(canvasContext, \"#3DC3B3\")\r\ncanvasContext.fillRect(400,175,200,250)\r\n;(0,_src_js_canvasUtil__WEBPACK_IMPORTED_MODULE_0__.setDrawingColor)(canvasContext, \"#ffffff\")\r\ncanvasContext.fillRect(200,15,200,250)\r\n;(0,_src_js_playerInteraction__WEBPACK_IMPORTED_MODULE_1__.addKeydownListener)()\r\nvar gridInfo = (0,_src_js_canvasUtil__WEBPACK_IMPORTED_MODULE_0__.defineGrid)(myCanvas, 10, 10)\r\nvar block1 = (0,_src_js_canvasUtil__WEBPACK_IMPORTED_MODULE_0__.getCoordinatesForCell)(2, 3, gridInfo)\r\nvar block2 = (0,_src_js_canvasUtil__WEBPACK_IMPORTED_MODULE_0__.getCoordinatesForCell)(3, 3, gridInfo)\r\nvar block3 = (0,_src_js_canvasUtil__WEBPACK_IMPORTED_MODULE_0__.getCoordinatesForCell)(4, 3, gridInfo)\r\nvar block4 = (0,_src_js_canvasUtil__WEBPACK_IMPORTED_MODULE_0__.getCoordinatesForCell)(4, 4, gridInfo)\r\ncanvasContext.fillRect(block1.x,block1.y,gridInfo.columnwidth,gridInfo.rowsheight)\n\n//# sourceURL=webpack://tetris/./index.js?");

/***/ }),

/***/ "./node_modules/canvas/browser.js":
/*!****************************************!*\
  !*** ./node_modules/canvas/browser.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("/* globals document, ImageData */\n\nconst parseFont = __webpack_require__(/*! ./lib/parse-font */ \"./node_modules/canvas/lib/parse-font.js\")\n\nexports.parseFont = parseFont\n\nexports.createCanvas = function (width, height) {\n  return Object.assign(document.createElement('canvas'), { width: width, height: height })\n}\n\nexports.createImageData = function (array, width, height) {\n  // Browser implementation of ImageData looks at the number of arguments passed\n  switch (arguments.length) {\n    case 0: return new ImageData()\n    case 1: return new ImageData(array)\n    case 2: return new ImageData(array, width)\n    default: return new ImageData(array, width, height)\n  }\n}\n\nexports.loadImage = function (src, options) {\n  return new Promise(function (resolve, reject) {\n    const image = Object.assign(document.createElement('img'), options)\n\n    function cleanup () {\n      image.onload = null\n      image.onerror = null\n    }\n\n    image.onload = function () { cleanup(); resolve(image) }\n    image.onerror = function () { cleanup(); reject(new Error('Failed to load the image \"' + src + '\"')) }\n\n    image.src = src\n  })\n}\n\n\n//# sourceURL=webpack://tetris/./node_modules/canvas/browser.js?");

/***/ }),

/***/ "./node_modules/canvas/lib/parse-font.js":
/*!***********************************************!*\
  !*** ./node_modules/canvas/lib/parse-font.js ***!
  \***********************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/**\n * Font RegExp helpers.\n */\n\nconst weights = 'bold|bolder|lighter|[1-9]00'\n  , styles = 'italic|oblique'\n  , variants = 'small-caps'\n  , stretches = 'ultra-condensed|extra-condensed|condensed|semi-condensed|semi-expanded|expanded|extra-expanded|ultra-expanded'\n  , units = 'px|pt|pc|in|cm|mm|%|em|ex|ch|rem|q'\n  , string = '\\'([^\\']+)\\'|\"([^\"]+)\"|[\\\\w\\\\s-]+'\n\n// [ [ <‘font-style’> || <font-variant-css21> || <‘font-weight’> || <‘font-stretch’> ]?\n//    <‘font-size’> [ / <‘line-height’> ]? <‘font-family’> ]\n// https://drafts.csswg.org/css-fonts-3/#font-prop\nconst weightRe = new RegExp('(' + weights + ') +', 'i')\nconst styleRe = new RegExp('(' + styles + ') +', 'i')\nconst variantRe = new RegExp('(' + variants + ') +', 'i')\nconst stretchRe = new RegExp('(' + stretches + ') +', 'i')\nconst sizeFamilyRe = new RegExp(\n  '([\\\\d\\\\.]+)(' + units + ') *'\n  + '((?:' + string + ')( *, *(?:' + string + '))*)')\n\n/**\n * Cache font parsing.\n */\n\nconst cache = {}\n\nconst defaultHeight = 16 // pt, common browser default\n\n/**\n * Parse font `str`.\n *\n * @param {String} str\n * @return {Object} Parsed font. `size` is in device units. `unit` is the unit\n *   appearing in the input string.\n * @api private\n */\n\nmodule.exports = function (str) {\n  // Cached\n  if (cache[str]) return cache[str]\n\n  // Try for required properties first.\n  const sizeFamily = sizeFamilyRe.exec(str)\n  if (!sizeFamily) return // invalid\n\n  // Default values and required properties\n  const font = {\n    weight: 'normal',\n    style: 'normal',\n    stretch: 'normal',\n    variant: 'normal',\n    size: parseFloat(sizeFamily[1]),\n    unit: sizeFamily[2],\n    family: sizeFamily[3].replace(/[\"']/g, '').replace(/ *, */g, ',')\n  }\n\n  // Optional, unordered properties.\n  let weight, style, variant, stretch\n  // Stop search at `sizeFamily.index`\n  let substr = str.substring(0, sizeFamily.index)\n  if ((weight = weightRe.exec(substr))) font.weight = weight[1]\n  if ((style = styleRe.exec(substr))) font.style = style[1]\n  if ((variant = variantRe.exec(substr))) font.variant = variant[1]\n  if ((stretch = stretchRe.exec(substr))) font.stretch = stretch[1]\n\n  // Convert to device units. (`font.unit` is the original unit)\n  // TODO: ch, ex\n  switch (font.unit) {\n    case 'pt':\n      font.size /= 0.75\n      break\n    case 'pc':\n      font.size *= 16\n      break\n    case 'in':\n      font.size *= 96\n      break\n    case 'cm':\n      font.size *= 96.0 / 2.54\n      break\n    case 'mm':\n      font.size *= 96.0 / 25.4\n      break\n    case '%':\n      // TODO disabled because existing unit tests assume 100\n      // font.size *= defaultHeight / 100 / 0.75\n      break\n    case 'em':\n    case 'rem':\n      font.size *= defaultHeight / 0.75\n      break\n    case 'q':\n      font.size *= 96 / 25.4 / 4\n      break\n  }\n\n  return (cache[str] = font)\n}\n\n\n//# sourceURL=webpack://tetris/./node_modules/canvas/lib/parse-font.js?");

/***/ }),

/***/ "./src/js/canvasUtil.js":
/*!******************************!*\
  !*** ./src/js/canvasUtil.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createCanvas\": () => (/* binding */ createCanvas),\n/* harmony export */   \"getCanvasContext\": () => (/* binding */ getCanvasContext),\n/* harmony export */   \"setDrawingColor\": () => (/* binding */ setDrawingColor),\n/* harmony export */   \"defineGrid\": () => (/* binding */ defineGrid),\n/* harmony export */   \"getCoordinatesForCell\": () => (/* binding */ getCoordinatesForCell)\n/* harmony export */ });\n/* harmony import */ var canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! canvas */ \"./node_modules/canvas/browser.js\");\n\r\n\r\n/**\r\n * @description creates a canvas and attaches it to the body\r\n * @param {string} id - the ID of the canvas \r\n * @param {number} width - the width of the canvas\r\n * @param {number} height - the height of the canvas\r\n */\r\nfunction createCanvas(id, width, height){\r\n    var canvasElement = document.createElement(\"canvas\")\r\n    canvasElement.id = id\r\n    canvasElement.width = width\r\n    canvasElement.height = height \r\n    document.body.appendChild(canvasElement)\r\n}\r\n\r\n/**\r\n * @description Takes an ID and searches for a Canvas with the ID.\r\n *  Returns the Context of the Canvas.\r\n * @param {string} id - The ID of the canvas to search for.\r\n * @returns {CanvasRenderingContext2D} The drawing context of the canvas.\r\n */\r\nfunction getCanvasContext(id){\r\n    var canvasElement = document.getElementById(id)\r\n    var canvasContext = canvasElement.getContext(\"2d\")\r\n    return canvasContext\r\n}\r\n\r\n/**\r\n * @description Tell the canvas what colour to draw in. \r\n * @param {CanvasRenderingContext2D} canvasContext - the drawing\r\n *  context of the canvas.\r\n * @param {string} hexCode - the colour we want to draw with.\r\n */\r\nfunction setDrawingColor(canvasContext, hexCode){\r\n    canvasContext.fillStyle = hexCode\r\n}\r\n/**\r\n * @description Tells us the height and width of the rows and columns \r\n * and gives them back as an object\r\n * @param {HTMLCanvasElement} canvas - the canvas we want do define the grid on \r\n * @param {number} rows - tells us how many of them we get/need\r\n * @param {number} columns - tells us how many we get/need \r\n * @returns {Grid}\r\n */\r\nfunction defineGrid(canvas, rows, columns) {\r\n    canvas.width \r\n    canvas.height\r\n    var rowsheight = canvas.height / rows\r\n    var columnwidth = canvas.width / columns\r\n    return {\r\n        columnwidth,\r\n        rowsheight\r\n    }\r\n}\r\n/**\r\n * @description Takes a rowindex and a columnindex and gives the coordinates\r\n * of the corresponding cell.\r\n * @param {number} rowindex (Zeile) \r\n * @param {number} columnindex (Spalte)\r\n * @param {Grid} defineGrid \r\n * @returns {Coordinate}\r\n */\r\nfunction getCoordinatesForCell(rowindex, columnindex, defineGrid) {\r\n    var x_Coordinate = columnindex * defineGrid.columnwidth \r\n    var y_Coordinate = rowindex * defineGrid.rowsheight\r\n    return { \r\n        x_Coordinate,\r\n        y_Coordinate\r\n    }\r\n}\r\n\r\n/**\r\n * @typedef {object} Grid\r\n * @property {number} rowsheight \r\n * @property {number} columnwidth\r\n */\r\n\r\n/**\r\n * @typedef {object} Coordinate\r\n * @property {number} x_Coordinate\r\n * @property {number} y_Coordinate\r\n */\n\n//# sourceURL=webpack://tetris/./src/js/canvasUtil.js?");

/***/ }),

/***/ "./src/js/playerInteraction.js":
/*!*************************************!*\
  !*** ./src/js/playerInteraction.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addKeydownListener\": () => (/* binding */ addKeydownListener)\n/* harmony export */ });\n/**\r\n * @description start listening to the game input.\r\n */\r\nfunction addKeydownListener() {\r\n    document.addEventListener(\"keydown\", function (event) {\r\n        if (event.isComposing || event.keyCode === 229) {\r\n            return\r\n        }\r\n        if (event.keyCode === 67) {\r\n            console.log(\"zurückhalten\")\r\n        } else if (event.keyCode === 32) {\r\n            console.log(\"runterlassen\")\r\n        } else if (event.keyCode === 40) {\r\n            console.log(\"nach unten bewegen\")\r\n        } else if (event.keyCode === 37) {\r\n            console.log(\"nach links bewegen\")\r\n        } else if (event.keyCode === 39) {\r\n            console.log(\"nach rechts bewegen\")\r\n        } else if (event.keyCode === 38) {\r\n            console.log(\"blöcke drehen\")\r\n        }\r\n    })\r\n}\n\n//# sourceURL=webpack://tetris/./src/js/playerInteraction.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./index.js");
/******/ 	
/******/ })()
;