/*! For license information please see playground.94fd7121ad.js.LICENSE */
(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{106:function(e,r){function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}e.exports=function(e,r){for(var o,t=0;t<r.length;t++){var _=r[t];_&&"object"===n(_)&&e in _&&(o=_[e])}return o}},108:function(e,r,n){"use strict";n.d(r,"a",(function(){return c}));var o={"classnames.js":n(338),"invoke-onchange.js":n(339),"merge-props.js":n(106),"resolve-value.js":n(340)},t="runtime__".concat(Math.random().toString(36).substr(2,10)),_=[];function c(e){var r=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return _.forEach((function(n){e=r?e.replace(n.code,n.beautifyName):e.replace(n.code,n.realName)})),e}Object.keys(o).forEach((function(e){var r="".concat(t,"@").concat(e);window[r]=o[e],_.push({code:'require("babel-plugin-react-directives/runtime/'.concat(e,'")'),realName:"window['".concat(r,"']"),beautifyName:e.replace(/^([A-Za-z0-9]+)(?:-([A-Za-z0-9]+))?\.js$/,(function(e,r,n){return n?r+n.charAt(0).toUpperCase()+n.substr(1):r}))})}))},33:function(e,r,n){},337:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var _runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(108),_style_playground_css__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(341),_style_playground_css__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(_style_playground_css__WEBPACK_IMPORTED_MODULE_1__),_style_loading_css__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(33),_style_loading_css__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(_style_loading_css__WEBPACK_IMPORTED_MODULE_2__),root=document.getElementById("app"),previewError=document.querySelector(".preview-render-error"),renderNull=function(){return null};function transformCode(e){return e=(e=(e=(e=Object(_runtime__WEBPACK_IMPORTED_MODULE_0__.a)(e)).replace(/export[\s\S]+default/g,"window.__App__ =")).replace(/module\.exports/g,"window.__App__")).replace(/export/g,"")}window.__render__=function render(code){window.__App__=renderNull,previewError.style.display="none";try{eval(transformCode(code)),ReactDOM.render(React.createElement(window.__App__),root)}catch(e){window.__catchError__(e)}},window.__catchError__=function(e){e&&(previewError.style.display="block",previewError.innerText="function"==typeof e.toString?e.toString():"Error: unknown exception"),console.error(e)},document.querySelector(".app-loading").style.display="none"},338:function(e,r){function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var o={}.hasOwnProperty;e.exports=function e(){for(var r=[],t=0;t<arguments.length;t++){var _=arguments[t];if(_){var c=n(_);if("string"===c||"number"===c)r.push(_);else if(Array.isArray(_)&&_.length){var a=e.apply(null,_);a&&r.push(a)}else if("object"===c)for(var i in _)o.call(_,i)&&_[i]&&r.push(i)}}return r.join(" ")}},339:function(e,r,n){var o=n(106);e.exports=function(e,r){var n=o("onChange",r);"function"==typeof n&&n.apply(this,e)}},340:function(e,r){e.exports=function(e){var r=e[0]&&e[0].target;return r&&1===r.nodeType?r.value:e[0]}},341:function(e,r,n){}},[[337,0]]]);
//# sourceMappingURL=playground.94fd7121ad.js.map