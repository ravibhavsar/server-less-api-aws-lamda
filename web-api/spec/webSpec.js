describe("web Server", function() {
        it("return signed url", function() {
                var AWS = require('aws-sdk');
                var s3 = new AWS.S3({ useAccelerateEndpoint: true, signatureVersion: 'v4' });
                    var objectName = 'abc';
                    var fileName = 'test.jpeg';
                    console.log(fileName);
                    var params = {
                        Bucket: "team.smart.imagine",
                        Key: 'in/'+ objectName +'/'+ fileName,
                        ContentType: 'jpeg',
                        ACL: 'public-read'
                    };
                    
                    var signedUrl = null;
                    s3.getSignedUrl("putObject", params, function(error, url) {
                                    if (error) {
                                        reject(error);
                                    } else {
                                        signedUrl = url;
                                    }
                    });
                    
                    var baseSignedUrl= (signedUrl.split('?'))[0];
                    var expectedBaseSignedUrl = 'https://s3.amazonaws.com/team.smart.imagine/in/abc/test.jpeg';
                    expect(expectedBaseSignedUrl).toBe(baseSignedUrl);

        });

});