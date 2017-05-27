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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _throttle = __webpack_require__(8);

var _throttle2 = _interopRequireDefault(_throttle);

var _scrollEventTarget = __webpack_require__(5);

var _scrollEventTarget2 = _interopRequireDefault(_scrollEventTarget);

var _scrollTop = __webpack_require__(6);

var _scrollTop2 = _interopRequireDefault(_scrollTop);

var _DOMEvent = __webpack_require__(2);

var _DOMEvent2 = _interopRequireDefault(_DOMEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'virtual-scroll',
  render: function render(createElement) {
    var slots = this.$slots.default ? this.filter(this.$slots.default) : [];

    return createElement('div', [createElement('div', {
      'style': {
        'padding-top': this.paddingTop + 'px',
        'padding-bottom': this.allPadding - this.paddingTop + 'px'
      }
    }, slots)]);
  },

  props: {
    size: {
      type: [String, Number],
      required: true
    },
    offset: {
      type: [String, Number],
      default: 0
    },
    preload: {
      type: Number,
      default: 0
    },
    remain: {
      type: Number,
      default: 10
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      slotSize: 0,
      slotOffset: 0,
      start: 0,
      end: 0,
      total: 0,
      viewTop: 0,
      viewHeight: 0,
      allPadding: 0,
      paddingTop: 0
    };
  },

  methods: {
    toPX: function toPX(value) {
      if (/rem$/.test(value)) {
        var rem = Number(getComputedStyle(document.documentElement, null).getPropertyValue('font-size').replace('px', ''));
        return Number(value.replace(/rem$/, '')) * rem;
      } else if (/vw$/.test(value)) {
        return Number(value.replace(/vw$/, '') * document.documentElement.clientWidth / 100);
      } else if (/vh$/.test(value)) {
        return Number(value.replace(/vh$/, '') * document.documentElement.clientHeight / 100);
      } else {
        return Number(('' + value).replace(/px$/, ''));
      }
    },
    getViewTop: function getViewTop() {
      var top = this.$el.getBoundingClientRect().top - (this.scrollEventTarget !== window ? this.scrollEventTarget.getBoundingClientRect().top : 0);
      var scrollTop = this.$el !== this.scrollEventTarget ? (0, _scrollTop2.default)(this.scrollEventTarget) : 0;

      return top + scrollTop;
    },
    getVisibleHeight: function getVisibleHeight(el) {
      if (el === window) {
        return document.documentElement.clientHeight;
      }

      return el.clientHeight;
    },
    filter: function filter(slots) {
      var _this = this;

      if (slots.length === 0) return [];
      var len = Math.min(slots.length, this.remain);
      var scrollHeight = this.slotSize * slots.length + this.slotOffset * Math.max(slots.length - 1, 0);
      var contentHeight = this.slotSize * len + this.slotOffset * Math.max(len - 1, 0);

      this.total = slots.length;
      this.allPadding = scrollHeight - contentHeight;
      this.paddingTop = this.slotSize * this.start + this.slotOffset * this.start;

      return slots.filter(function (slot, index) {
        return index >= _this.start && index <= _this.end;
      });
    },
    onScroll: function onScroll() {
      if (this.total === 0) return;
      var scrollTop = Math.max((0, _scrollTop2.default)(this.scrollEventTarget) - this.viewTop, 0);
      var overs = Math.floor((scrollTop + this.slotOffset) / (this.slotSize + this.slotOffset));
      var start = Math.max(overs - this.preload, 0);
      var end = start + this.remain - 1;

      if (end >= this.total) {
        end = this.total;
        start = Math.max(this.total - this.remain, 0);
        if (!this.disabled) this.$emit('toBottom');
      }
      this.end = end;
      this.start = start;

      this.$forceUpdate();
    },
    onResize: function onResize() {
      this.viewTop = this.getViewTop();
      this.viewHeight = this.scrollEventTarget === window ? document.documentElement.clientHeight : this.scrollEventTarget.clientHeight;
      this.slotSize = this.toPX(this.size);
      this.slotOffset = this.toPX(this.offset);
      this.onScroll();
    }
  },
  created: function created() {
    this.slotSize = this.toPX(this.size);
    this.slotOffset = this.toPX(this.offset);
    this.end = this.remain - 1;
  },
  mounted: function mounted() {
    var _this2 = this;

    this.scrollEventTarget = (0, _scrollEventTarget2.default)(this.$el);
    this.scrollListener = function () {
      return _this2.onScroll();
    };
    this.resizeListener = (0, _throttle2.default)(function () {
      return _this2.onResize();
    }, 200);
    this.viewTop = this.getViewTop();
    this.viewHeight = this.getVisibleHeight(this.scrollEventTarget);
    _DOMEvent2.default.on(this.scrollEventTarget, 'scroll', this.scrollListener, { passive: true });
    _DOMEvent2.default.on(window, 'resize', this.resizeListener);
  },
  beforeDestroy: function beforeDestroy() {
    _DOMEvent2.default.off(this.scrollEventTarget, 'scroll', this.scrollListener);
    _DOMEvent2.default.off(window, 'resize', this.resizeListener);
  }
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (Vue) {
  Vue.component(_virtualScroll2.default.name, _virtualScroll2.default);
};

var _virtualScroll = __webpack_require__(0);

var _virtualScroll2 = _interopRequireDefault(_virtualScroll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _supportPassive = __webpack_require__(7);

var _supportPassive2 = _interopRequireDefault(_supportPassive);

var _css = __webpack_require__(3);

var _css2 = _interopRequireDefault(_css);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ANIMATION_EVENT = {
  'animation': 'animationend',
  'WebkitAnimation': 'webkitAnimationEnd',
  'MozAnimation': 'mozAnimationEnd',
  'OAnimation': 'oAnimationEnd',
  'msAnimation': 'MSAnimationEnd'
};

var TRANSITION_EVENT = {
  'transition': 'transitionend',
  'WebkitTransition': 'webkitTransitionEnd',
  'MozTransition': 'mozTransitionEnd',
  'OTransition': 'oTransitionEnd',
  'msTransition': 'MSTransitionEnd'
};

exports.default = {
  on: function on(el, type, callback, options) {
    type = this._eventType(type);

    if (Object.prototype.toString.call(options) === '[object Object]' && options.passive) {
      if (!_supportPassive2.default) delete options.passive;
      el.addEventListener(type, callback, Object.keys(options).length > 0 ? options : false);
    } else {
      el.addEventListener(type, callback, options || false);
    }
  },
  off: function off(el, type, callback) {
    type = this._eventType(type);
    el.removeEventListener(type, callback);
  },
  once: function once(el, type, callback, options) {
    var _this = this;

    var func = function func(e) {
      callback(e);
      _this.off(el, type, func);
    };
    this.on(el, type, func, options);
  },
  _eventType: function _eventType(type) {
    if (type === 'transitionend') {
      return TRANSITION_EVENT[(0, _css2.default)(document.body, 'transition')];
    } else if (type === 'animationend') {
      return ANIMATION_EVENT[(0, _css2.default)(document.body, 'animation')];
    } else {
      return type;
    }
  }
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (el, property, value) {
  if (el.style[property] === undefined) {
    property = _prefix2.default.vendor + property.replace(/(\w)/, function (v) {
      return v.toUpperCase();
    });
    if (el.style[property] === undefined) return null;
  }
  if (typeof value !== 'undefined') el.style[property] = value;
  return property;
};

var _prefix = __webpack_require__(4);

var _prefix2 = _interopRequireDefault(_prefix);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var docStyle = document.documentElement.style;
var engine = void 0;

if (window.opera && Object.prototype.toString.call(opera) === '[object Opera]') {
  engine = 'presto';
} else if ('MozAppearance' in docStyle) {
  engine = 'gecko';
} else if ('WebkitAppearance' in docStyle) {
  engine = 'webkit';
} else if (typeof navigator.cpuClass === 'string') {
  engine = 'trident';
}

exports.default = {
  css: { trident: '-ms-', gecko: '-moz-', webkit: '-webkit-', presto: '-o-' }[engine] || '',
  vendor: { trident: 'ms', gecko: 'Moz', webkit: 'Webkit', presto: 'O' }[engine] || ''
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (node) {
  if (!(node instanceof HTMLElement || node instanceof SVGElement)) {
    return window;
  }

  function parents(node, ps) {
    if (node === null || node.parentNode === null) return ps;

    return parents(node.parentNode, ps.concat([node]));
  }

  function style(node, prop) {
    return getComputedStyle(node, null).getPropertyValue(prop);
  }

  function overflow(node) {
    return style(node, 'overflow') + style(node, 'overflow-y') + style(node, 'overflow-x');
  }

  var nodes = [node].concat(parents(node.parentNode, []));

  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].tagName === 'BODY') return window;
    if (/(auto|scroll)/.test(overflow(nodes[i]))) return nodes[i];
  }

  return window;
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (node) {
  if (node === window) {
    return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop);
  } else {
    return node.scrollTop;
  }
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var SUPPORT_PASSIVE = function () {
  var supportsPassive = false;
  document.createElement('div').addEventListener('test', function () {}, {
    get passive() {
      supportsPassive = true;
      return false;
    }
  });

  return supportsPassive;
}();

exports.default = SUPPORT_PASSIVE;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (fn, delay) {
  var now = void 0,
      lastExec = void 0,
      timer = void 0,
      context = void 0,
      args = void 0;

  var execute = function execute() {
    fn.apply(context, args);
    lastExec = now;
  };

  return function () {
    context = this;
    args = arguments;

    now = Date.now();

    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    if (lastExec) {
      var diff = delay - (now - lastExec);
      if (diff < 0) {
        execute();
      } else {
        timer = setTimeout(function () {
          execute();
        }, diff);
      }
    } else {
      execute();
    }
  };
};

/***/ })
/******/ ]);