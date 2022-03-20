/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../jwt-decode/build/jwt-decode.esm.js":
/*!************************************************!*\
  !*** ../../jwt-decode/build/jwt-decode.esm.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InvalidTokenError": () => (/* binding */ n),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function e(e){this.message=e}e.prototype=new Error,e.prototype.name="InvalidCharacterError";var r="undefined"!=typeof window&&window.atob&&window.atob.bind(window)||function(r){var t=String(r).replace(/=+$/,"");if(t.length%4==1)throw new e("'atob' failed: The string to be decoded is not correctly encoded.");for(var n,o,a=0,i=0,c="";o=t.charAt(i++);~o&&(n=a%4?64*n+o:o,a++%4)?c+=String.fromCharCode(255&n>>(-2*a&6)):0)o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(o);return c};function t(e){var t=e.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:throw"Illegal base64url string!"}try{return function(e){return decodeURIComponent(r(e).replace(/(.)/g,(function(e,r){var t=r.charCodeAt(0).toString(16).toUpperCase();return t.length<2&&(t="0"+t),"%"+t})))}(t)}catch(e){return r(t)}}function n(e){this.message=e}function o(e,r){if("string"!=typeof e)throw new n("Invalid token specified");var o=!0===(r=r||{}).header?0:1;try{return JSON.parse(t(e.split(".")[o]))}catch(e){throw new n("Invalid token specified: "+e.message)}}n.prototype=new Error,n.prototype.name="InvalidTokenError";/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (o);
//# sourceMappingURL=jwt-decode.esm.js.map


/***/ }),

/***/ "../../../src/api/users/helpers/jwts.ts":
/*!**********************************************!*\
  !*** ../../../src/api/users/helpers/jwts.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "userInfo": () => (/* binding */ userInfo)
/* harmony export */ });
/* harmony import */ var jwt_decode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jwt-decode */ "../../jwt-decode/build/jwt-decode.esm.js");

const userInfo = (token = '') => {
    const decoded = (0,jwt_decode__WEBPACK_IMPORTED_MODULE_0__["default"])(token);
    const userInfo = {
        sub: decoded.sub,
        email: decoded.email,
        name: decoded.name,
        firstName: decoded.given_name,
        lastName: decoded.family_name,
        profilePic: decoded.picture
    };
    return userInfo;
};
// example token (Google login)
// {
//   "at_hash": "MwbBDivEenXxUhpZN0335w",
//   "sub": "bd22e766-b431-4464-a889-0bdab6f01439",
//   "cognito:groups": [
//     "us-west-2_4BQDdJ7hN_Google"
//   ],
//   "email_verified": false,
//   "iss": "https://cognito-idp.us-west-2.amazonaws.com/us-west-2_4BQDdJ7hN",
//   "cognito:username": "google_109844304513055947397",
//   "given_name": "Charis",
//   "picture": "https://lh3.googleusercontent.com/a/AATXAJzMNtWTVMOnB2-pbOI330YiMdmPhDgKOwpQpDWW=s96-c",
//   "aud": "c5vdjbs23cn99ba0g6eeepovg",
//   "identities": [
//     {
//       "userId": "109844304513055947397",
//       "providerName": "Google",
//       "providerType": "Google",
//       "issuer": null,
//       "primary": "true",
//       "dateCreated": "1644388231466"
//     }
//   ],
//   "token_use": "id",
//   "auth_time": 1647206435,
//   "name": "Charis Ginn",
//   "exp": 1647292835,
//   "iat": 1647206435,
//   "family_name": "Ginn",
//   "jti": "a0dec0ea-b272-4de7-9c47-854416c71f27",
//   "email": "alignbank@gmail.com"
// }


/***/ }),

/***/ "../../../src/middleware/midWrapper.ts":
/*!*********************************************!*\
  !*** ../../../src/middleware/midWrapper.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _middy_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @middy/core */ "../../@middy/core/index.js");
/* harmony import */ var _middy_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_middy_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _middy_input_output_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @middy/input-output-logger */ "../../@middy/input-output-logger/index.js");
/* harmony import */ var _middy_input_output_logger__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_middy_input_output_logger__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _middy_http_json_body_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @middy/http-json-body-parser */ "../../@middy/http-json-body-parser/index.js");
/* harmony import */ var _middy_http_json_body_parser__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_middy_http_json_body_parser__WEBPACK_IMPORTED_MODULE_2__);



/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(handler) {
    return _middy_core__WEBPACK_IMPORTED_MODULE_0___default()(handler)
        .use(_middy_input_output_logger__WEBPACK_IMPORTED_MODULE_1___default()())
        .use(_middy_http_json_body_parser__WEBPACK_IMPORTED_MODULE_2___default()());
}


/***/ }),

/***/ "aws-sdk":
/*!**************************!*\
  !*** external "aws-sdk" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("aws-sdk");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "../../@middy/core/index.js":
/*!**********************************!*\
  !*** ../../@middy/core/index.js ***!
  \**********************************/
/***/ ((module) => {



const middy = (baseHandler = () => {}, plugin) => {
  var _plugin$beforePrefetc;

  plugin === null || plugin === void 0 ? void 0 : (_plugin$beforePrefetc = plugin.beforePrefetch) === null || _plugin$beforePrefetc === void 0 ? void 0 : _plugin$beforePrefetc.call(plugin);
  const beforeMiddlewares = [];
  const afterMiddlewares = [];
  const onErrorMiddlewares = [];

  const instance = (event = {}, context = {}) => {
    var _plugin$requestStart;

    plugin === null || plugin === void 0 ? void 0 : (_plugin$requestStart = plugin.requestStart) === null || _plugin$requestStart === void 0 ? void 0 : _plugin$requestStart.call(plugin);
    const request = {
      event,
      context,
      response: undefined,
      error: undefined,
      internal: {}
    };
    return runRequest(request, [...beforeMiddlewares], baseHandler, [...afterMiddlewares], [...onErrorMiddlewares], plugin);
  };

  instance.use = middlewares => {
    if (Array.isArray(middlewares)) {
      for (const middleware of middlewares) {
        instance.applyMiddleware(middleware);
      }

      return instance;
    }

    return instance.applyMiddleware(middlewares);
  };

  instance.applyMiddleware = middleware => {
    const {
      before,
      after,
      onError
    } = middleware;

    if (!before && !after && !onError) {
      throw new Error('Middleware must be an object containing at least one key among "before", "after", "onError"');
    }

    if (before) instance.before(before);
    if (after) instance.after(after);
    if (onError) instance.onError(onError);
    return instance;
  }; // Inline Middlewares


  instance.before = beforeMiddleware => {
    beforeMiddlewares.push(beforeMiddleware);
    return instance;
  };

  instance.after = afterMiddleware => {
    afterMiddlewares.unshift(afterMiddleware);
    return instance;
  };

  instance.onError = onErrorMiddleware => {
    onErrorMiddlewares.push(onErrorMiddleware);
    return instance;
  };

  instance.__middlewares = {
    before: beforeMiddlewares,
    after: afterMiddlewares,
    onError: onErrorMiddlewares
  };
  return instance;
};

const runRequest = async (request, beforeMiddlewares, baseHandler, afterMiddlewares, onErrorMiddlewares, plugin) => {
  try {
    await runMiddlewares(request, beforeMiddlewares, plugin); // Check if before stack hasn't exit early

    if (request.response === undefined) {
      var _plugin$beforeHandler, _plugin$afterHandler;

      plugin === null || plugin === void 0 ? void 0 : (_plugin$beforeHandler = plugin.beforeHandler) === null || _plugin$beforeHandler === void 0 ? void 0 : _plugin$beforeHandler.call(plugin);
      request.response = await baseHandler(request.event, request.context);
      plugin === null || plugin === void 0 ? void 0 : (_plugin$afterHandler = plugin.afterHandler) === null || _plugin$afterHandler === void 0 ? void 0 : _plugin$afterHandler.call(plugin);
      await runMiddlewares(request, afterMiddlewares, plugin);
    }
  } catch (e) {
    // Reset response changes made by after stack before error thrown
    request.response = undefined;
    request.error = e;

    try {
      await runMiddlewares(request, onErrorMiddlewares, plugin);
    } catch (e) {
      // Save error that wasn't handled
      e.originalError = request.error;
      request.error = e;
      throw request.error;
    } // Catch if onError stack hasn't handled the error


    if (request.response === undefined) throw request.error;
  } finally {
    var _plugin$requestEnd;

    await (plugin === null || plugin === void 0 ? void 0 : (_plugin$requestEnd = plugin.requestEnd) === null || _plugin$requestEnd === void 0 ? void 0 : _plugin$requestEnd.call(plugin, request));
  }

  return request.response;
};

const runMiddlewares = async (request, middlewares, plugin) => {
  for (const nextMiddleware of middlewares) {
    var _plugin$beforeMiddlew, _plugin$afterMiddlewa;

    plugin === null || plugin === void 0 ? void 0 : (_plugin$beforeMiddlew = plugin.beforeMiddleware) === null || _plugin$beforeMiddlew === void 0 ? void 0 : _plugin$beforeMiddlew.call(plugin, nextMiddleware === null || nextMiddleware === void 0 ? void 0 : nextMiddleware.name);
    const res = await (nextMiddleware === null || nextMiddleware === void 0 ? void 0 : nextMiddleware(request));
    plugin === null || plugin === void 0 ? void 0 : (_plugin$afterMiddlewa = plugin.afterMiddleware) === null || _plugin$afterMiddlewa === void 0 ? void 0 : _plugin$afterMiddlewa.call(plugin, nextMiddleware === null || nextMiddleware === void 0 ? void 0 : nextMiddleware.name); // short circuit chaining and respond early

    if (res !== undefined) {
      request.response = res;
      return;
    }
  }
};

module.exports = middy;


/***/ }),

/***/ "../../@middy/http-json-body-parser/index.js":
/*!***************************************************!*\
  !*** ../../@middy/http-json-body-parser/index.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



const mimePattern = /^application\/(.+\+)?json(;.*)?$/;
const defaults = {
  reviver: undefined
};

const httpJsonBodyParserMiddleware = (opts = {}) => {
  const options = { ...defaults,
    ...opts
  };

  const httpJsonBodyParserMiddlewareBefore = async request => {
    var _headers$ContentType;

    const {
      headers,
      body
    } = request.event;
    const contentTypeHeader = (_headers$ContentType = headers === null || headers === void 0 ? void 0 : headers['Content-Type']) !== null && _headers$ContentType !== void 0 ? _headers$ContentType : headers === null || headers === void 0 ? void 0 : headers['content-type'];

    if (mimePattern.test(contentTypeHeader)) {
      try {
        const data = request.event.isBase64Encoded ? Buffer.from(body, 'base64').toString() : body;
        request.event.rawBody = body;
        request.event.body = JSON.parse(data, options.reviver);
      } catch (err) {
        const {
          createError
        } = __webpack_require__(/*! @middy/util */ "../../@middy/util/index.js"); // UnprocessableEntity


        throw createError(422, 'Content type defined as JSON but an invalid JSON was provided');
      }
    }
  };

  return {
    before: httpJsonBodyParserMiddlewareBefore
  };
};

module.exports = httpJsonBodyParserMiddleware;


/***/ }),

/***/ "../../@middy/input-output-logger/index.js":
/*!*************************************************!*\
  !*** ../../@middy/input-output-logger/index.js ***!
  \*************************************************/
/***/ ((module) => {



const defaults = {
  logger: data => console.log(JSON.stringify(data, null, 2)),
  awsContext: false,
  omitPaths: []
};

const inputOutputLoggerMiddleware = (opts = {}) => {
  let {
    logger,
    awsContext,
    omitPaths
  } = { ...defaults,
    ...opts
  };
  if (typeof logger !== 'function') logger = null;

  const omitAndLog = (param, request) => {
    const message = {
      [param]: request[param]
    };

    if (awsContext) {
      message.context = pick(request.context, awsContextKeys);
    }

    const redactedMessage = omit(JSON.parse(JSON.stringify(message)), omitPaths); // Full clone to prevent nested mutations

    logger(redactedMessage);
  };

  const inputOutputLoggerMiddlewareBefore = async request => omitAndLog('event', request);

  const inputOutputLoggerMiddlewareAfter = async request => omitAndLog('response', request);

  const inputOutputLoggerMiddlewareOnError = inputOutputLoggerMiddlewareAfter;
  return {
    before: logger ? inputOutputLoggerMiddlewareBefore : undefined,
    after: logger ? inputOutputLoggerMiddlewareAfter : undefined,
    onError: logger ? inputOutputLoggerMiddlewareOnError : undefined
  };
}; // https://docs.aws.amazon.com/lambda/latest/dg/nodejs-context.html


const awsContextKeys = ['functionName', 'functionVersion', 'invokedFunctionArn', 'memoryLimitInMB', 'awsRequestId', 'logGroupName', 'logStreamName', 'identity', 'clientContext', 'callbackWaitsForEmptyEventLoop']; // move to util, if ever used elsewhere

const pick = (originalObject = {}, keysToPick = []) => {
  const newObject = {};

  for (const path of keysToPick) {
    // only supports first level
    if (originalObject[path] !== undefined) {
      newObject[path] = originalObject[path];
    }
  }

  return newObject;
};

const omit = (originalObject = {}, keysToOmit = []) => {
  const clonedObject = { ...originalObject
  };

  for (const path of keysToOmit) {
    deleteKey(clonedObject, path);
  }

  return clonedObject;
};

const deleteKey = (obj, key) => {
  if (!Array.isArray(key)) key = key.split('.');
  const rootKey = key.shift();

  if (key.length && obj[rootKey]) {
    deleteKey(obj[rootKey], key);
  } else {
    delete obj[rootKey];
  }

  return obj;
};

module.exports = inputOutputLoggerMiddleware;


/***/ }),

/***/ "../../@middy/util/index.js":
/*!**********************************!*\
  !*** ../../@middy/util/index.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



const {
  Agent
} = __webpack_require__(/*! https */ "https"); // const { NodeHttpHandler } = require('@aws-sdk/node-http-handler') // aws-sdk v3


const awsClientDefaultOptions = {
  // AWS SDK v3
  // Docs: https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/enforcing-tls.html

  /* requestHandler: new NodeHttpHandler({
    httpsAgent: new Agent(
      {
        secureProtocol: 'TLSv1_2_method'
      }
    )
  }) */
  // Docs: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/enforcing-tls.html
  httpOptions: {
    agent: new Agent({
      secureProtocol: 'TLSv1_2_method'
    })
  }
};

const createPrefetchClient = options => {
  const awsClientOptions = { ...awsClientDefaultOptions,
    ...options.awsClientOptions
  };
  const client = new options.AwsClient(awsClientOptions); // AWS XRay

  if (options.awsClientCapture) {
    return options.awsClientCapture(client);
  }

  return client;
};

const createClient = async (options, request) => {
  let awsClientCredentials = {}; // Role Credentials

  if (options.awsClientAssumeRole) {
    if (!request) throw new Error('Request required when assuming role');
    awsClientCredentials = await getInternal({
      credentials: options.awsClientAssumeRole
    }, request);
  }

  awsClientCredentials = { ...awsClientCredentials,
    ...options.awsClientOptions
  };
  return createPrefetchClient({ ...options,
    awsClientOptions: awsClientCredentials
  });
};

const canPrefetch = options => {
  return !(options !== null && options !== void 0 && options.awsClientAssumeRole) && !(options !== null && options !== void 0 && options.disablePrefetch);
}; // Internal Context


const getInternal = async (variables, request) => {
  if (!variables || !request) return {};
  let keys = [];
  let values = [];

  if (variables === true) {
    keys = values = Object.keys(request.internal);
  } else if (typeof variables === 'string') {
    keys = values = [variables];
  } else if (Array.isArray(variables)) {
    keys = values = variables;
  } else if (typeof variables === 'object') {
    keys = Object.keys(variables);
    values = Object.values(variables);
  }

  const promises = [];

  for (const internalKey of values) {
    var _valuePromise;

    // 'internal.key.sub_value' -> { [key]: internal.key.sub_value }
    const pathOptionKey = internalKey.split('.');
    const rootOptionKey = pathOptionKey.shift();
    let valuePromise = request.internal[rootOptionKey];

    if (typeof ((_valuePromise = valuePromise) === null || _valuePromise === void 0 ? void 0 : _valuePromise.then) !== 'function') {
      valuePromise = Promise.resolve(valuePromise);
    }

    promises.push(valuePromise.then(value => pathOptionKey.reduce((p, c) => p === null || p === void 0 ? void 0 : p[c], value)));
  } // ensure promise has resolved by the time it's needed
  // If one of the promises throws it will bubble up to @middy/core


  values = await Promise.allSettled(promises);
  const errors = values.filter(res => res.status === 'rejected').map(res => res.reason.message);
  if (errors.length) throw new Error(JSON.stringify(errors));
  return keys.reduce((obj, key, index) => ({ ...obj,
    [sanitizeKey(key)]: values[index].value
  }), {});
};

const sanitizeKeyPrefixLeadingNumber = /^([0-9])/;
const sanitizeKeyRemoveDisallowedChar = /[^a-zA-Z0-9]+/g;

const sanitizeKey = key => {
  return key.replace(sanitizeKeyPrefixLeadingNumber, '_$1').replace(sanitizeKeyRemoveDisallowedChar, '_');
}; // fetch Cache


const cache = {}; // key: { value:{fetchKey:Promise}, expiry }

const processCache = (options, fetch = () => undefined, request) => {
  const {
    cacheExpiry,
    cacheKey
  } = options;

  if (cacheExpiry) {
    const cached = getCache(cacheKey);
    const unexpired = cached && (cacheExpiry < 0 || cached.expiry > Date.now());

    if (unexpired && cached.modified) {
      const value = fetch(request, cached.value);
      cache[cacheKey] = {
        value: { ...cached.value,
          ...value
        },
        expiry: cached.expiry
      };
      return cache[cacheKey];
    }

    if (unexpired) {
      return { ...cached,
        cache: true
      };
    }
  }

  const value = fetch(request);
  const expiry = Date.now() + cacheExpiry;

  if (cacheExpiry) {
    cache[cacheKey] = {
      value,
      expiry
    };
  }

  return {
    value,
    expiry
  };
};

const getCache = key => {
  return cache[key];
}; // Used to remove parts of a cache


const modifyCache = (cacheKey, value) => {
  if (!cache[cacheKey]) return;
  cache[cacheKey] = { ...cache[cacheKey],
    value,
    modified: true
  };
};

const clearCache = (keys = null) => {
  var _keys;

  keys = (_keys = keys) !== null && _keys !== void 0 ? _keys : Object.keys(cache);
  if (!Array.isArray(keys)) keys = [keys];

  for (const cacheKey of keys) {
    cache[cacheKey] = undefined;
  }
};

const jsonSafeParse = (string, reviver) => {
  if (typeof string !== 'string') return string;
  const firstChar = string[0];
  if (firstChar !== '{' && firstChar !== '[' && firstChar !== '"') return string;

  try {
    return JSON.parse(string, reviver);
  } catch (e) {}

  return string;
};

const normalizeHttpResponse = response => {
  var _response$headers, _response;

  // May require updating to catch other types
  if (response === undefined) {
    response = {};
  } else if (Array.isArray(response) || typeof response !== 'object' || response === null) {
    response = {
      body: response
    };
  }

  response.headers = (_response$headers = (_response = response) === null || _response === void 0 ? void 0 : _response.headers) !== null && _response$headers !== void 0 ? _response$headers : {};
  return response;
}; // smaller version of `http-errors`


const statuses = __webpack_require__(/*! ./codes.json */ "../../@middy/util/codes.json");

const {
  inherits
} = __webpack_require__(/*! util */ "util");

const createErrorRegexp = /[^a-zA-Z]/g;

const createError = (code, message, properties = {}) => {
  const name = statuses[code].replace(createErrorRegexp, '');
  const className = name.substr(-5) !== 'Error' ? name + 'Error' : name;

  function HttpError(message) {
    // create the error object
    const msg = message !== null && message !== void 0 ? message : statuses[code];
    const err = new Error(msg); // capture a stack trace to the construction point

    Error.captureStackTrace(err, HttpError); // adjust the [[Prototype]]

    Object.setPrototypeOf(err, HttpError.prototype); // redefine the error message

    Object.defineProperty(err, 'message', {
      enumerable: true,
      configurable: true,
      value: msg,
      writable: true
    }); // redefine the error name

    Object.defineProperty(err, 'name', {
      enumerable: false,
      configurable: true,
      value: className,
      writable: true
    });
    return err;
  }

  inherits(HttpError, Error);
  const desc = Object.getOwnPropertyDescriptor(HttpError, 'name');
  desc.value = className;
  Object.defineProperty(HttpError, 'name', desc);
  Object.assign(HttpError.prototype, {
    status: code,
    statusCode: code,
    expose: code < 500
  }, properties);
  return new HttpError(message);
};

module.exports = {
  createPrefetchClient,
  createClient,
  canPrefetch,
  getInternal,
  sanitizeKey,
  processCache,
  getCache,
  modifyCache,
  clearCache,
  jsonSafeParse,
  normalizeHttpResponse,
  createError
};


/***/ }),

/***/ "../../@middy/util/codes.json":
/*!************************************!*\
  !*** ../../@middy/util/codes.json ***!
  \************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"100":"Continue","101":"Switching Protocols","102":"Processing","103":"Early Hints","200":"OK","201":"Created","202":"Accepted","203":"Non-Authoritative Information","204":"No Content","205":"Reset Content","206":"Partial Content","207":"Multi-Status","208":"Already Reported","226":"IM Used","300":"Multiple Choices","301":"Moved Permanently","302":"Found","303":"See Other","304":"Not Modified","305":"Use Proxy","306":"(Unused)","307":"Temporary Redirect","308":"Permanent Redirect","400":"Bad Request","401":"Unauthorized","402":"Payment Required","403":"Forbidden","404":"Not Found","405":"Method Not Allowed","406":"Not Acceptable","407":"Proxy Authentication Required","408":"Request Timeout","409":"Conflict","410":"Gone","411":"Length Required","412":"Precondition Failed","413":"Payload Too Large","414":"URI Too Long","415":"Unsupported Media Type","416":"Range Not Satisfiable","417":"Expectation Failed","418":"I\'m a teapot","421":"Misdirected Request","422":"Unprocessable Entity","423":"Locked","424":"Failed Dependency","425":"Unordered Collection","426":"Upgrade Required","428":"Precondition Required","429":"Too Many Requests","431":"Request Header Fields Too Large","451":"Unavailable For Legal Reasons","500":"Internal Server Error","501":"Not Implemented","502":"Bad Gateway","503":"Service Unavailable","504":"Gateway Timeout","505":"HTTP Version Not Supported","506":"Variant Also Negotiates","507":"Insufficient Storage","508":"Loop Detected","509":"Bandwidth Limit Exceeded","510":"Not Extended","511":"Network Authentication Required"}');

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!****************************************!*\
  !*** ../../../src/api/users/create.ts ***!
  \****************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "handler": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aws-sdk */ "aws-sdk");
/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(aws_sdk__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _helpers_jwts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/jwts */ "../../../src/api/users/helpers/jwts.ts");
/* harmony import */ var _middleware_midWrapper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../middleware/midWrapper */ "../../../src/middleware/midWrapper.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



aws_sdk__WEBPACK_IMPORTED_MODULE_0__.config.update({ region: 'us-west-2' });
const rawHandler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = _helpers_jwts__WEBPACK_IMPORTED_MODULE_1__.userInfo(event.headers.Authorization);
    const userParams = JSON.parse(event.body || '{}');
    const id = userParams.userId || userInfo.sub;
    const { bio, employerMode, email, firstName, lastName, profilePic, socials, starredPostings, username } = userParams;
    // validate userParams
    const params = {
        TableName: 'users',
        Item: {
            userId: id,
            bio,
            employerMode,
            email,
            firstName,
            lastName,
            profilePic,
            socials,
            starredPostings,
            username
        },
        ReturnValues: 'ALL_NEW'
    };
    let resBody;
    const dynamo = new aws_sdk__WEBPACK_IMPORTED_MODULE_0__.DynamoDB.DocumentClient();
    yield dynamo.put(params, function (err, data) {
        if (err)
            console.log(err);
        else {
            console.log(data);
            resBody = data;
        }
    });
    // try {
    //   resBody = await dynamo.put(params).promise();
    //   console.log(resBody);
    // } catch (err) {
    //   resBody = err;
    //   console.log(err);
    // }
    return {
        statusCode: 200,
        body: JSON.stringify(resBody)
    };
});
const handler = (0,_middleware_midWrapper__WEBPACK_IMPORTED_MODULE_2__["default"])(rawHandler);

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=create.js.map