module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var ctx = '@@audio';

exports.default = {
  bind: function bind(el, _ref, _ref2) {
    var value = _ref.value,
        modifiers = _ref.modifiers;
    var context = _ref2.context;

    el[ctx] = {
      src: value,
      handler: function handler() {
        context.$music.play({
          el: el,
          src: el[ctx].src,
          loop: modifiers.loop
        });
      }
    };
    el.addEventListener('click', el[ctx].handler);
  },
  update: function update(el, _ref3) {
    var value = _ref3.value;

    if (el[ctx]) {
      el[ctx].src = value;
    }
  },
  unbind: function unbind(el) {
    if (el[ctx]) {
      el.removeEventListener('click', el[ctx].handler);
      el[ctx] = null;
    }
  }
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var AUDIO = void 0;

exports.default = {
  play: function play(_ref) {
    var _this = this;

    var el = _ref.el,
        src = _ref.src,
        loop = _ref.loop;

    if (this.el && el !== this.el) {
      this.el.classList.remove('is-loading');
      this.el.classList.remove('is-play');
      this.el.classList.remove('is-pause');
    }

    this.el = el;

    if (!AUDIO) {
      AUDIO = new Audio();
      AUDIO.addEventListener('loadstart', function () {
        if (_this.el) {
          _this.el.classList.add('is-loading');
        }
      });
      AUDIO.addEventListener('playing', function () {
        if (_this.el) {
          _this.el.classList.remove('is-loading');
          _this.el.classList.remove('is-pause');
          _this.el.classList.add('is-play');
        }
      });
      AUDIO.addEventListener('pause', function () {
        if (_this.el) {
          _this.el.classList.remove('is-loading');
          _this.el.classList.remove('is-play');
          _this.el.classList.add('is-pause');
        }
      });
      AUDIO.addEventListener('ended', function () {
        if (_this.el && !loop) {
          _this.el.classList.remove('is-play');
        }
      });
    }

    if (AUDIO.src !== src) {
      AUDIO.src = src;
      AUDIO.load();
    }
    AUDIO.loop = loop;
    if (!AUDIO.paused) {
      AUDIO.pause();
    } else {
      AUDIO.play();
    }
  },
  stop: function stop() {
    if (this.el) {
      this.el.classList.remove('is-loading');
      this.el.classList.remove('is-play');
      this.el.classList.remove('is-pause');
      this.el = null;
      AUDIO.src = '';
      AUDIO.pause();
    }
  }
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (Vue) {
  Vue.directive('music', _directive2.default);
  Vue.prototype.$music = _plugin2.default;
};

var _directive = __webpack_require__(0);

var _directive2 = _interopRequireDefault(_directive);

var _plugin = __webpack_require__(1);

var _plugin2 = _interopRequireDefault(_plugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ })
/******/ ]);