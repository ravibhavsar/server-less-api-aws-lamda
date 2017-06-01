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
                    //console.log(result.split('?'));
                    this.baseSignedUrl = result.split('?');
                });

                var expectedBaseSignedUrl = 'https://s3.amazonaws.com/team.smart.imagine/abc';
                //expect(this.baseSignedUrl[0]).toBe(expectedBaseSignedUrl);

        });

                it("return signed url11", function() {
                                    var AWS = require('aws-sdk');
                var s3 = new AWS.S3({ useAccelerateEndpoint: true, signatureVersion: 'v4' });
                    var objectName = 'abc';
                    var fileName = (Math.floor(Math.random() * (1000000000 - 100 + 1)) + 100) +'.jpeg';
                    console.log(fileName);
                    var params = {
                        Bucket: "team.smart.imagine",
                        Key: 'in/'+ objectName +'/'+ fileName,
                        ContentType: 'jpeg',
                        ACL: 'public-read'
                    };
                    
                    var respone =  new Promise(function(resolve, reject) {
                        s3.getSignedUrl("putObject", params, function(error, url) {
                            if (error) {
                                reject(error);
                            } else {
                                resolve ({
                                    signedUrl: url,
                                });
                            }
                        });
                    });

                    console.log(respone);

        });

});