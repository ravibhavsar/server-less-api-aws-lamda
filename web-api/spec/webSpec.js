describe("web Server", function() {
        it("return signed url", function() {
                var AWS = require('aws-sdk');
                var s3 = new AWS.S3({ useAccelerateEndpoint: true, signatureVersion: 'v4' });

                var params = {
                    Bucket: "team.smart.imagine",
                    Key: 'abc',
                    ContentType: 'jpeg',
                    ACL: 'public-read'
                };

                var signedUrl = new Promise(function(resolve, reject) {
                    s3.getSignedUrl("putObject", params, function(error, url) {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(url);
                        }
                    });
                });

                var baseSignedUrl;
                signedUrl.then(function(result) {
                    console.log(result.split('?'));
                    this.baseSignedUrl = result.split('?');
                });

                var expectedBaseSignedUrl = 'https://s3.amazonaws.com/team.smart.imagine/abc';
                expect(this.baseSignedUrl[0]).toBe(expectedBaseSignedUrl);

        });
});