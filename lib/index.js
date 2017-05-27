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
/******/ 	return __webpack_require__(__webpack_require__.s = 67);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

var bind = __webpack_require__(10);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is a Node Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Node Buffer, otherwise false
 */
function isBuffer(val) {
  return ((typeof Buffer !== 'undefined') && (Buffer.isBuffer) && (Buffer.isBuffer(val)));
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object' && !isArray(obj)) {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(79).Buffer))

/***/ }),
/* 1 */
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _supportPassive = __webpack_require__(76);

var _supportPassive2 = _interopRequireDefault(_supportPassive);

var _css = __webpack_require__(71);

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
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(0);
var normalizeHeaderName = __webpack_require__(49);

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(6);
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(6);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)))

/***/ }),
/* 4 */
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
/* 5 */
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

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var settle = __webpack_require__(41);
var buildURL = __webpack_require__(44);
var parseHeaders = __webpack_require__(50);
var isURLSameOrigin = __webpack_require__(48);
var createError = __webpack_require__(9);
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(43);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if ("production" !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED'));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(46);

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(40);

/**
 * Create an Error with the specified message, config, error code, and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 @ @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, response);
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0;
    var v = c === 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
};

/***/ }),
/* 12 */
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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = {
  setItem: function setItem(key, value) {
    var expired = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    var data = {
      value: value,
      create: Date.now(),
      expired: expired
    };
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      if (e === 'QUOTA_EXCEEDED_ERR') {
        localStorage.clear();
        try {
          localStorage.setItem(key, JSON.stringify(data));
        } catch (e) {
          console.error(e);
        }
      }
    }
  },
  getItem: function getItem(key) {
    var data = localStorage.getItem(key);

    if (data) {
      try {
        data = JSON.parse(data);
      } catch (e) {
        data = null;
      }

      if (Object.prototype.toString.call(data) === '[object Object]') {
        if (data.expired > 0 && Date.now() > data.expired + data.create) {
          this.removeItem(key);
          return null;
        }
        return data.value;
      }
    }
    return data;
  },

  removeItem: function removeItem(key) {
    return localStorage.removeItem(key);
  },

  clear: function clear() {
    for (var key in localStorage) {
      undefined.getItem(key);
    }
  },

  clearAll: function clearAll() {
    return localStorage.clear();
  }
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var SUPPORT_ONLY_TOUCH = 'ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch;exports.default = SUPPORT_ONLY_TOUCH;

/***/ }),
/* 15 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 16 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (Vue) {
  var ActionSheet = Vue.extend(_index2.default);

  Vue.prototype.$actionsheet = function (actions) {
    var cancel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '取消';

    var instance = new ActionSheet({
      el: document.createElement('div')
    });

    instance.actions = actions;
    instance.cancel = cancel;

    document.body.appendChild(instance.$el);
    Vue.nextTick(function () {
      instance.visible = true;
    });

    return instance;
  };
};

var _index = __webpack_require__(93);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (Vue, options) {
  var Alert = Vue.extend(_index2.default);

  function factory(opts) {
    var instance = new Alert({
      el: document.createElement('div')
    });

    opts = Object.assign({}, opts);
    for (var key in opts) {
      instance[key] = opts[key];
    }

    document.body.appendChild(instance.$el);
    Vue.nextTick(function () {
      instance.visible = true;
    });

    return instance;
  }

  Vue.prototype.$prompt = function (arg) {
    return new Promise(function (resolve, reject) {
      var opts = Object.assign({
        showInput: true,
        inputType: 'text',
        inputValue: '',
        inputPlaceholder: '',
        closeOnClickMask: true,
        buttons: [{
          'label': '取消',
          'method': reject
        }, {
          'label': '确定',
          'method': function method() {
            return resolve(instance.inputValue);
          }
        }]
      }, typeof arg === 'string' ? { title: arg } : arg);

      var instance = factory(opts);
      instance.$on('cancel', reject);
    });
  };

  Vue.prototype.$confirm = function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return new Promise(function (resolve, reject) {
      var opts = {
        title: args.length === 1 ? '提示' : args[0],
        message: args[args.length === 1 ? 0 : 1],
        closeOnClickMask: true,
        buttons: [{
          'label': '取消',
          'method': reject
        }, {
          'label': '确定',
          'method': resolve
        }]
      };

      var instance = factory(opts);
      instance.$on('cancel', reject);
    });
  };

  Vue.prototype.$alert = function () {
    var _ref;

    var opts = Object.prototype.toString.call(arguments.length <= 0 ? undefined : arguments[0]) === '[object Object]' ? arguments.length <= 0 ? undefined : arguments[0] : {
      title: arguments.length === 1 ? '提示' : arguments.length <= 0 ? undefined : arguments[0],
      message: (_ref = arguments.length === 1 ? 0 : 1, arguments.length <= _ref ? undefined : arguments[_ref])
    };

    return factory(opts);
  };
};

var _index = __webpack_require__(94);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (Vue) {
  Vue.mixin({
    created: function created() {
      var _this = this;

      if (this.$options.asyncData) {
        var resolve = function resolve(data) {
          if (data) {
            for (var key in _this.$data) {
              if (typeof data[key] !== 'undefined') _this.$set(_this.$data, key, data[key]);
            }
          }
          _this.$loadingAsyncData = false;
          _this.$emit('async-data');
        };

        var reject = function reject(error) {
          return console.error(error);
        };

        this.$loadingAsyncData = true;
        var res = this.$options.asyncData.call(this, resolve, reject);
        if (res && typeof res.then === 'function') {
          res.then(resolve, reject);
        }
      }
    }
  });
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (Vue) {
  Vue.component(_index2.default.name, _index2.default);
};

var _index = __webpack_require__(95);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (Vue) {
  Vue.mixin({
    methods: {
      $dispatch: function $dispatch(componentName, eventName) {
        var parent = this.$parent;
        var name = parent.$options.name;

        while (parent && (!name || name !== componentName)) {
          parent = parent.$parent;

          if (parent) {
            name = parent.$options.name;
          }
        }
        if (parent) {
          for (var _len2 = arguments.length, params = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
            params[_key2 - 2] = arguments[_key2];
          }

          parent.$emit.apply(parent, [eventName].concat(params));
        }
      },
      $broadcast: function $broadcast(componentName, eventName) {
        for (var _len3 = arguments.length, params = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
          params[_key3 - 2] = arguments[_key3];
        }

        broadcast.apply(this, [componentName, eventName].concat(params));
      }
    }
  });
};

function broadcast(componentName, eventName) {
  for (var _len = arguments.length, params = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    params[_key - 2] = arguments[_key];
  }

  this.$children.forEach(function (child) {
    var name = child.$options.name;

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      broadcast.apply(child, [componentName, eventName].concat(params));
    }
  });
}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (Vue) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  function encode(str) {
    var replacer = {
      '!': '%21',
      '\'': '%27',
      '(': '%28',
      ')': '%29'
    };
    return encodeURIComponent(str).replace(/[!'()]/g, function (match) {
      return replacer[match];
    });
  }

  function stringify(obj, prefix) {
    if (obj === null) obj = 'null';

    var queue = [];

    if (obj instanceof Date) {
      queue.push(encode(prefix) + '=' + encode(Date.prototype.toISOString.call(obj)));
    } else if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean') {
      queue.push(encode(prefix) + '=' + encode(obj));
    } else if (/\[object (Object|Array)\]/.test(Object.prototype.toString.call(obj))) {
      var keys = Object.keys(obj);
      var key = void 0,
          i = void 0;
      for (i = 0; i < keys.length; i++) {
        key = keys[i];
        queue = queue.concat(stringify(obj[key], prefix ? prefix + '[' + key + ']' : key));
      }
    }

    return queue;
  }

  var REQUEST_CACHE = {};
  var request = _axios2.default.Axios.prototype.request;

  _axios2.default.Axios.prototype.request = function (config) {
    if (typeof config === 'string') {
      config = Object.assign({
        url: arguments[0]
      }, arguments[1]);
    }

    var id = void 0;
    if (!config.cancelToken) {
      config.cancelToken = new _axios2.default.CancelToken(function (cancel) {
        REQUEST_CACHE[id = (0, _guid2.default)()] = cancel;
      });
    }

    return new Promise(function (resolve, reject) {
      request.call(http, config).then(function (response) {
        if (id) delete REQUEST_CACHE[id];
        resolve(response);
      }).catch(function (error) {
        if (id) delete REQUEST_CACHE[id];
        if (!(error instanceof _axios2.default.Cancel)) reject(error);
      });
    });
  };

  var http = _axios2.default.create(Object.assign({
    transformRequest: [function (data) {
      return Object.prototype.toString.call(data) === '[object Object]' ? stringify(data).join('&') : data;
    }]
  }, options));

  http.stringify = function (data) {
    return stringify(data).join('&');
  };

  http.abort = function () {
    for (var id in REQUEST_CACHE) {
      if (REQUEST_CACHE[id]) REQUEST_CACHE[id]();
    }
  };

  Vue.prototype.$http = http;
};

var _axios = __webpack_require__(35);

var _axios2 = _interopRequireDefault(_axios);

var _guid = __webpack_require__(11);

var _guid2 = _interopRequireDefault(_guid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (Vue) {
  var Indicator = Vue.extend(_index2.default);
  var instance = void 0;

  Vue.prototype.$indicator = {
    open: function open(text) {
      if (!instance) {
        instance = new Indicator({
          el: document.createElement('div')
        });

        document.body.appendChild(instance.$el);
      }

      Vue.nextTick(function () {
        instance.text = text || '';
        instance.visible = true;
      });
    },
    close: function close() {
      if (instance) {
        instance.visible = false;
      }
    }
  };
};

var _index = __webpack_require__(96);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (Vue) {
  Vue.directive('infiniteScroll', {
    inserted: function inserted(el, _ref, _ref2) {
      var value = _ref.value;
      var context = _ref2.context;

      Vue.nextTick(function () {
        el[ctx] = new _infiniteScroll2.default({
          el: el,
          vm: context,
          handler: value
        });
      });
    },
    unbind: function unbind(el) {
      el[ctx] && el[ctx].destroy();
    }
  });
};

var _infiniteScroll = __webpack_require__(60);

var _infiniteScroll2 = _interopRequireDefault(_infiniteScroll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ctx = '@@InfiniteScroll';

/***/ }),
/* 25 */
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

var _lazy = __webpack_require__(61);

var _lazy2 = _interopRequireDefault(_lazy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (Vue) {
  Vue.directive('music', _directive2.default);
  Vue.prototype.$music = _plugin2.default;
};

var _directive = __webpack_require__(62);

var _directive2 = _interopRequireDefault(_directive);

var _plugin = __webpack_require__(63);

var _plugin2 = _interopRequireDefault(_plugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (Vue) {
  Vue.directive('outerTouch', {
    bind: function bind(el, _ref, vnode) {
      var value = _ref.value;

      el.handler = function (e) {
        if (!el.getAttribute('outer-touch-disabled') && !el.contains(e.target)) {
          value();
        }
      };

      document.addEventListener(_supportOnlyTouch2.default ? 'touchstart' : 'click', el.handler, true);
    },
    unbind: function unbind(el) {
      document.removeEventListener(_supportOnlyTouch2.default ? 'touchstart' : 'click', el.handler, true);
      el.handler = null;
    }
  });
};

var _supportOnlyTouch = __webpack_require__(14);

var _supportOnlyTouch2 = _interopRequireDefault(_supportOnlyTouch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (Vue) {
  var Player = Vue.extend(_index2.default);
  var instance = void 0;

  Vue.prototype.$player = function (data) {
    if (!instance) {
      instance = new Player({
        el: document.createElement('div')
      });

      document.body.appendChild(instance.$el);
      window.addEventListener('hashchange', function () {
        if (instance.visible && location.hash !== '#$player') {
          instance.exit();
        }
      });
    }

    data = Object.assign({
      loop: true,
      src: '',
      poster: ''
    }, Object.prototype.toString.call(data) === '[object String]' ? { src: data } : data);

    for (var key in data) {
      if (typeof instance[key] !== 'undefined') instance[key] = data[key];
    }

    history.pushState(null, document.title, location.href.split('#')[0] + '#$player');

    Vue.nextTick(function () {
      var video = instance.$refs.video;
      instance.visible = true;
      instance.duration = Number(video.duration) || 0;
      instance.loaded = video.buffered.length ? video.buffered.end(video.buffered.length - 1) : 0;
      instance.played = 0;
      instance.loading = false;
      instance.$refs.video.play();
    });

    return instance;
  };
};

var _index = __webpack_require__(97);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 29 */
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

var _index = __webpack_require__(98);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var index = 1000;
var POPUP_QUEUE = [];

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (Vue) {
  Vue.prototype.$storage = _storage2.default;
};

var _storage = __webpack_require__(13);

var _storage2 = _interopRequireDefault(_storage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (Vue, options) {
  var Toast = Vue.extend(_index2.default);
  var DEFAULT = Object.assign({
    position: 'middle',
    duration: 2400
  }, options);

  var instance = void 0,
      time = void 0;

  Vue.prototype.$toast = function () {
    var opts = Object.assign({}, DEFAULT, Object.prototype.toString.call(arguments.length <= 0 ? undefined : arguments[0]) === '[object Object]' ? arguments.length <= 0 ? undefined : arguments[0] : {
      message: arguments.length <= 0 ? undefined : arguments[0],
      icon: arguments.length > 1 ? (arguments.length <= 1 ? undefined : arguments[1]) ? 'success' : 'failure' : ''
    });
    if (instance) {
      instance.visible = false;
      clearTimeout(time);
    }
    instance = new Toast({
      el: document.createElement('div')
    });

    for (var key in opts) {
      instance[key] = opts[key];
    }

    document.body.appendChild(instance.$el);
    Vue.nextTick(function () {
      instance.visible = true;
      time = setTimeout(function () {
        instance.visible = false;
      }, opts.duration);
    });

    return instance;
  };
};

var _index = __webpack_require__(99);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (Vue, options) {
  _uploader2.default.mixins = [{
    created: function created() {
      this.$config = Object.assign({
        host: location.protocol === 'https:' ? 'https://up.qbox.me' : 'http://upload.qiniu.com',
        token: '/uptoken',
        domain: 'http://7xocov.com1.z0.glb.clouddn.com',
        expired: 30 * 60 * 1000 }, options);
    }
  }];
  Vue.component(_uploader2.default.name, _uploader2.default);
};

var _uploader = __webpack_require__(100);

var _uploader2 = _interopRequireDefault(_uploader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (Vue) {
  Vue.component(_virtualScroll2.default.name, _virtualScroll2.default);
};

var _virtualScroll = __webpack_require__(66);

var _virtualScroll2 = _interopRequireDefault(_virtualScroll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(69);

__webpack_require__(68);

__webpack_require__(70);

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var bind = __webpack_require__(10);
var Axios = __webpack_require__(37);
var defaults = __webpack_require__(3);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(7);
axios.CancelToken = __webpack_require__(36);
axios.isCancel = __webpack_require__(8);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(51);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(7);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(3);
var utils = __webpack_require__(0);
var InterceptorManager = __webpack_require__(38);
var dispatchRequest = __webpack_require__(39);
var isAbsoluteURL = __webpack_require__(47);
var combineURLs = __webpack_require__(45);

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var transformData = __webpack_require__(42);
var isCancel = __webpack_require__(8);
var defaults = __webpack_require__(3);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 @ @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.response = response;
  return error;
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(9);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response
    ));
  }
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      }

      if (!utils.isArray(val)) {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
    }
  });

  return parsed;
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = {
  data: function data() {
    return {
      visible: false,
      actions: [],
      cancel: '取消'
    };
  },

  methods: {
    itemClick: function itemClick(item) {
      if (item.method && typeof item.method === 'function') {
        item.method();
        this.visible = false;
      }
    }
  }
};

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = {
  data: function data() {
    return {
      visible: false,
      closeOnClickMask: false,
      opacity: 50,
      title: '',
      message: '',
      showInput: false,
      inputType: 'text',
      inputValue: '',
      inputPlaceholder: '',
      buttons: [{
        'label': '确定',
        'method': null
      }]
    };
  },

  watch: {
    inputType: function inputType(val) {
      this.$refs.input.type = val;
    }
  },
  methods: {
    close: function close() {
      this.visible = false;
    },
    tap: function tap(index) {
      if (typeof this.buttons[index].method === 'function') this.buttons[index].method();
      this.close();
    }
  },
  computed: {
    buttonStyle: function buttonStyle() {
      return { width: 100 / this.buttons.length + '%' };
    }
  }
};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = {
  name: 'drop-down',
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    className: {
      type: String,
      default: 'u-dropDown'
    },
    disabled: {
      type: Boolean,
      default: false
    },

    label: {
      type: String,
      default: '请选择'
    },

    options: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  data: function data() {
    return {
      visible: false,
      selected: -1
    };
  },

  watch: {
    visible: function visible(val) {
      this.$emit(val ? 'open' : 'close');
    },
    value: function value() {
      this.getSelectedIndex();
    }
  },
  methods: {
    getSelectedIndex: function getSelectedIndex() {
      for (var i = 0; i < this.options.length; i++) {
        if (this.options[i].value === this.value) {
          this.selected = i;
          break;
        }
      }
    },
    trigger: function trigger() {
      if (!this.disabled) this.visible = !this.visible;
    },
    select: function select(value) {
      this.$emit('input', value);
      this.visible = false;
    },
    onOuterTouch: function onOuterTouch() {
      this.visible = false;
    }
  },
  computed: {
    text: function text() {
      if (this.selected === -1) {
        return this.label;
      } else {
        var item = this.options[this.selected];

        return item.show || item.text;
      }
    }
  },
  created: function created() {
    this.getSelectedIndex();
  }
};

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = {
  name: 'indicator',
  data: function data() {
    return {
      visible: false,
      text: ''
    };
  }
};

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iphoneInlineVideo = __webpack_require__(91);

var _iphoneInlineVideo2 = _interopRequireDefault(_iphoneInlineVideo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'video',
  data: function data() {
    return {
      visible: false,
      poster: '',
      src: '',
      state: 'pause',
      duration: 0,
      loaded: 0,
      played: 0,
      loop: true,
      loading: false
    };
  },

  watch: {
    visible: function visible(val) {
      var video = this.$refs.video;
      if (!val && !video.paused) {
        video.currentTime = 0;
        video.pause();
      }
    }
  },
  methods: {
    secondToTime: function secondToTime(second) {
      var add0 = function add0(num) {
        return num < 10 ? '0' + num : '' + num;
      };
      var min = parseInt(second / 60);
      var sec = parseInt(second - min * 60);
      return add0(min) + ':' + add0(sec);
    },
    switchVideo: function switchVideo() {
      var video = this.$refs.video;
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    },
    adjust: function adjust(e) {
      if (this.duration > 0) {
        this.$refs.video.currentTime = parseInt((e.clientX - 15) / (document.documentElement.clientWidth - 30) * this.duration);
      }
    },
    exit: function exit() {
      var video = this.$refs.video;
      if (!video.paused) {
        video.currentTime = 0;
        video.pause();
      }
      if (location.hash === '#$player') {
        history.back();
      }
      this.visible = false;
    }
  },
  mounted: function mounted() {
    var _this = this;

    var video = this.$refs.video;

    video.addEventListener('durationchange', function () {
      if (video.duration !== 1) {
        _this.duration = parseInt(video.duration);
      }
    });

    video.addEventListener('progress', function () {
      _this.loaded = video.buffered.length ? video.buffered.end(video.buffered.length - 1) : 0;
    });

    video.addEventListener('error', function () {
      if (_this.visible) {
        _this.exit();
        _this.$toast('无法加载视频 ╥﹏╥');
      }
    });
    video.addEventListener('waiting', function () {
      if (_this.visible) _this.loading = true;
    });
    video.addEventListener('playing', function () {
      return _this.loading = false;
    });
    video.addEventListener('timeupdate', function () {
      return _this.played = video.currentTime;
    });
    video.addEventListener('play', function () {
      return _this.state = 'play';
    });
    video.addEventListener('pause', function () {
      _this.loading = false;
      _this.state = 'pause';
    });
    video.addEventListener('ended', function () {
      if (!_this.loop) {
        _this.exit();
      }
    });

    (0, _iphoneInlineVideo2.default)(video);
  }
};

/***/ }),
/* 57 */
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
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = {
  name: 'toast',
  data: function data() {
    return {
      visible: false,

      position: 'middle',

      icon: '',

      message: ''
    };
  },

  computed: {
    popupClass: function popupClass() {
      return 'u-toast ' + (/^(top|bottom)$/.test(this.position) ? 'is-' + this.position : 'is-middle');
    },
    iconClass: function iconClass() {
      return (/^(success|failure)$/.test(this.icon) ? 'is-' + this.icon : ''
      );
    }
  }
};

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _picker = __webpack_require__(65);

var _picker2 = _interopRequireDefault(_picker);

var _cropper = __webpack_require__(64);

var _cropper2 = _interopRequireDefault(_cropper);

var _guid = __webpack_require__(11);

var _guid2 = _interopRequireDefault(_guid);

var _storage = __webpack_require__(13);

var _storage2 = _interopRequireDefault(_storage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'uploader',
  props: {
    value: {
      type: String,
      default: ''
    },

    accept: {
      type: [Object, String],
      default: ''
    },

    options: {
      type: Object,
      default: function _default() {
        return null;
      }
    },

    domain: {
      type: String,
      default: ''
    },

    beforeUpload: {
      type: Function,
      default: null
    },

    uploaded: {
      type: Function,
      default: null
    }
  },
  data: function data() {
    return {
      visible: false,
      cropper: {},
      parser: null
    };
  },

  methods: {
    URLSafeBase64Encode: function URLSafeBase64Encode(str) {
      var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
      var arr = [];
      var o1 = void 0,
          o2 = void 0,
          o3 = void 0,
          h1 = void 0,
          h2 = void 0,
          h3 = void 0,
          h4 = void 0,
          bits = void 0;
      var i = 0;
      var ac = 0;
      var enc = '';

      if (!str) return str;

      do {
        o1 = str.charCodeAt(i++);
        o2 = str.charCodeAt(i++);
        o3 = str.charCodeAt(i++);

        bits = o1 << 16 | o2 << 8 | o3;

        h1 = bits >> 18 & 0x3f;
        h2 = bits >> 12 & 0x3f;
        h3 = bits >> 6 & 0x3f;
        h4 = bits & 0x3f;

        arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
      } while (i < str.length);

      enc = arr.join('');

      switch (str.length % 3) {
        case 1:
          enc = enc.slice(0, -2) + '==';
          break;
        case 2:
          enc = enc.slice(0, -1) + '=';
          break;
      }

      return enc.replace(/\//g, '_').replace(/\+/g, '-');
    },
    getQiNiuToken: function getQiNiuToken() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var token = _storage2.default.getItem('QINIU_UPLOAD_TOKEN');
        if (token) {
          resolve(token);
        } else {
          _this.$http.get(_this.$config.token).then(function (_ref) {
            var data = _ref.data;

            if (data.uptoken) {
              _storage2.default.setItem('QINIU_UPLOAD_TOKEN', data.uptoken, _this.$config.expired);
              resolve(data.uptoken);
            } else {
              reject(new Error('获取上传token接口格式错误。'));
            }
          }).catch(function () {
            return reject(new Error('连接上传token接口失败。'));
          });
        }
      });
    },
    done: function done(data) {
      this.$indicator.close();
      var url = this.parser.protocol + '//' + this.parser.host + '/' + data.key;
      this.$emit('input', url);
      if (Object.prototype.toString.call(this.uploaded) === '[object Function]') this.uploaded(url);
    },
    formDataUpload: function formDataUpload(data) {
      var _this2 = this;

      var formData = new FormData();
      for (var key in data) {
        formData.append(key, data[key]);
      }
      this.$http.post(this.$config.host, formData, {
        onUploadProgress: function onUploadProgress(e) {
          return _this2.$indicator.open('\u6B63\u5728\u4E0A\u4F20...' + Math.min(Math.round(e.loaded / e.total * 100), 100) + '%');
        }
      }).then(function (_ref2) {
        var data = _ref2.data;
        return _this2.done(data);
      });
    },
    chunkInfo: function chunkInfo(file, key, name) {
      var DEFAULT = {
        key: key,
        name: name,
        index: 0,
        loaded: 0,
        ctx: []
      };
      var has = Object.prototype.toString.call(file) === '[object File]';
      var storage = has ? storage.getItem(file.name) : DEFAULT;
      if (has && (storage === null || storage.size !== file.size || storage.lastModified !== file.lastModified)) {
        storage = Object.assign(DEFAULT, {
          size: file.size,
          lastModified: file.lastModified
        });
      }

      return storage;
    },
    chunkUpload: function chunkUpload(_ref3) {
      var _this3 = this;

      var file = _ref3.file,
          key = _ref3.key,
          name = _ref3.name,
          token = _ref3.token;

      var storage = this.chunkInfo(file, key, name);
      var blockSize = 4 * 1024 * 1024;
      var blockCount = Math.ceil(file.size / blockSize);
      var promises = [];
      var _loop = function _loop(i) {
        var start = i * blockSize;
        var end = Math.min(file.size, start + blockSize);
        var chunkBlob = blockCount === 1 ? file : file.slice(start, end);
        var chunkSize = blockCount === 1 ? file.size : i + 1 === blockCount ? file.size - i * blockSize : blockSize;

        promises.push(function () {
          return new Promise(function (resolve, reject) {
            _this3.$http.post(_this3.$config.host + '/mkblk/' + chunkSize + '?name=' + storage.name + '&chunk=' + i + '&chunks=' + blockCount, chunkBlob, {
              onUploadProgress: function onUploadProgress(e) {
                return _this3.$indicator.open('\u6B63\u5728\u4E0A\u4F20...' + Math.min(Math.round((e.loaded + storage.loaded) / file.size * 100), 100) + '%');
              },
              headers: {
                'Content-Type': 'application/octet-stream',
                'Authorization': 'UpToken ' + token
              }
            }).then(function (_ref5) {
              var data = _ref5.data;

              storage.loaded += chunkSize;
              storage.index++;
              storage.ctx.push(data.ctx);
              storage.setItem(file.name, storage, 10 * 60 * 1000);

              resolve();
            }).catch(function () {
              reject(new Error('\u4E0A\u4F20\u5206\u7247 ' + (i + 1) + ' \u5931\u8D25\u3002'));
            });
          });
        });
      };

      for (var i = storage.index; i < blockCount; i++) {
        _loop(i);
      }

      Promise.series(promises).then(function () {
        _this3.$http.post(_this3.$config.host + '/mkfile/' + file.size + '/key/' + _this3.URLSafeBase64Encode(storage.key), storage.ctx.join(','), {
          headers: {
            'Content-Type': 'text/plain',
            'Authorization': 'UpToken ' + token
          }
        }).then(function (_ref4) {
          var data = _ref4.data;

          _this3.done(data);
          _this3.$toast('上传成功', true);
          storage.removeItem(file.name);
        }).catch(function () {
          _this3.$indicator.close();
          _this3.$toast('上传失败', false);
          storage.removeItem(file.name);
        });
      }).catch(function (e) {
        _this3.$indicator.close();
        _this3.$toast(e.message, false);
      });
    },
    upload: function upload(file) {
      var _this4 = this;

      var name = (0, _guid2.default)() + '.' + file.ext;
      var pathname = this.parser.pathname.replace(/^\//, '');
      var key = pathname ? pathname + '/' + name : name;

      this.$indicator.open('正在上传...0%');

      if (/(up\.qbox\.me|upload\.qiniu\.com)/.test(this.$config.host)) {
        this.getQiNiuToken().then(function (token) {
          if (file.size <= 4 * 1024 * 1024) {
            _this4.formDataUpload({ key: key, token: token, file: file });
          } else {
            _this4.chunkUpload({ key: key, name: name, token: token, file: file });
          }
        }).catch(function (e) {
          return _this4.$toast(e.message);
        });
      } else {
        this.formDataUpload({ key: key, file: file });
      }
    },
    cropImage: function cropImage() {
      var _this5 = this;

      this.cropper.crop().then(function (file) {
        _this5.visible = false;
        _this5.upload(file);
      });
    }
  },
  created: function created() {
    var date = new Date();
    var href = this.domain || this.$config.domain;

    this.parser = document.createElement('a');

    if (/[\u4E00-\u9FA5\uF900-\uFA2D]/.test(href)) throw new Error('请使用纯英文的路径');
    this.parser.href = href.replace(/\/$/, '').replace('{year}', date.getFullYear()).replace('{month}', date.getMonth() + 1).replace('{day}', date.getDay());
  },
  mounted: function mounted() {
    var _this6 = this;

    this.picker = new _picker2.default({
      container: this.$el,
      accept: this.accept,
      callback: function callback(err, file) {
        if (err) return _this6.$toast(err.message);

        var _ = function _() {
          if (/image\//.test(file.mime) && _this6.options) {
            _this6.visible = true;
            _this6.cropper.setFile(file);
          } else {
            _this6.upload(file);
          }
        };

        Object.prototype.toString.call(_this6.beforeUpload) === '[object Function]' ? _this6.beforeUpload(file, _) : _();
      }
    });
    this.$nextTick(function () {
      if (_this6.options) _this6.cropper = new _cropper2.default(_this6.$refs.canvas, _this6.options);
    });
  },
  beforeDestroy: function beforeDestroy() {
    if (this.cropper.destroy) this.cropper.destroy();
  }
};

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _throttle = __webpack_require__(5);

var _throttle2 = _interopRequireDefault(_throttle);

var _scrollEventTarget = __webpack_require__(4);

var _scrollEventTarget2 = _interopRequireDefault(_scrollEventTarget);

var _scrollTop = __webpack_require__(12);

var _scrollTop2 = _interopRequireDefault(_scrollTop);

var _DOMEvent = __webpack_require__(2);

var _DOMEvent2 = _interopRequireDefault(_DOMEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InfiniteScroll = function () {
  function InfiniteScroll(_ref) {
    var _this = this;

    var el = _ref.el,
        vm = _ref.vm,
        handler = _ref.handler;

    _classCallCheck(this, InfiniteScroll);

    this.el = el;
    this.vm = vm;
    this.handler = handler;
    this.scrollEventTarget = (0, _scrollEventTarget2.default)(el);
    this.scrollListener = (0, _throttle2.default)(function () {
      return _this.doCheck();
    }, 200);
    _DOMEvent2.default.on(this.scrollEventTarget, 'scroll', this.scrollListener, { passive: true });

    var disabledExpr = el.getAttribute('infinite-scroll-disabled');
    var disabled = false;
    if (disabledExpr) {
      disabled = Boolean(this.vm[disabledExpr]);
      this.vm.$watch(disabledExpr, function (value) {
        _this.disabled = value;
      });
    }
    this.disabled = disabled;

    var distanceExpr = el.getAttribute('infinite-scroll-distance');
    var distance = 0;
    if (distanceExpr) {
      distance = Number(this.vm[distanceExpr] || distanceExpr);
      if (isNaN(distance)) distance = 0;
    }
    this.distance = distance;

    var immediateCheckExpr = el.getAttribute('infinite-scroll-immediate-check');
    var immediateCheck = true;
    if (immediateCheckExpr) {
      immediateCheck = Boolean(this.vm[immediateCheckExpr]);
    }

    if (immediateCheck) this.vm.$nextTick(function () {
      return _this.doCheck();
    });

    var listenEventName = el.getAttribute('infinite-scroll-listen-for-event');
    if (listenEventName) {
      this.vm.$on(listenEventName, function () {
        return _this.doCheck();
      });
    }

    this.vm.$on('infinite-scroll-destroy', function () {
      return _this.destroy();
    });
  }

  InfiniteScroll.prototype.doCheck = function doCheck() {
    if (this.disabled) return;
    var element = this.el;
    var scrollEventTarget = this.scrollEventTarget;
    var viewportScrollTop = (0, _scrollTop2.default)(scrollEventTarget);
    var viewportBottom = viewportScrollTop + this._getVisibleHeight(scrollEventTarget);
    var shouldTrigger = false;

    if (scrollEventTarget === element) {
      shouldTrigger = scrollEventTarget.scrollHeight - viewportBottom <= this.distance;
    } else {
      var elementBottom = this._getElementTop(element) - this._getElementTop(scrollEventTarget) + element.offsetHeight + viewportScrollTop;

      shouldTrigger = viewportBottom + this.distance >= elementBottom;
    }

    if (shouldTrigger && this.handler) {
      this.handler();
    }
  };

  InfiniteScroll.prototype.destroy = function destroy() {
    _DOMEvent2.default.off(this.scrollEventTarget, 'scroll', this.scrollListener);
  };

  InfiniteScroll.prototype._getVisibleHeight = function _getVisibleHeight(el) {
    if (el === window) {
      return document.documentElement.clientHeight;
    }

    return el.clientHeight;
  };

  InfiniteScroll.prototype._getElementTop = function _getElementTop(el) {
    if (el === window) {
      return (0, _scrollTop2.default)(window);
    }
    return el.getBoundingClientRect().top + (0, _scrollTop2.default)(window);
  };

  return InfiniteScroll;
}();

exports.default = InfiniteScroll;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _throttle = __webpack_require__(5);

var _throttle2 = _interopRequireDefault(_throttle);

var _scrollEventTarget = __webpack_require__(4);

var _scrollEventTarget2 = _interopRequireDefault(_scrollEventTarget);

var _DOMEvent = __webpack_require__(2);

var _DOMEvent2 = _interopRequireDefault(_DOMEvent);

var _supportWebp = __webpack_require__(77);

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
/* 62 */
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
/* 63 */
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
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _supportOnlyTouch = __webpack_require__(14);

var _supportOnlyTouch2 = _interopRequireDefault(_supportOnlyTouch);

var _DOMEvent = __webpack_require__(2);

var _DOMEvent2 = _interopRequireDefault(_DOMEvent);

var _dataURItoBlob = __webpack_require__(72);

var _dataURItoBlob2 = _interopRequireDefault(_dataURItoBlob);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CropImage = function () {
  function CropImage() {
    var quality = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;

    _classCallCheck(this, CropImage);

    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.quality = quality;
    this.images = {
      n: null,
      e: null,
      s: null,
      w: null };
    this.key = 'n';
    this.angle = 0;
  }

  CropImage.prototype.get = function get() {
    return this.images[this.key];
  };

  CropImage.prototype.reader = function reader(file) {
    var _this = this;

    var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'n';

    return new Promise(function (resolve, reject) {
      var image = new Image();
      if (Object.prototype.toString.call(file) === '[object String]') {
        image.src = file;
      } else {
        _this.images = Object.assign(_this.images, {
          name: file.name,
          ext: file.ext,
          type: file.mime || file.type
        });

        var reader = new FileReader();
        reader.addEventListener('load', function (e) {
          image.src = e.target.result;
        });
        reader.readAsDataURL(file);
      }

      image.addEventListener('load', function () {
        _this.images[key] = image;
        resolve();
      });
      image.addEventListener('error', function (e) {
        return reject(e);
      });
    });
  };

  CropImage.prototype.rotate = function rotate() {
    var _this2 = this;

    return new Promise(function (resolve, reject) {
      if (_this2.images.n) {
        _this2.angle = (_this2.angle + 90) % 360;
        _this2.key = { 0: 'n', 90: 'e', 180: 's', 270: '2' }[_this2.angle];

        if (_this2.images[_this2.key]) {
          resolve();
        } else {
          var width = /^0|180$/.test(_this2.angle) ? _this2.images.n.width : _this2.images.n.height;
          var height = /^0|180$/.test(_this2.angle) ? _this2.images.n.height : _this2.images.n.width;

          _this2.ctx.clearRect(0, 0, _this2.canvas.width, _this2.canvas.height);
          _this2.canvas.width = width;
          _this2.canvas.height = height;
          _this2.ctx.rotate(_this2.angle * Math.PI / 180);
          _this2.ctx.drawImage(_this2.images.n, _this2.angle === 180 ? -width : _this2.angle === 270 ? -height : 0, _this2.angle === 90 ? -width : _this2.angle === 180 ? -height : 0);

          _this2.reader(_this2.canvas.toDataURL(_this2.images.mime, 1), _this2.key).then(resolve).catch(reject);
        }
      } else {
        reject(new Error('原图丢失'));
      }
    });
  };

  CropImage.prototype.crop = function crop(sourceX, sourceY, sourceWidth, sourceHeight, cropWidth, cropHeight) {
    var _this3 = this;

    return new Promise(function (resolve, reject) {
      if (_this3.images && _this3.images[_this3.key]) {
        _this3.ctx.clearRect(0, 0, _this3.canvas.width, _this3.canvas.height);
        _this3.canvas.width = cropWidth;
        _this3.canvas.height = cropHeight;
        _this3.ctx.drawImage(_this3.images[_this3.key], sourceX, sourceY, sourceWidth, sourceHeight);
        var blob = (0, _dataURItoBlob2.default)(_this3.canvas.toDataURL(_this3.mime, _this3.quality));
        blob.name = _this3.images.name;
        blob.ext = _this3.images.ext;
        resolve(blob);
      } else {
        reject(new Error('原图丢失'));
      }
    });
  };

  return CropImage;
}();

var Cropper = function () {
  function Cropper(canvas, options) {
    _classCallCheck(this, Cropper);

    this.options = Object.assign({
      cropWidth: 200,
      cropHeight: 200,
      zoomRatio: 0.1,
      quality: 100,
      gap: 20,
      borderSize: 1,
      borderColor: '#fff',
      background: 'rgba(0,0,0,.8)' }, options);
    this.options.cropRatio = this.options.cropWidth / this.options.cropHeight;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.eventCache = {
      touchStart: this._onTouchStart.bind(this),
      touchMove: this._onTouchMove.bind(this),
      touchEnd: this._onTouchEnd.bind(this),
      resize: this._onResize.bind(this)
    };
    this.loading = false;
    this.config = {};

    this._listener(true);
    this._onResize();
  }

  Cropper.prototype.setFile = function setFile(file) {
    var _this4 = this;

    this.loading = true;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.file = new CropImage(this.options.quality);
    this.file.reader(file).then(function () {
      _this4.loading = false;
      _this4._reset();
      _this4._draw();
    });
  };

  Cropper.prototype.rotate = function rotate() {
    var _this5 = this;

    this.loading = true;
    this.file.rotate().then(function () {
      _this5.loading = false;
      _this5._reset();
      _this5._draw();
    });
  };

  Cropper.prototype.zoom = function zoom(inOut) {
    if (!this.file) return;
    var width = this.config.image.width;
    var height = this.config.image.height;
    var ratio = inOut ? 1 + this.options.zoomRatio : 1 / (1 + this.options.zoomRatio);

    this.config.image.width = Math.round(width * ratio);
    this.config.image.height = Math.round(height * ratio);
    this.config.image.x -= Math.floor((this.config.image.width - width) / 2);
    this.config.image.y -= Math.floor((this.config.image.height - height) / 2);

    this._draw();
  };

  Cropper.prototype.crop = function crop() {
    var _this6 = this;

    return new Promise(function (resolve) {
      var image = _this6.config.image;
      var area = _this6.config.area;
      var widthRatio = _this6.options.cropWidth / area.width;
      var heightRatio = _this6.options.cropHeight / area.height;
      var sourceX = Math.floor((image.x - area.x) * widthRatio);
      var sourceY = Math.floor((image.y - area.y) * heightRatio);
      var sourceWidth = Math.round(image.width * widthRatio);
      var sourceHeight = Math.round(image.height * heightRatio);

      _this6.loading = true;
      _this6.file.crop(sourceX, sourceY, sourceWidth, sourceHeight, _this6.options.cropWidth, _this6.options.cropHeight).then(function (file) {
        _this6.loading = false;
        resolve(file);
      });
    });
  };

  Cropper.prototype.destroy = function destroy() {
    this.file = null;
    this._listener(false);
  };

  Cropper.prototype._listener = function _listener(bind) {
    var attr = bind ? 'on' : 'off';

    _DOMEvent2.default[attr](this.canvas, _supportOnlyTouch2.default ? 'touchstart' : 'mousedown', this.eventCache.touchStart);
    _DOMEvent2.default[attr](this.canvas, _supportOnlyTouch2.default ? 'touchmove' : 'mousemove', this.eventCache.touchMove);
    _DOMEvent2.default[attr](_supportOnlyTouch2.default ? this.canvas : window, _supportOnlyTouch2.default ? 'touchend' : 'mouseup', this.eventCache.touchEnd);
    if (_supportOnlyTouch2.default) _DOMEvent2.default[attr](this.canvas, 'touchcancel', this.eventCache.touchEnd);
    _DOMEvent2.default[attr](window, 'resize', this.eventCache.resize);
  };

  Cropper.prototype._reset = function _reset() {
    if (!this.file) return false;

    var image = this.file.get();

    this.config.image = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      ratio: image.width / image.height };

    if (image.width > this.canvas.width) {
      this.config.image.width = this.canvas.width;
      this.config.image.height = this.canvas.width / this.config.image.ratio;
    } else if (image.width < this.config.area.width) {
      this.config.image.width = this.config.area.width;
      this.config.image.height = this.config.area.width / this.config.image.ratio;
    }

    if (image.height > this.canvas.height) {
      this.config.image.height = this.canvas.height;
      this.config.image.width = this.canvas.height * this.config.image.ratio;
    } else if (image.height < this.config.area.height) {
      this.config.image.height = this.config.area.height;
      this.config.image.width = this.config.area.height * this.config.image.ratio;
    }
    this.config.image.width = Math.round(this.config.image.width);
    this.config.image.height = Math.round(this.config.image.height);
    this.config.image.x = Math.floor((this.canvas.width - this.config.image.width) / 2);
    this.config.image.y = Math.floor((this.canvas.height - this.config.image.height) / 2);
  };

  Cropper.prototype._verifyConfig = function _verifyConfig() {
    if (this.config.image.x + this.config.image.width < this.config.area.x + this.config.area.width + 1) {
      this.config.image.x = this.config.area.x + this.config.area.width - this.config.image.width + 1;
    }

    if (this.config.image.x > this.config.area.x) {
      this.config.image.x = this.config.area.x;
    }

    if (this.config.image.y + this.config.image.height < this.config.area.y + this.config.area.height + 1) {
      this.config.image.y = this.config.area.y + this.config.area.height - this.config.image.height + 1;
    }

    if (this.config.image.y > this.config.area.y) {
      this.config.image.y = this.config.area.y;
    }

    if (this.config.image.width < this.config.area.width) {
      this.config.image.width = this.config.area.width;
      this.config.image.height = Math.round(this.config.area.width / this.config.image.ratio);
    }

    if (this.config.image.height < this.config.area.height) {
      this.config.image.height = this.config.area.height;
      this.config.image.width = Math.round(this.config.area.height * this.config.image.ratio);
    }
  };

  Cropper.prototype._draw = function _draw() {
    if (!this.file) return false;
    var image = this.file.get();

    this._verifyConfig();

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.drawImage(image, this.config.image.x, this.config.image.y, this.config.image.width, this.config.image.height);

    this.ctx.save();
    this.ctx.fillStyle = this.options.background;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.restore();

    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.options.borderColor;
    this.ctx.lineWidth = this.options.borderSize;
    this.ctx.rect(this.config.area.x, this.config.area.y, this.config.area.width, this.config.area.height);
    if (this.options.borderSize > 0) this.ctx.stroke();
    this.ctx.clip();

    this.ctx.drawImage(image, this.config.image.x, this.config.image.y, this.config.image.width, this.config.image.height);
    this.ctx.restore();
  };

  Cropper.prototype._getEventXY = function _getEventXY(e) {
    return (e.touches ? Array.prototype.slice.call(e.touches) : [e]).map(function (obj) {
      return {
        x: obj.screenX,
        y: obj.screenY
      };
    });
  };

  Cropper.prototype._getTouchDistance = function _getTouchDistance(touch) {
    return touch.length === 2 ? Math.sqrt((touch[1].x - touch[0].x) * (touch[1].x - touch[0].x) + (touch[1].y - touch[0].y) * (touch[1].y - touch[0].y)) : 0;
  };

  Cropper.prototype._onTouchStart = function _onTouchStart(e) {
    e.stopPropagation();
    e.preventDefault();
    if (!this.file || e.touches && e.touches.length > 2) return;
    var points = this._getEventXY(e);
    this.touch = {
      state: true,
      points: points,
      distance: this._getTouchDistance(points)
    };
  };

  Cropper.prototype._onTouchMove = function _onTouchMove(e) {
    var _this7 = this;

    e.stopPropagation();
    e.preventDefault();
    if (this.touch.state) {
      setTimeout(function () {
        var points = _this7._getEventXY(e);
        if (!e.touches || e.touches.length === 1) {
          _this7.config.image.x += points[0].x - _this7.touch.points[0].x;
          _this7.config.image.y += points[0].y - _this7.touch.points[0].y;
          _this7.touch.points[0].x = points[0].x;
          _this7.touch.points[0].y = points[0].y;
          _this7._draw();
        } else {
          var displace = _this7._getTouchDistance(points) - _this7.touch.distance;
          if (Math.abs(displace) > _this7.options.gap) {
            _this7.touch.distance += displace;
            _this7.zoom(displace > 0);
          }
        }
      }, 0);
    }
  };

  Cropper.prototype._onTouchEnd = function _onTouchEnd() {
    if (!this.touch.state) return;
    this.touch.state = false;
  };

  Cropper.prototype._onResize = function _onResize() {
    var width = document.documentElement.clientWidth;
    var height = document.documentElement.clientHeight;
    var areaWidth = (width < height ? width : height) * 0.7;
    var areaHeight = areaWidth / this.options.cropRatio;

    if (areaHeight > height * 0.6) {
      areaHeight = height * 0.6;
      areaWidth = areaHeight * this.options.cropRatio;
    }

    areaWidth = Math.round(areaWidth);
    areaHeight = Math.round(areaHeight);

    this.canvas.width = width;
    this.canvas.height = height;

    this.config.area = {
      x: Math.floor(width / 2 - areaWidth / 2),
      y: Math.floor(height / 2 - areaHeight / 2),
      width: areaWidth,
      height: areaHeight
    };
    this.touch = {
      state: false,
      points: null,
      distance: 0 };

    this._reset();
    this._draw();
  };

  return Cropper;
}();

exports.default = Cropper;

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _noop = __webpack_require__(74);

var _noop2 = _interopRequireDefault(_noop);

var _fileType = __webpack_require__(73);

var _fileType2 = _interopRequireDefault(_fileType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Picker = function () {
  function Picker(_ref) {
    var _this = this;

    var container = _ref.container,
        accept = _ref.accept,
        _ref$callback = _ref.callback,
        callback = _ref$callback === undefined ? _noop2.default : _ref$callback;

    _classCallCheck(this, Picker);

    this.container = container;

    if (!/^(absolute|relative|fixed)$/.test(getComputedStyle(container, null).getPropertyValue('position'))) {
      container.style.position = 'relative';
    }

    var rule = /.*/i;

    if (Object.prototype.toString.call(accept) === '[object String]') {
      accept = {
        'image': {
          extensions: 'jpg,png,gif,tif,bmp',
          mimeTypes: 'image/*'
        },
        'video': {
          extensions: 'mp4,m4v,mkv,webm,mov,avi,wmv,mpg',
          mimeTypes: 'player/*'
        },
        'audio': {
          extensions: 'mp3,m4a,opus,ogg,flac,wav,amr,mid',
          mimeTypes: 'music/*'
        }
      }[accept];
    }

    if (Object.prototype.toString.call(accept) === '[object Object]' && accept.extensions) {
      rule = new RegExp('(' + accept.extensions.split(',').map(function (v) {
        return v;
      }).join('|').replace(/\*/g, '.*') + ')$', 'i');
    }

    var listening = function listening(e) {
      var file = e.target.files[0];
      var newInput = _this._create(accept);

      _this.input.removeEventListener('change', listening);
      _this.container.replaceChild(newInput, _this.input);
      newInput.addEventListener('change', listening);
      _this.input = newInput;

      var reader = new FileReader();
      reader.addEventListener('load', function (e) {
        var info = (0, _fileType2.default)(e.target.result);
        if (info) {
          file.ext = info.ext;
          file.mime = info.mime;
        } else if (file.type) {
          file.ext = file.name.split('.').pop().toLowerCase();
          file.mime = file.type;
        }
        if (file.ext && rule.test(file.ext)) {
          callback(null, file);
        } else {
          callback(new Error('文件格式错误，请上传正确的文件。'), null);
        }
      });
      reader.readAsArrayBuffer(file);
    };

    this.input = this._create(accept);
    this.input.addEventListener('change', listening);
    this.container.appendChild(this.input);
  }

  Picker.prototype._create = function _create(accept) {
    var input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.style.position = 'absolute';
    input.style.top = 0;
    input.style.left = 0;
    input.style.zIndex = 100;
    input.style.display = 'block';
    input.style.width = '100%';
    input.style.height = '100%';
    input.style.opacity = 0;

    if (Object.prototype.toString.call(accept) === '[object Object]' && accept.mimeTypes) {
      input.setAttribute('accept', accept.mimeTypes);
    }

    return input;
  };

  return Picker;
}();

exports.default = Picker;

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _throttle = __webpack_require__(5);

var _throttle2 = _interopRequireDefault(_throttle);

var _scrollEventTarget = __webpack_require__(4);

var _scrollEventTarget2 = _interopRequireDefault(_scrollEventTarget);

var _scrollTop = __webpack_require__(12);

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
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

__webpack_require__(34);

var _popup = __webpack_require__(29);

var _popup2 = _interopRequireDefault(_popup);

var _indicator = __webpack_require__(23);

var _indicator2 = _interopRequireDefault(_indicator);

var _toast = __webpack_require__(31);

var _toast2 = _interopRequireDefault(_toast);

var _alert = __webpack_require__(18);

var _alert2 = _interopRequireDefault(_alert);

var _actionsheet = __webpack_require__(17);

var _actionsheet2 = _interopRequireDefault(_actionsheet);

var _dropdown = __webpack_require__(20);

var _dropdown2 = _interopRequireDefault(_dropdown);

var _uploader = __webpack_require__(32);

var _uploader2 = _interopRequireDefault(_uploader);

var _virtualScroll = __webpack_require__(33);

var _virtualScroll2 = _interopRequireDefault(_virtualScroll);

var _infiniteScroll = __webpack_require__(24);

var _infiniteScroll2 = _interopRequireDefault(_infiniteScroll);

var _lazyload = __webpack_require__(25);

var _lazyload2 = _interopRequireDefault(_lazyload);

var _outerTouch = __webpack_require__(27);

var _outerTouch2 = _interopRequireDefault(_outerTouch);

var _http = __webpack_require__(22);

var _http2 = _interopRequireDefault(_http);

var _storage = __webpack_require__(30);

var _storage2 = _interopRequireDefault(_storage);

var _asyncData = __webpack_require__(19);

var _asyncData2 = _interopRequireDefault(_asyncData);

var _emitter = __webpack_require__(21);

var _emitter2 = _interopRequireDefault(_emitter);

var _music = __webpack_require__(26);

var _music2 = _interopRequireDefault(_music);

var _player = __webpack_require__(28);

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Install = function Install(Vue) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (typeof window.Vue === 'undefined') window.Vue = Vue;

  Vue.use(_popup2.default);
  Vue.use(_indicator2.default);
  Vue.use(_toast2.default, options.toast);
  Vue.use(_alert2.default);
  Vue.use(_actionsheet2.default);
  Vue.use(_dropdown2.default);
  Vue.use(_uploader2.default, options.uploader);
  Vue.use(_infiniteScroll2.default);
  Vue.use(_virtualScroll2.default);
  Vue.use(_lazyload2.default, options.lazyload);
  Vue.use(_outerTouch2.default);
  Vue.use(_http2.default, options.http);
  Vue.use(_storage2.default);
  Vue.use(_asyncData2.default);
  Vue.use(_emitter2.default);
  Vue.use(_music2.default);
  Vue.use(_player2.default);
};

if (typeof window !== 'undefined' && window.Vue) {
  Install(Vue, window.VueOptions || {});
}

exports.default = Install;

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (!('find' in Array.prototype)) {
  Object.defineProperty(Array.prototype, 'find', {
    configurable: true,
    value: function find(callback) {
      if (this === undefined || this === null) {
        throw new TypeError(this + ' is not an object');
      }

      if (!(callback instanceof Function)) {
        throw new TypeError(callback + ' is not a function');
      }

      var object = Object(this);
      var scope = arguments[1];
      var arraylike = object instanceof String ? object.split('') : object;
      var length = Math.max(Math.min(arraylike.length, 9007199254740991), 0) || 0;
      var index = -1;
      var element = void 0;

      while (++index < length) {
        if (index in arraylike) {
          element = arraylike[index];

          if (callback.call(scope, element, index, object)) {
            return element;
          }
        }
      }
    },
    writable: true
  });
}

if (!('findIndex' in Array.prototype)) {
  Object.defineProperty(Array.prototype, 'findIndex', {
    configurable: true,
    value: function findIndex(callback) {
      if (this === undefined || this === null) {
        throw new TypeError(this + ' is not an object');
      }

      if (!(callback instanceof Function)) {
        throw new TypeError(callback + ' is not a function');
      }

      var object = Object(this);
      var scope = arguments[1];
      var arraylike = object instanceof String ? object.split('') : object;
      var length = Math.max(Math.min(arraylike.length, 9007199254740991), 0) || 0;
      var index = -1;

      while (++index < length) {
        if (index in arraylike) {
          if (callback.call(scope, arraylike[index], index, object)) {
            return index;
          }
        }
      }

      return -1;
    },
    writable: true
  });
}

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (!Object.assign) {
  Object.assign = function (target, source) {
    for (var index = 1; index < arguments.length; ++index) {
      var src = arguments[index];

      for (var key in src) {
        if (Object.prototype.hasOwnProperty.call(src, key)) {
          target[key] = src[key];
        }
      }
    }
    return target;
  };
}

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _es6PromiseAuto = __webpack_require__(80);

var _es6PromiseAuto2 = _interopRequireDefault(_es6PromiseAuto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_es6PromiseAuto2.default.polyfill();

window.Promise.series = function (promises) {
  promises = promises.slice();
  var results = null;

  return new Promise(function (resolve, reject) {
    function next(result) {
      results = !results ? [] : results.concat(result);

      if (promises.length) {
        var promise = promises.shift();

        if (typeof promise === 'function') {
          promise = promise();
        }

        if (!promise || typeof promise.then !== 'function') {
          promise = Promise.resolve();
        }

        promise.then(next).catch(reject);
      } else {
        resolve(results);
      }
    }

    next();
  });
};

/***/ }),
/* 71 */
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

var _prefix = __webpack_require__(75);

var _prefix2 = _interopRequireDefault(_prefix);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (dataURI) {
  var byteString = atob(dataURI.split(',')[1]);
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ab], { type: mimeString });
};

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (input) {
  var buf = new Uint8Array(input);

  if (!(buf && buf.length > 1)) {
    return null;
  }

  var check = function check(header) {
    for (var i = 0; i < header.length; i++) {
      if (header[i] !== buf[i]) {
        return false;
      }
    }
    return true;
  };

  if (check([0xFF, 0xD8, 0xFF])) {
    return {
      ext: 'jpg',
      mime: 'image/jpeg'
    };
  }

  if (check([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A])) {
    return {
      ext: 'png',
      mime: 'image/png'
    };
  }

  if (check([0x47, 0x49, 0x46])) {
    return {
      ext: 'gif',
      mime: 'image/gif'
    };
  }

  if (check([0x49, 0x49, 0x2A, 0x0]) || check([0x4D, 0x4D, 0x0, 0x2A])) {
    return {
      ext: 'tif',
      mime: 'image/tiff'
    };
  }

  if (check([0x42, 0x4D])) {
    return {
      ext: 'bmp',
      mime: 'image/bmp'
    };
  }

  if (check([0x38, 0x42, 0x50, 0x53])) {
    return {
      ext: 'psd',
      mime: 'image/vnd.adobe.photoshop'
    };
  }

  if (check([0x0, 0x0, 0x0]) && (buf[3] === 0x18 || buf[3] === 0x20) && buf[4] === 0x66 && buf[5] === 0x74 && buf[6] === 0x79 && buf[7] === 0x70 || check([0x33, 0x67, 0x70, 0x35]) || check([0x0, 0x0, 0x0, 0x1C, 0x66, 0x74, 0x79, 0x70, 0x6D, 0x70, 0x34, 0x32]) && buf[16] === 0x6D && buf[17] === 0x70 && buf[18] === 0x34 && buf[19] === 0x31 && buf[20] === 0x6D && buf[21] === 0x70 && buf[22] === 0x34 && buf[23] === 0x32 && buf[24] === 0x69 && buf[25] === 0x73 && buf[26] === 0x6F && buf[27] === 0x6D || check([0x0, 0x0, 0x0, 0x1C, 0x66, 0x74, 0x79, 0x70, 0x69, 0x73, 0x6F, 0x6D]) || check([0x0, 0x0, 0x0, 0x1C, 0x66, 0x74, 0x79, 0x70, 0x6D, 0x70, 0x34, 0x32, 0x0, 0x0, 0x0, 0x0])) {
    return {
      ext: 'mp4',
      mime: 'player/mp4'
    };
  }

  if (check([0x0, 0x0, 0x0, 0x1C, 0x66, 0x74, 0x79, 0x70, 0x4D, 0x34, 0x56])) {
    return {
      ext: 'm4v',
      mime: 'player/x-m4v'
    };
  }

  if (check([0x1A, 0x45, 0xDF, 0xA3])) {
    var sliced = buf.subarray(4, 4 + 4096);
    var idPos = sliced.findIndex(function (el, i, arr) {
      return arr[i] === 0x42 && arr[i + 1] === 0x82;
    });

    if (idPos >= 0) {
      var docTypePos = idPos + 3;
      var findDocType = function findDocType(type) {
        return Array.from(type).every(function (c, i) {
          return sliced[docTypePos + i] === c.charCodeAt(0);
        });
      };

      if (findDocType('matroska')) {
        return {
          ext: 'mkv',
          mime: 'player/x-matroska'
        };
      }

      if (findDocType('webm')) {
        return {
          ext: 'webm',
          mime: 'player/webm'
        };
      }
    }
  }

  if (check([0x0, 0x0, 0x0, 0x14, 0x66, 0x74, 0x79, 0x70])) {
    return {
      ext: 'mov',
      mime: 'player/quicktime'
    };
  }

  if (check([0x52, 0x49, 0x46, 0x46]) && buf[8] === 0x41 && buf[9] === 0x56 && buf[10] === 0x49) {
    return {
      ext: 'avi',
      mime: 'player/x-msvideo'
    };
  }

  if (check([0x30, 0x26, 0xB2, 0x75, 0x8E, 0x66, 0xCF, 0x11, 0xA6, 0xD9])) {
    return {
      ext: 'wmv',
      mime: 'player/x-ms-wmv'
    };
  }

  if (check([0x0, 0x0, 0x1, 0xBA])) {
    return {
      ext: 'mpg',
      mime: 'player/mpeg'
    };
  }

  if (check([0x46, 0x4C, 0x56, 0x01])) {
    return {
      ext: 'flv',
      mime: 'player/x-flv'
    };
  }

  if (check([0x49, 0x44, 0x33]) || check([0xFF, 0xFB])) {
    return {
      ext: 'mp3',
      mime: 'music/mpeg'
    };
  }

  if (buf[4] === 0x66 && buf[5] === 0x74 && buf[6] === 0x79 && buf[7] === 0x70 && buf[8] === 0x4D && buf[9] === 0x34 && buf[10] === 0x41 || buf[0] === 0x4D && buf[1] === 0x34 && buf[2] === 0x41 && buf[3] === 0x20) {
    return {
      ext: 'm4a',
      mime: 'music/m4a'
    };
  }

  if (buf[28] === 0x4F && buf[29] === 0x70 && buf[30] === 0x75 && buf[31] === 0x73 && buf[32] === 0x48 && buf[33] === 0x65 && buf[34] === 0x61 && buf[35] === 0x64) {
    return {
      ext: 'opus',
      mime: 'music/opus'
    };
  }

  if (check([0x4F, 0x67, 0x67, 0x53])) {
    return {
      ext: 'ogg',
      mime: 'music/ogg'
    };
  }

  if (check([0x66, 0x4C, 0x61, 0x43])) {
    return {
      ext: 'flac',
      mime: 'music/x-flac'
    };
  }

  if (check([0x52, 0x49, 0x46, 0x46]) && buf[8] === 0x57 && buf[9] === 0x41 && buf[10] === 0x56 && buf[11] === 0x45) {
    return {
      ext: 'wav',
      mime: 'music/x-wav'
    };
  }

  if (check([0x23, 0x21, 0x41, 0x4D, 0x52, 0x0A])) {
    return {
      ext: 'amr',
      mime: 'music/amr'
    };
  }

  if (check([0x4D, 0x54, 0x68, 0x64])) {
    return {
      ext: 'mid',
      mime: 'music/midi'
    };
  }
};

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function () {};

/***/ }),
/* 75 */
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
/* 76 */
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
/* 77 */
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
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return b64.length * 3 / 4 - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, j, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr(len * 3 / 4 - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(78)
var ieee754 = __webpack_require__(89)
var isArray = __webpack_require__(92)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {var require;!function(t,e){ true?module.exports=e():"function"==typeof define&&define.amd?define(e):t.ES6Promise=e()}(this,function(){"use strict";function t(t){return"function"==typeof t||"object"==typeof t&&null!==t}function e(t){return"function"==typeof t}function n(t){I=t}function r(t){J=t}function o(){return function(){return process.nextTick(a)}}function i(){return"undefined"!=typeof H?function(){H(a)}:c()}function s(){var t=0,e=new V(a),n=document.createTextNode("");return e.observe(n,{characterData:!0}),function(){n.data=t=++t%2}}function u(){var t=new MessageChannel;return t.port1.onmessage=a,function(){return t.port2.postMessage(0)}}function c(){var t=setTimeout;return function(){return t(a,1)}}function a(){for(var t=0;t<G;t+=2){var e=$[t],n=$[t+1];e(n),$[t]=void 0,$[t+1]=void 0}G=0}function f(){try{var t=require,e=__webpack_require__(109);return H=e.runOnLoop||e.runOnContext,i()}catch(n){return c()}}function l(t,e){var n=arguments,r=this,o=new this.constructor(p);void 0===o[et]&&k(o);var i=r._state;return i?!function(){var t=n[i-1];J(function(){return x(i,o,t,r._result)})}():E(r,o,t,e),o}function h(t){var e=this;if(t&&"object"==typeof t&&t.constructor===e)return t;var n=new e(p);return g(n,t),n}function p(){}function v(){return new TypeError("You cannot resolve a promise with itself")}function d(){return new TypeError("A promises callback cannot return that same promise.")}function _(t){try{return t.then}catch(e){return it.error=e,it}}function y(t,e,n,r){try{t.call(e,n,r)}catch(o){return o}}function m(t,e,n){J(function(t){var r=!1,o=y(n,e,function(n){r||(r=!0,e!==n?g(t,n):S(t,n))},function(e){r||(r=!0,j(t,e))},"Settle: "+(t._label||" unknown promise"));!r&&o&&(r=!0,j(t,o))},t)}function b(t,e){e._state===rt?S(t,e._result):e._state===ot?j(t,e._result):E(e,void 0,function(e){return g(t,e)},function(e){return j(t,e)})}function w(t,n,r){n.constructor===t.constructor&&r===l&&n.constructor.resolve===h?b(t,n):r===it?(j(t,it.error),it.error=null):void 0===r?S(t,n):e(r)?m(t,n,r):S(t,n)}function g(e,n){e===n?j(e,v()):t(n)?w(e,n,_(n)):S(e,n)}function A(t){t._onerror&&t._onerror(t._result),T(t)}function S(t,e){t._state===nt&&(t._result=e,t._state=rt,0!==t._subscribers.length&&J(T,t))}function j(t,e){t._state===nt&&(t._state=ot,t._result=e,J(A,t))}function E(t,e,n,r){var o=t._subscribers,i=o.length;t._onerror=null,o[i]=e,o[i+rt]=n,o[i+ot]=r,0===i&&t._state&&J(T,t)}function T(t){var e=t._subscribers,n=t._state;if(0!==e.length){for(var r=void 0,o=void 0,i=t._result,s=0;s<e.length;s+=3)r=e[s],o=e[s+n],r?x(n,r,o,i):o(i);t._subscribers.length=0}}function M(){this.error=null}function P(t,e){try{return t(e)}catch(n){return st.error=n,st}}function x(t,n,r,o){var i=e(r),s=void 0,u=void 0,c=void 0,a=void 0;if(i){if(s=P(r,o),s===st?(a=!0,u=s.error,s.error=null):c=!0,n===s)return void j(n,d())}else s=o,c=!0;n._state!==nt||(i&&c?g(n,s):a?j(n,u):t===rt?S(n,s):t===ot&&j(n,s))}function C(t,e){try{e(function(e){g(t,e)},function(e){j(t,e)})}catch(n){j(t,n)}}function O(){return ut++}function k(t){t[et]=ut++,t._state=void 0,t._result=void 0,t._subscribers=[]}function Y(t,e){this._instanceConstructor=t,this.promise=new t(p),this.promise[et]||k(this.promise),B(e)?(this._input=e,this.length=e.length,this._remaining=e.length,this._result=new Array(this.length),0===this.length?S(this.promise,this._result):(this.length=this.length||0,this._enumerate(),0===this._remaining&&S(this.promise,this._result))):j(this.promise,q())}function q(){return new Error("Array Methods must be provided an Array")}function F(t){return new Y(this,t).promise}function D(t){var e=this;return new e(B(t)?function(n,r){for(var o=t.length,i=0;i<o;i++)e.resolve(t[i]).then(n,r)}:function(t,e){return e(new TypeError("You must pass an array to race."))})}function K(t){var e=this,n=new e(p);return j(n,t),n}function L(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function N(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}function U(t){this[et]=O(),this._result=this._state=void 0,this._subscribers=[],p!==t&&("function"!=typeof t&&L(),this instanceof U?C(this,t):N())}function W(){var t=void 0;if("undefined"!=typeof global)t=global;else if("undefined"!=typeof self)t=self;else try{t=Function("return this")()}catch(e){throw new Error("polyfill failed because global object is unavailable in this environment")}var n=t.Promise;if(n){var r=null;try{r=Object.prototype.toString.call(n.resolve())}catch(e){}if("[object Promise]"===r&&!n.cast)return}t.Promise=U}var z=void 0;z=Array.isArray?Array.isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)};var B=z,G=0,H=void 0,I=void 0,J=function(t,e){$[G]=t,$[G+1]=e,G+=2,2===G&&(I?I(a):tt())},Q="undefined"!=typeof window?window:void 0,R=Q||{},V=R.MutationObserver||R.WebKitMutationObserver,X="undefined"==typeof self&&"undefined"!=typeof process&&"[object process]"==={}.toString.call(process),Z="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,$=new Array(1e3),tt=void 0;tt=X?o():V?s():Z?u():void 0===Q&&"function"=="function"?f():c();var et=Math.random().toString(36).substring(16),nt=void 0,rt=1,ot=2,it=new M,st=new M,ut=0;return Y.prototype._enumerate=function(){for(var t=this.length,e=this._input,n=0;this._state===nt&&n<t;n++)this._eachEntry(e[n],n)},Y.prototype._eachEntry=function(t,e){var n=this._instanceConstructor,r=n.resolve;if(r===h){var o=_(t);if(o===l&&t._state!==nt)this._settledAt(t._state,e,t._result);else if("function"!=typeof o)this._remaining--,this._result[e]=t;else if(n===U){var i=new n(p);w(i,t,o),this._willSettleAt(i,e)}else this._willSettleAt(new n(function(e){return e(t)}),e)}else this._willSettleAt(r(t),e)},Y.prototype._settledAt=function(t,e,n){var r=this.promise;r._state===nt&&(this._remaining--,t===ot?j(r,n):this._result[e]=n),0===this._remaining&&S(r,this._result)},Y.prototype._willSettleAt=function(t,e){var n=this;E(t,void 0,function(t){return n._settledAt(rt,e,t)},function(t){return n._settledAt(ot,e,t)})},U.all=F,U.race=D,U.resolve=h,U.reject=K,U._setScheduler=n,U._setAsap=r,U._asap=J,U.prototype={constructor:U,then:l,"catch":function(t){return this.then(null,t)}},U.polyfill=W,U.Promise=U,U.polyfill(),U});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15), __webpack_require__(16)))

/***/ }),
/* 81 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 82 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 83 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 84 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 85 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 86 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 87 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 88 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 89 */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 90 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export intervalometer */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return frameIntervalometer; });
/* unused harmony export timerIntervalometer */
/*! npm.im/intervalometer */
function intervalometer(cb, request, cancel, requestParameter) {
	var requestId;
	var previousLoopTime;
	function loop(now) {
		// must be requested before cb() because that might call .stop()
		requestId = request(loop, requestParameter);

		// called with "ms since last call". 0 on start()
		cb(now - (previousLoopTime || now));

		previousLoopTime = now;
	}
	return {
		start: function start() {
			if (!requestId) { // prevent double starts
				loop(0);
			}
		},
		stop: function stop() {
			cancel(requestId);
			requestId = null;
			previousLoopTime = 0;
		}
	};
}

function frameIntervalometer(cb) {
	return intervalometer(cb, requestAnimationFrame, cancelAnimationFrame);
}

function timerIntervalometer(cb, delay) {
	return intervalometer(cb, setTimeout, clearTimeout, delay);
}



/***/ }),
/* 91 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_intervalometer__ = __webpack_require__(90);
/*! npm.im/iphone-inline-video 2.0.2 */


function preventEvent(element, eventName, toggleProperty, preventWithProperty) {
	function handler(e) {
		if (Boolean(element[toggleProperty]) === Boolean(preventWithProperty)) {
			e.stopImmediatePropagation();
			// console.log(eventName, 'prevented on', element);
		}
		delete element[toggleProperty];
	}
	element.addEventListener(eventName, handler, false);

	// Return handler to allow to disable the prevention. Usage:
	// const preventionHandler = preventEvent(el, 'click');
	// el.removeEventHandler('click', preventionHandler);
	return handler;
}

function proxyProperty(object, propertyName, sourceObject, copyFirst) {
	function get() {
		return sourceObject[propertyName];
	}
	function set(value) {
		sourceObject[propertyName] = value;
	}

	if (copyFirst) {
		set(object[propertyName]);
	}

	Object.defineProperty(object, propertyName, {get: get, set: set});
}

function proxyEvent(object, eventName, sourceObject) {
	sourceObject.addEventListener(eventName, function () { return object.dispatchEvent(new Event(eventName)); });
}

function dispatchEventAsync(element, type) {
	Promise.resolve().then(function () {
		element.dispatchEvent(new Event(type));
	});
}

var iOS8or9 = typeof document === 'object' && 'object-fit' in document.head.style && !matchMedia('(-webkit-video-playable-inline)').matches;

var ಠ = 'bfred-it:iphone-inline-video';
var ಠevent = 'bfred-it:iphone-inline-video:event';
var ಠplay = 'bfred-it:iphone-inline-video:nativeplay';
var ಠpause = 'bfred-it:iphone-inline-video:nativepause';

/**
 * UTILS
 */

function getAudioFromVideo(video) {
	var audio = new Audio();
	proxyEvent(video, 'play', audio);
	proxyEvent(video, 'playing', audio);
	proxyEvent(video, 'pause', audio);
	audio.crossOrigin = video.crossOrigin;

	// 'data:' causes audio.networkState > 0
	// which then allows to keep <audio> in a resumable playing state
	// i.e. once you set a real src it will keep playing if it was if .play() was called
	audio.src = video.src || video.currentSrc || 'data:';

	// if (audio.src === 'data:') {
	//   TODO: wait for video to be selected
	// }
	return audio;
}

var lastRequests = [];
var requestIndex = 0;
var lastTimeupdateEvent;

function setTime(video, time, rememberOnly) {
	// allow one timeupdate event every 200+ ms
	if ((lastTimeupdateEvent || 0) + 200 < Date.now()) {
		video[ಠevent] = true;
		lastTimeupdateEvent = Date.now();
	}
	if (!rememberOnly) {
		video.currentTime = time;
	}
	lastRequests[++requestIndex % 3] = time * 100 | 0 / 100;
}

function isPlayerEnded(player) {
	return player.driver.currentTime >= player.video.duration;
}

function update(timeDiff) {
	var player = this;
	// console.log('update', player.video.readyState, player.video.networkState, player.driver.readyState, player.driver.networkState, player.driver.paused);
	if (player.video.readyState >= player.video.HAVE_FUTURE_DATA) {
		if (!player.hasAudio) {
			player.driver.currentTime = player.video.currentTime + ((timeDiff * player.video.playbackRate) / 1000);
			if (player.video.loop && isPlayerEnded(player)) {
				player.driver.currentTime = 0;
			}
		}
		setTime(player.video, player.driver.currentTime);
	} else if (player.video.networkState === player.video.NETWORK_IDLE && player.video.buffered.length === 0) {
		// this should happen when the source is available but:
		// - it's potentially playing (.paused === false)
		// - it's not ready to play
		// - it's not loading
		// If it hasAudio, that will be loaded in the 'emptied' handler below
		player.video.load();
		// console.log('Will load');
	}

	// console.assert(player.video.currentTime === player.driver.currentTime, 'Video not updating!');

	if (player.video.ended) {
		delete player.video[ಠevent]; // allow timeupdate event
		player.video.pause(true);
	}
}

/**
 * METHODS
 */

function play() {
	// console.log('play');
	var video = this;
	var player = video[ಠ];

	// if it's fullscreen, use the native player
	if (video.webkitDisplayingFullscreen) {
		video[ಠplay]();
		return;
	}

	if (player.driver.src !== 'data:' && player.driver.src !== video.src) {
		// console.log('src changed on play', video.src);
		setTime(video, 0, true);
		player.driver.src = video.src;
	}

	if (!video.paused) {
		return;
	}
	player.paused = false;

	if (video.buffered.length === 0) {
		// .load() causes the emptied event
		// the alternative is .play()+.pause() but that triggers play/pause events, even worse
		// possibly the alternative is preventing this event only once
		video.load();
	}

	player.driver.play();
	player.updater.start();

	if (!player.hasAudio) {
		dispatchEventAsync(video, 'play');
		if (player.video.readyState >= player.video.HAVE_ENOUGH_DATA) {
			// console.log('onplay');
			dispatchEventAsync(video, 'playing');
		}
	}
}
function pause(forceEvents) {
	// console.log('pause');
	var video = this;
	var player = video[ಠ];

	player.driver.pause();
	player.updater.stop();

	// if it's fullscreen, the developer the native player.pause()
	// This is at the end of pause() because it also
	// needs to make sure that the simulation is paused
	if (video.webkitDisplayingFullscreen) {
		video[ಠpause]();
	}

	if (player.paused && !forceEvents) {
		return;
	}

	player.paused = true;
	if (!player.hasAudio) {
		dispatchEventAsync(video, 'pause');
	}
	if (video.ended) {
		video[ಠevent] = true;
		dispatchEventAsync(video, 'ended');
	}
}

/**
 * SETUP
 */

function addPlayer(video, hasAudio) {
	var player = video[ಠ] = {};
	player.paused = true; // track whether 'pause' events have been fired
	player.hasAudio = hasAudio;
	player.video = video;
	player.updater = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_intervalometer__["a" /* frameIntervalometer */])(update.bind(player));

	if (hasAudio) {
		player.driver = getAudioFromVideo(video);
	} else {
		video.addEventListener('canplay', function () {
			if (!video.paused) {
				// console.log('oncanplay');
				dispatchEventAsync(video, 'playing');
			}
		});
		player.driver = {
			src: video.src || video.currentSrc || 'data:',
			muted: true,
			paused: true,
			pause: function () {
				player.driver.paused = true;
			},
			play: function () {
				player.driver.paused = false;
				// media automatically goes to 0 if .play() is called when it's done
				if (isPlayerEnded(player)) {
					setTime(video, 0);
				}
			},
			get ended() {
				return isPlayerEnded(player);
			}
		};
	}

	// .load() causes the emptied event
	video.addEventListener('emptied', function () {
		// console.log('driver src is', player.driver.src);
		var wasEmpty = !player.driver.src || player.driver.src === 'data:';
		if (player.driver.src && player.driver.src !== video.src) {
			// console.log('src changed to', video.src);
			setTime(video, 0, true);
			player.driver.src = video.src;
			// playing videos will only keep playing if no src was present when .play()’ed
			if (wasEmpty) {
				player.driver.play();
			} else {
				player.updater.stop();
			}
		}
	}, false);

	// stop programmatic player when OS takes over
	video.addEventListener('webkitbeginfullscreen', function () {
		if (!video.paused) {
			// make sure that the <audio> and the syncer/updater are stopped
			video.pause();

			// play video natively
			video[ಠplay]();
		} else if (hasAudio && player.driver.buffered.length === 0) {
			// if the first play is native,
			// the <audio> needs to be buffered manually
			// so when the fullscreen ends, it can be set to the same current time
			player.driver.load();
		}
	});
	if (hasAudio) {
		video.addEventListener('webkitendfullscreen', function () {
			// sync audio to new video position
			player.driver.currentTime = video.currentTime;
			// console.assert(player.driver.currentTime === video.currentTime, 'Audio not synced');
		});

		// allow seeking
		video.addEventListener('seeking', function () {
			if (lastRequests.indexOf(video.currentTime * 100 | 0 / 100) < 0) {
				// console.log('User-requested seeking');
				player.driver.currentTime = video.currentTime;
			}
		});
	}
}

function overloadAPI(video) {
	var player = video[ಠ];
	video[ಠplay] = video.play;
	video[ಠpause] = video.pause;
	video.play = play;
	video.pause = pause;
	proxyProperty(video, 'paused', player.driver);
	proxyProperty(video, 'muted', player.driver, true);
	proxyProperty(video, 'playbackRate', player.driver, true);
	proxyProperty(video, 'ended', player.driver);
	proxyProperty(video, 'loop', player.driver, true);
	preventEvent(video, 'seeking');
	preventEvent(video, 'seeked');
	preventEvent(video, 'timeupdate', ಠevent, false);
	preventEvent(video, 'ended', ಠevent, false); // prevent occasional native ended events
}

function enableInlineVideo(video, opts) {
	if ( opts === void 0 ) opts = {};

	// Stop if already enabled
	if (video[ಠ]) {
		return;
	}

	// Allow the user to skip detection
	if (!opts.everywhere) {
		// Only iOS8 and 9 are supported
		if (!iOS8or9) {
			return;
		}

		// Stop if it's not an allowed device
		if (!(opts.iPad || opts.ipad ? /iPhone|iPod|iPad/ : /iPhone|iPod/).test(navigator.userAgent)) {
			return;
		}
	}

	// Stop native playback
	if (!video.paused && video.webkitDisplayingFullscreen) {
		video.pause();
	}

	addPlayer(video, !video.muted);
	overloadAPI(video);
	video.classList.add('IIV');

	// Autoplay
	if (video.muted && video.autoplay) {
		video.play();
	}

	if (!/iPhone|iPod|iPad/.test(navigator.platform)) {
		console.warn('iphone-inline-video is not guaranteed to work in emulated environments');
	}
}

/* harmony default export */ __webpack_exports__["default"] = (enableInlineVideo);


/***/ }),
/* 92 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(86)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(52),
  /* template */
  __webpack_require__(106),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(81)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(53),
  /* template */
  __webpack_require__(101),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(87)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(54),
  /* template */
  __webpack_require__(107),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(83)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(55),
  /* template */
  __webpack_require__(103),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(85)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(56),
  /* template */
  __webpack_require__(105),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(82)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(57),
  /* template */
  __webpack_require__(102),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(84)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(58),
  /* template */
  __webpack_require__(104),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(88)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(59),
  /* template */
  __webpack_require__(108),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 101 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('popup', {
    attrs: {
      "popup-class": "u-alert",
      "destroy": true,
      "close-on-click-mask": _vm.closeOnClickMask,
      "opacity": _vm.opacity
    },
    on: {
      "cancel": function($event) {
        _vm.$emit('cancel')
      }
    },
    model: {
      value: (_vm.visible),
      callback: function($$v) {
        _vm.visible = $$v
      },
      expression: "visible"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.title),
      expression: "title"
    }],
    staticClass: "u-alert-header"
  }, [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.showInput),
      expression: "!showInput"
    }],
    staticClass: "u-alert-content",
    domProps: {
      "innerHTML": _vm._s(_vm.message)
    }
  }), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.showInput),
      expression: "showInput"
    }],
    staticClass: "u-alert-input"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.inputValue),
      expression: "inputValue"
    }],
    ref: "input",
    attrs: {
      "type": "text",
      "placeholder": _vm.inputPlaceholder
    },
    domProps: {
      "value": (_vm.inputValue)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.inputValue = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.buttons.length > 0),
      expression: "buttons.length > 0"
    }],
    staticClass: "u-alert-button"
  }, _vm._l((_vm.buttons), function(btn, index) {
    return _c('a', {
      style: (_vm.buttonStyle),
      on: {
        "click": function($event) {
          _vm.tap(index)
        }
      }
    }, [_vm._v("\n      " + _vm._s(btn.label) + "\n    ")])
  }))])
},staticRenderFns: []}

/***/ }),
/* 102 */
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

/***/ }),
/* 103 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('popup', {
    attrs: {
      "popup-class": "u-indicator",
      "close-on-click-mask": false,
      "opacity": 0
    },
    nativeOn: {
      "touchstart": function($event) {
        $event.stopPropagation();
      }
    },
    model: {
      value: (_vm.visible),
      callback: function($$v) {
        _vm.visible = $$v
      },
      expression: "visible"
    }
  }, [_c('div', {
    staticClass: "u-indicator-spin"
  }), _vm._v(" "), _c('span', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.text),
      expression: "text"
    }],
    staticClass: "u-indicator-text"
  }, [_vm._v(_vm._s(_vm.text))])])
},staticRenderFns: []}

/***/ }),
/* 104 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('popup', {
    attrs: {
      "popup-class": _vm.popupClass,
      "position": _vm.position,
      "destroy": true,
      "opacity": -1
    },
    model: {
      value: (_vm.visible),
      callback: function($$v) {
        _vm.visible = $$v
      },
      expression: "visible"
    }
  }, [_c('div', {
    staticClass: "u-toast-box"
  }, [_c('i', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.icon !== ''),
      expression: "icon !== ''"
    }],
    staticClass: "u-toast-icon",
    class: _vm.iconClass
  }), _vm._v(" "), _c('span', {
    staticClass: "u-toast-text"
  }, [_vm._v(_vm._s(_vm.message))])])])
},staticRenderFns: []}

/***/ }),
/* 105 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('popup', {
    attrs: {
      "position": "right",
      "opacity": 0
    },
    nativeOn: {
      "touchmove": function($event) {
        $event.stopPropagation();
        $event.preventDefault();
      }
    },
    model: {
      value: (_vm.visible),
      callback: function($$v) {
        _vm.visible = $$v
      },
      expression: "visible"
    }
  }, [_c('div', {
    staticClass: "u-player"
  }, [_c('video', {
    ref: "video",
    staticClass: "u-player-video",
    attrs: {
      "x-webkit-airplay": "allow",
      "webkit-playsinline": "true",
      "playsinline": "true",
      "x5-video-player-type": "h5",
      "crossorigin": "anonymous",
      "preload": "auto",
      "loop": _vm.loop,
      "poster": _vm.poster,
      "src": _vm.src
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "u-player-controller"
  }, [_c('button', {
    staticClass: "u-player-btn",
    on: {
      "click": function($event) {
        _vm.switchVideo()
      }
    }
  }, [_c('svg', {
    attrs: {
      "width": "100%",
      "height": "100%",
      "viewBox": _vm.state === 'play' ? '0 0 17 32' : '0 0 16 32',
      "version": "1.1",
      "xmlns": "http://www.w3.org/2000/svg"
    }
  }, [_c('path', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.state === 'play'),
      expression: "state === 'play'"
    }],
    attrs: {
      "fill": "#ffffff",
      "d": "M14.080 4.8q2.88 0 2.88 2.048v18.24q0 2.112-2.88 2.112t-2.88-2.112v-18.24q0-2.048 2.88-2.048zM2.88 4.8q2.88 0 2.88 2.048v18.24q0 2.112-2.88 2.112t-2.88-2.112v-18.24q0-2.048 2.88-2.048z"
    }
  }), _vm._v(" "), _c('path', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.state !== 'play'),
      expression: "state !== 'play'"
    }],
    attrs: {
      "fill": "#ffffff",
      "d": "M15.552 15.168q0.448 0.32 0.448 0.832 0 0.448-0.448 0.768l-13.696 8.512q-0.768 0.512-1.312 0.192t-0.544-1.28v-16.448q0-0.96 0.544-1.28t1.312 0.192z"
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "u-player-time"
  }, [_c('span', [_vm._v(_vm._s(_vm.secondToTime(_vm.played)))]), _vm._v(" / "), _c('span', [_vm._v(_vm._s(_vm.secondToTime(_vm.duration)))])]), _vm._v(" "), _c('div', {
    staticClass: "u-player-bar",
    on: {
      "click": function($event) {
        _vm.adjust($event)
      }
    }
  }, [_c('div', {
    staticClass: "u-player-loaded",
    style: ({
      width: Math.min(_vm.loaded / _vm.duration * 100, 100) + '%'
    })
  }), _vm._v(" "), _c('div', {
    staticClass: "u-player-played",
    style: ({
      width: Math.min(_vm.played / _vm.duration * 100, 100) + '%'
    })
  })]), _vm._v(" "), _c('div', {
    staticClass: "u-player-tool"
  }, [_c('button', {
    staticClass: "u-player-btn",
    on: {
      "click": function($event) {
        _vm.exit()
      }
    }
  }, [_c('svg', {
    staticStyle: {
      "margin": "5% auto 0"
    },
    attrs: {
      "width": "90%",
      "height": "90%",
      "viewBox": "0 0 1024 1024",
      "version": "1.1",
      "xmlns": "http://www.w3.org/2000/svg"
    }
  }, [_c('path', {
    attrs: {
      "fill": "#ffffff",
      "d": "M953.653003 495.405043 768.424945 310.184575c-9.079145-9.078773-23.800007-9.078773-32.884269 0l-37.440215 37.438681c-9.079145 9.078773-9.079145 23.804149 0 32.882921l81.706161 81.702813L407.380563 462.20899c-12.838926 0-23.246376 10.408047-23.246376 23.246447l0 52.952003c0 12.842493 10.40745 23.251563 23.246376 23.251563l372.244928 0-81.706161 81.702813c-9.079145 9.077749-9.079145 23.804149 0 32.881898l37.445331 37.439704c9.079145 9.078773 23.805124 9.078773 32.884269 0L916.206648 565.731762c0-0.005117 0.005117-0.005117 0.005117-0.005117l37.445331-37.443797C962.731124 519.204076 962.731124 504.482793 953.653003 495.405043L953.653003 495.405043zM634.548497 64.021106 133.71476 64.021106c-38.519847 0-69.751408 31.230282-69.751408 69.74855l0 756.327658c0 38.524408 31.231561 69.749574 69.751408 69.749574l500.833737 0c38.52087 0 69.751408-31.225165 69.751408-69.749574l0-98.134041c0-12.837376-10.408474-23.251563-23.252516-23.251563l-50.396825 0c-12.837902 0-23.252516 10.414187-23.252516 23.251563l0 37.331233c-0.25379 19.037589-15.762631 34.398438-34.864447 34.398438L194.759522 863.692944c-19.257365 0-34.872634-15.615653-34.872634-34.877345L159.886888 194.241936c0-19.257599 15.609129-34.874275 34.872634-34.874275l377.774078 0c19.10591 0 34.610657 15.356756 34.864447 34.398438l0 38.431288c0 12.842493 10.414614 23.251563 23.252516 23.251563l50.396825 0c12.844042 0 23.252516-10.409071 23.252516-23.251563L704.299905 133.769656C704.299905 95.251388 673.068343 64.021106 634.548497 64.021106L634.548497 64.021106zM634.548497 64.021106"
    }
  })])])])]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.loading),
      expression: "loading"
    }],
    staticClass: "u-player-loading"
  }, [_c('div', {
    staticClass: "u-player-spin"
  })])])])
},staticRenderFns: []}

/***/ }),
/* 106 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('popup', {
    attrs: {
      "position": "bottom",
      "destroy": true,
      "close-on-click-mask": _vm.cancel !== ''
    },
    model: {
      value: (_vm.visible),
      callback: function($$v) {
        _vm.visible = $$v
      },
      expression: "visible"
    }
  }, [_c('div', {
    staticClass: "u-actionSheet"
  }, [_c('ul', {
    staticClass: "u-actionSheet-list"
  }, _vm._l((_vm.actions), function(item) {
    return _c('li', {
      staticClass: "u-actionSheet-item u-actionSheet-button",
      class: item.className || '',
      domProps: {
        "innerHTML": _vm._s(item.label)
      },
      on: {
        "click": function($event) {
          _vm.itemClick(item)
        }
      }
    })
  })), _vm._v(" "), _c('a', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.cancel),
      expression: "cancel"
    }],
    staticClass: "u-actionSheet-cancel u-actionSheet-button",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.visible = false
      }
    }
  }, [_vm._v("\n      " + _vm._s(_vm.cancel) + "\n    ")])])])
},staticRenderFns: []}

/***/ }),
/* 107 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    directives: [{
      name: "outerTouch",
      rawName: "v-outerTouch",
      value: (_vm.onOuterTouch),
      expression: "onOuterTouch"
    }],
    class: [_vm.className, {
      'is-disabled': _vm.disabled
    }],
    attrs: {
      "outer-touch-disabled": !_vm.visible
    }
  }, [_c('div', {
    class: [_vm.className + '-input', {
      'is-open': _vm.visible
    }],
    on: {
      "click": _vm.trigger
    }
  }, [_c('span', {
    class: _vm.className + '-text'
  }, [_vm._v(_vm._s(_vm.text))]), _vm._v(" "), _c('i', {
    class: _vm.className + '-icon'
  })]), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "slide-up"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.visible),
      expression: "visible"
    }],
    class: _vm.className + '-box'
  }, [_c('ol', {
    class: _vm.className + '-options'
  }, _vm._l((_vm.options), function(item, index) {
    return _c('li', {
      class: [_vm.className + '-item', {
        'is-selected': _vm.selected === index
      }],
      on: {
        "click": function($event) {
          _vm.select(item.value)
        }
      }
    }, [_vm._v("\n          " + _vm._s(item.text) + "\n        ")])
  }))])])], 1)
},staticRenderFns: []}

/***/ }),
/* 108 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_vm._t("default"), _vm._v(" "), (_vm.options) ? [_c('popup', {
    attrs: {
      "position": "right",
      "opacity": 0,
      "close-on-click-mask": false
    },
    model: {
      value: (_vm.visible),
      callback: function($$v) {
        _vm.visible = $$v
      },
      expression: "visible"
    }
  }, [_c('div', {
    staticClass: "u-crop"
  }, [_c('header', {
    staticClass: "u-crop__head"
  }, [_c('a', {
    staticClass: "u-crop__action s-zoomIn",
    attrs: {
      "title": "放大"
    },
    on: {
      "click": function($event) {
        _vm.cropper.zoom(true)
      }
    }
  }), _vm._v(" "), _c('a', {
    staticClass: "u-crop__action s-zoomOut",
    attrs: {
      "title": "缩小"
    },
    on: {
      "click": function($event) {
        _vm.cropper.zoom(false)
      }
    }
  }), _vm._v(" "), _c('a', {
    staticClass: "u-crop__action s-rotate",
    attrs: {
      "title": "旋转"
    },
    on: {
      "click": function($event) {
        _vm.cropper.rotate()
      }
    }
  })]), _vm._v(" "), _c('canvas', {
    ref: "canvas",
    staticClass: "u-crop__canvas"
  }), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.cropper.loading),
      expression: "cropper.loading"
    }],
    staticClass: "u-crop__loading"
  }, [_c('ul', {
    staticClass: "u-crop__spinner"
  }, [_c('li'), _vm._v(" "), _c('li'), _vm._v(" "), _c('li'), _vm._v(" "), _c('li'), _vm._v(" "), _c('li')])]), _vm._v(" "), _c('footer', {
    staticClass: "u-crop__foot"
  }, [_c('a', {
    staticClass: "u-crop__button",
    on: {
      "click": function($event) {
        _vm.visible = false
      }
    }
  }, [_vm._v("取消")]), _vm._v(" "), _c('a', {
    staticClass: "u-crop__button s-done",
    on: {
      "click": function($event) {
        _vm.cropImage()
      }
    }
  }, [_vm._v("确定")])])])])] : _vm._e()], 2)
},staticRenderFns: []}

/***/ }),
/* 109 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })
/******/ ]);