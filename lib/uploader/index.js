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
  __webpack_require__(15)
}
var Component = __webpack_require__(16)(
  /* script */
  __webpack_require__(1),
  /* template */
  __webpack_require__(17),
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

var _picker = __webpack_require__(4);

var _picker2 = _interopRequireDefault(_picker);

var _cropper = __webpack_require__(3);

var _cropper2 = _interopRequireDefault(_cropper);

var _guid = __webpack_require__(9);

var _guid2 = _interopRequireDefault(_guid);

var _storage = __webpack_require__(12);

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
/* 2 */
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

var _uploader = __webpack_require__(0);

var _uploader2 = _interopRequireDefault(_uploader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _supportOnlyTouch = __webpack_require__(13);

var _supportOnlyTouch2 = _interopRequireDefault(_supportOnlyTouch);

var _DOMEvent = __webpack_require__(5);

var _DOMEvent2 = _interopRequireDefault(_DOMEvent);

var _dataURItoBlob = __webpack_require__(7);

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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _noop = __webpack_require__(10);

var _noop2 = _interopRequireDefault(_noop);

var _fileType = __webpack_require__(8);

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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _supportPassive = __webpack_require__(14);

var _supportPassive2 = _interopRequireDefault(_supportPassive);

var _css = __webpack_require__(6);

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
/* 6 */
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

var _prefix = __webpack_require__(11);

var _prefix2 = _interopRequireDefault(_prefix);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 7 */
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
/* 8 */
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
/* 9 */
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function () {};

/***/ }),
/* 11 */
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
/* 12 */
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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var SUPPORT_ONLY_TOUCH = 'ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch;exports.default = SUPPORT_ONLY_TOUCH;

/***/ }),
/* 14 */
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
/* 15 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 16 */
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
/* 17 */
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

/***/ })
/******/ ]);