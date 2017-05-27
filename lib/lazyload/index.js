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

var _DOMEvent = __webpack_require__(2);

var _DOMEvent2 = _interopRequireDefault(_DOMEvent);

var _supportWebp = __webpack_require__(7);

var _supportWebp2 = _interopRequireDefault(_supportWebp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PLACEHOLDER_URL = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==';

var Lazy = function () {
  function Lazy(options) {
    var _this = this;

    _classCallCheck(this, Lazy);

    this.options = Object.assign({
      preload: 1.3,
      nextTick: function nextTick(next) {
        return setTimeout(next, 0);
      },
      filter: function filter(photo) {
        return photo.src;
      } }, options);
    this.listeners = [];

    var effectLoadHandler = function effectLoadHandler(e) {
      _this.listeners.forEach(function (target) {
        if (target.el !== window && e.target.contains(target.el)) {
          target.handle();
        }
      });
    };

    _DOMEvent2.default.on(window, 'animationend', effectLoadHandler, { passive: true });
    _DOMEvent2.default.on(window, 'transitionend', effectLoadHandler, { passive: true });
  }

  Lazy.prototype.add = function add(type, el, _ref) {
    var _this2 = this;

    var value = _ref.value,
        oldValue = _ref.oldValue,
        arg = _ref.arg,
        modifiers = _ref.modifiers;

    if (type === 'update' && typeof oldValue !== 'undefined' && oldValue === value) return false;

    if (arg !== 'background-image') el.setAttribute('src', PLACEHOLDER_URL);

    if (!value) return el.setAttribute('lazy', 'error');
    el.setAttribute('lazy', 'loading');

    var photo = {
      el: el,
      src: value,
      type: 'background-image',
      placeholder: false
    };

    if (arg !== 'background-image') {
      var w = el.getAttribute('data-width');
      var h = el.getAttribute('data-height');
      photo.type = 'image';

      if (/\d/.test(w) && /\d/.test(h)) {
        el.style.height = 0;
        el.style.paddingTop = (parseInt(h) / parseInt(w) * 100).toFixed(4) + '%';
        photo.placeholder = true;
      }
    }

    if (modifiers.active) {
      return this._render(photo);
    }

    this.options.nextTick(function () {
      if (!el.$parent) el.$parent = (0, _scrollEventTarget2.default)(el);

      _this2._listen(el.$parent, photo);
      _this2.options.nextTick(function () {
        if (_this2._checkInView(photo.el)) {
          _this2._render(photo);
          _this2._unMount(photo.el);
        }
      });
    });
  };

  Lazy.prototype.remove = function remove(el) {
    if (el.$parent) {
      this._unMount(el);
    }
  };

  Lazy.prototype._render = function _render(photo) {
    var src = this.options.filter(photo, _supportWebp2.default);

    var _ = function _(state) {
      if (photo.placeholder) {
        photo.el.style.height = 'auto';
        photo.el.style.paddingTop = 0;
        photo.placeholder = false;
      }

      if (state === 'loaded') {
        if (photo.type === 'background-image') {
          photo.el.style.backgroundImage = 'url(\'' + src + '\')';
        } else {
          photo.el.setAttribute('src', src);
        }
      }
      photo.el.setAttribute('lazy', state);
    };

    var img = new Image();
    img.src = src;

    if (img.complete) {
      _('loaded');
    } else {
      img.addEventListener('load', function () {
        return _('loaded');
      });
      img.addEventListener('error', function () {
        return _('error');
      });
    }
  };

  Lazy.prototype._unMount = function _unMount(el) {
    var target = this.listeners.find(function (target) {
      return target.el === el.$parent;
    });
    if (!target) return;

    for (var i = target.queue.length - 1; i >= 0; i--) {
      if (target.queue[i].el === el) {
        target.queue.splice(i, 1);
        break;
      }
    }

    if (target.queue.length === 0 && target.listened) {
      target.listened = false;
      _DOMEvent2.default.off(target.el, 'scroll', target.handle);
      _DOMEvent2.default.off(target.el, 'touchmove', target.handle);
    }
  };

  Lazy.prototype._checkInView = function _checkInView(el) {
    var rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight * this.options.preload && rect.bottom > 0 && rect.left < window.innerWidth * this.options.preload && rect.right > 0;
  };

  Lazy.prototype._listen = function _listen(parentNode, photo) {
    var _this3 = this;

    var target = this.listeners.find(function (target) {
      return target.el === parentNode;
    });

    if (!target) {
      target = {
        el: parentNode,
        listened: false,
        queue: [],
        handle: (0, _throttle2.default)(function () {
          for (var i = target.queue.length - 1; i >= 0; i--) {
            var _photo = target.queue[i];
            if (_this3._checkInView(_photo.el)) {
              _this3._render(_photo);
              _this3._unMount(_photo.el);
            }
          }
        }, 200)
      };
      this.listeners.push(target);
    }

    if (!target.listened) {
      target.listened = true;
      _DOMEvent2.default.on(parentNode, 'scroll', target.handle, { passive: true });
      _DOMEvent2.default.on(parentNode, 'touchmove', target.handle, { passive: true });
    }

    var _ = target.queue.find(function (o) {
      return o.el === photo.el;
    });
    if (_) {
      _.src = photo.src;
    } else {
      target.queue.push(photo);
    }

    return target;
  };

  return Lazy;
}();

exports.default = Lazy;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (Vue, options) {
  var lazy = new _lazy2.default(Object.assign({
    preload: 1.3,
    nextTick: Vue.nextTick,
    filter: function filter(photo) {
      return photo.src;
    }
  }, options));

  Vue.directive('lazy', {
    inserted: lazy.add.bind(lazy, 'inserted'),
    update: lazy.add.bind(lazy, 'update'),
    unbind: lazy.remove.bind(lazy)
  });
};

var _lazy = __webpack_require__(0);

var _lazy2 = _interopRequireDefault(_lazy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _supportPassive = __webpack_require__(6);

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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var SUPPORT_WEBP = function () {
  var support = true;
  var d = document;

  try {
    var el = d.createElement('object');
    el.type = 'image/webp';
    el.innerHTML = '!';
    d.body.appendChild(el);
    support = !el.offsetWidth;
    d.body.removeChild(el);
  } catch (err) {
    support = false;
  }

  return support;
}();

exports.default = SUPPORT_WEBP;

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