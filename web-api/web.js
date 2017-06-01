/*global require, module*/
var ApiBuilder = require('claudia-api-builder'),
	api = new ApiBuilder(),
	fs = require('fs'),
	superb = require('superb'),
	AWS = require('aws-sdk'),
	denodeify = require('denodeify');
module.exports = api;

var s3 = new AWS.S3({ useAccelerateEndpoint: true, signatureVersion: 'v4' });

// just return the result value for synchronous processing
api.get('/hello', function () {
	'use strict';
	return 'hello1 world';
});

// pass some arguments using the query string or headers to this
// method and see that they're all in the request object
api.get('/echo', function (request) {
	'use strict';
	return request;
});

// use request.queryString for query arguments
api.get('/greet', function (request) {
	'use strict';
	return request.queryString.name + ' is ' + superb();
});

// use {} for dynamic path parameters
api.get('/people/{name}', function (request) {
	'use strict';
	return request.pathParams.name + ' is ' + superb();
});

// Return a promise for async processing
api.get('/packagejson', function () {
	'use strict';
	var read = denodeify(fs.readFile);
	return read('./package.json')
		.then(JSON.parse)
		.then(function (val) {
			return val;
		});
});

// use .post to handle a post; or .delete, .patch, .head, .put
api.post('/echo', function (request) {
	'use strict';
	return request;
});




/** Return Signed Url */
api.get('/sign-url', function(request) {
    var objectName = request.queryString.objectName;
	var params = {
        Bucket: "team.smart.imagine",
        Key: 'in/'+ objectName +'/'+ (Math.floor(Math.random() * (1000000000 - 100 + 1)) + 100) +'.jpeg',
        ContentType: 'jpeg',
        ACL: 'public-read'
    };

	return new Promise(function(resolve, reject) {
        s3.getSignedUrl("putObject", params, function(error, url) {
            if (error) {
                reject(error);
            } else {
                console.log(url);
                resolve(url);
            }
        });
    });
});
