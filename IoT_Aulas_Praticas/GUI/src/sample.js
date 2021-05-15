var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
/* Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0

ABOUT THIS NODE.JS EXAMPLE: This example works with AWS SDK for JavaScript version 3 (v3),
which is available at https://github.com/aws/aws-sdk-js-v3. This example is in the 'AWS SDK for JavaScript v3 Developer Guide' at
https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started-nodejs.html.

Purpose:
sample.ts demonstrates how to get started using node.js with the AWS SDK for JavaScript.

Inputs (replace in code):
 - REGION
 - BUCKET_NAME
 - KEY
 - BODY

Running the code:
node sample.js
*/
// snippet-start:[GettingStarted.JavaScript.NodeJS.sampleV3]
// Import required AWS SDK clients and commands for Node.js.
var _a = require("@aws-sdk/client-s3"), S3Client = _a.S3Client, PutObjectCommand = _a.PutObjectCommand, CreateBucketCommand = _a.CreateBucketCommand;
// Set the AWS region
var REGION = "REGION"; // The AWS Region. For example, "us-east-1".
// Set the parameters
var params = {
    Bucket: "BUCKET_NAME",
    Key: "KEY",
    Body: "BODY" // The content of the object. For example, 'Hello world!".
};
// Create an Amazon Simple Storage Solutiou (Amazon S3) client service object.
var s3Client = new S3Client({ region: REGION });
var run = function () { return __awaiter(_this, void 0, void 0, function () {
    var data, err_1, results, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, s3Client.send(new CreateBucketCommand({ Bucket: params.Bucket }))];
            case 1:
                data = _a.sent();
                console.log(data);
                console.log("Successfully created a bucket called ", data.BucketName);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                console.log("Error", err_1);
                return [3 /*break*/, 3];
            case 3:
                _a.trys.push([3, 5, , 6]);
                return [4 /*yield*/, s3Client.send(new PutObjectCommand(params))];
            case 4:
                results = _a.sent();
                console.log("Successfully created " + params.Key + " and uploaded it to " + params.Bucket + "/" + params.Key);
                return [3 /*break*/, 6];
            case 5:
                err_2 = _a.sent();
                console.log("Error", err_2);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
run();
// snippet-end:[GettingStarted.JavaScript.NodeJS.sampleV3]
