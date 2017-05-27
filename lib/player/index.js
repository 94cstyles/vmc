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
var Component = __webpack_require__(6)(
  /* script */
  __webpack_require__(1),
  /* template */
  __webpack_require__(7),
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

var _iphoneInlineVideo = __webpack_require__(5);

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
/* 2 */
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

var _index = __webpack_require__(0);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */
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
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_intervalometer__ = __webpack_require__(4);
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
/* 6 */
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
/* 7 */
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

/***/ })
/******/ ]);