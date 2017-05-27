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

function injectStyle (ssrContext) {
  __webpack_require__(3)
}
var Component = __webpack_require__(4)(
  /* script */
  __webpack_require__(1),
  /* template */
  __webpack_require__(5),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = {
  name: 'popup',
  props: {
    value: {
      type: Boolean,
      default: false
    },

    position: {
      type: String,
      default: 'middle'
    },

    popupClass: {
      type: String,
      default: ''
    },

    opacity: {
      type: Number,
      default: 50
    },

    closeOnClickMask: {
      type: Boolean,
      default: true
    },

    destroy: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      visible: false
    };
  },

  watch: {
    visible: function visible(val) {
      this.$emit('input', val);
    },
    value: function value(val) {
      this.visible = val;
    }
  },
  methods: {
    beforeLeave: function beforeLeave() {
      this.$emit('popup-before-leave');
    },
    afterLeave: function afterLeave() {
      this.$emit('popup-after-leave');
      if (this.destroy) this.$destroy();
    }
  },
  computed: {
    maskStyle: function maskStyle() {
      var opacity = (this.opacity / 100).toFixed(2);
      return {
        display: this.opacity === -1 ? 'none' : 'block',
        backgroundColor: 'rgba(0, 0, 0, ' + opacity + ')'
      };
    },
    customClass: function customClass() {
      return this.popupClass ? '' + this.popupClass : 'u-popup-wrapper is-' + this.position;
    }
  },
  created: function created() {
    if (this.value) {
      this.visible = true;
    }
  },
  mounted: function mounted() {
    document.body.appendChild(this.$el);
  },
  beforeDestroy: function beforeDestroy() {
    document.body.removeChild(this.$el);
  }
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (Vue) {
  _index2.default.mixins = [{
    watch: {
      visible: function visible(val) {
        if (val) {
          this.$el.style.zIndex = ++index;
          this.$el.style.display = 'block';

          if (this.opacity >= 0) this.$refs.mask.style.display = 'block';

          if (POPUP_QUEUE.length > 0 && this.opacity > 0) {
            for (var i = 0; i < POPUP_QUEUE.length; i++) {
              if (POPUP_QUEUE[i].opacity > 0 && POPUP_QUEUE[i].$refs.mask && POPUP_QUEUE[i].$refs.mask.style.display !== 'none') {
                POPUP_QUEUE[i].$refs.mask.style.display = 'none';
                break;
              }
            }
          }

          POPUP_QUEUE.unshift(this);
        }
      }
    },
    mounted: function mounted() {
      var _this = this;

      if (!this.visible) this.$el.style.display = 'none';

      this.$on('popup-before-leave', function () {
        if (_this.$refs.mask.style.display !== 'none' && _this.opacity > 0 && POPUP_QUEUE.length > 0) {
          _this.$refs.mask.style.display = 'none';

          for (var i = 0; i < POPUP_QUEUE.length; i++) {
            if (POPUP_QUEUE[i].opacity > 0 && POPUP_QUEUE[i].$refs.mask) {
              POPUP_QUEUE[i].$refs.mask.style.display = 'block';
              break;
            }
          }
        }
      });

      this.$on('popup-after-leave', function () {
        POPUP_QUEUE.splice(POPUP_QUEUE.indexOf(_this), 1);

        _this.$el.style.display = 'none';
        _this.$refs.mask.style.display = 'none';
      });
    }
  }];

  Vue.prototype.$popup = {
    close: function close() {
      POPUP_QUEUE.forEach(function (instance) {
        instance.visible = false;
      });
    }
  };
  Vue.component(_index2.default.name, _index2.default);
};

var _index = __webpack_require__(0);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var index = 1000;
var POPUP_QUEUE = [];

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "u-popup"
  }, [_c('div', {
    ref: "mask",
    staticClass: "u-popup-mask",
    style: (_vm.maskStyle),
    on: {
      "touchmove": function($event) {
        $event.stopPropagation();
        $event.preventDefault();
      },
      "click": function($event) {
        _vm.visible = !_vm.closeOnClickMask;
        _vm.$emit('cancel')
      }
    }
  }), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "popup-effect"
    },
    on: {
      "before-leave": _vm.beforeLeave,
      "after-leave": _vm.afterLeave
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.visible),
      expression: "visible"
    }],
    class: _vm.customClass
  }, [_vm._t("default")], 2)])], 1)
},staticRenderFns: []}

/***/ })
/******/ ]);