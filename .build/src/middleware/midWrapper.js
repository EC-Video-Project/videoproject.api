var middy = require('@middy/core');
var inputOutputLogger = require('@middy/input-output-logger');
var httpJsonBodyParser = require('@middy/http-json-body-parser');
module.exports = function (handler) {
    return middy(handler)
        .use(inputOutputLogger())
        .use(httpJsonBodyParser());
};
//# sourceMappingURL=midWrapper.js.map