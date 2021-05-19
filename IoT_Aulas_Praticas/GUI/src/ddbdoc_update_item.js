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
https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/dynamodb-example-document-client.html.

Purpose:
ddbdoc_update_item.js demonstrates how to use the Amazon DynamoDB document client to create or update an item in an Amazon DynamoDB table.

Inputs (replace in code):
- TABLE_NAME
- REGION
- primaryKey - Name of the primary key. For example, "id".
- VALUE_1
- sortKey - Name of the sor key. For example, "firstName".
- VALUE_2
- NEW_ATTRIBUTE_VALUE_1
- NEW_ATTRIBUTE_VALUE_2

Running the code:
ts-node ddbdoc_update_item.js
*/
// snippet-start:[dynamodb.JavaScript.docClient.updateV3]
var UpdateCommand = require("@aws-sdk/lib-dynamodb");
var ddbDocClient = require("./libs/ddbDocClient.js");
// Set the parameters
var params = {
    TableName: "TABLE_NAME",
    /*
    Convert the attribute JavaScript object you are updating to the required
    Amazon  DynamoDB record. The format of values specifies the datatype. The
    following list demonstrates different datatype formatting requirements:
    String: "String",
    NumAttribute: 1,
    BoolAttribute: true,
    ListAttribute: [1, "two", false],
    MapAttribute: { foo: "bar" },
    NullAttribute: null
     */
    Key: {
        primaryKey: "VALUE_1",
        sortKey: "VALUE_2"
    },
    // Define expressions for the new or updated attributes
    UpdateExpression: "set ATTRIBUTE_NAME_1 = :t, ATTRIBUTE_NAME_2 = :s",
    ExpressionAttributeValues: {
        ":t": "NEW_ATTRIBUTE_VALUE_1",
        ":s": "NEW_ATTRIBUTE_VALUE_2"
    }
};
var run = function () { return __awaiter(_this, void 0, void 0, function () {
    var data, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, ddbDocClient.send(new UpdateCommand(params))];
            case 1:
                data = _a.sent();
                console.log("Success - item added or updated", data);
                return [2 /*return*/, data];
            case 2:
                err_1 = _a.sent();
                console.log("Error", err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
run();
// snippet-end:[dynamodb.JavaScript.docClient.updateV3]
// For unit tests only.
// module.exports ={run, params};
