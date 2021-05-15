"use strict";
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
exports.__esModule = true;
// Import required AWS SDK clients and commands for Node.js
var express = require("express");
var app = express();
var port = 8080;
app.use(express.static(__dirname + '/public'));
var _a = require("@aws-sdk/client-dynamodb"), DynamoDBClient = _a.DynamoDBClient, QueryCommand = _a.QueryCommand;
// Set the AWS Region
var REGION = "eu-west-1"; //e.g. "us-east-1"
// Set the parameters
var params = {
    KeyConditionExpression: "Season = :s and Episode > :e",
    FilterExpression: "contains (Subtitle, :topic)",
    ExpressionAttributeValues: {
        ":s": { N: "1" },
        ":e": { N: "2" },
        ":topic": { S: "SubTitle" }
    },
    ProjectionExpression: "Episode, Title, Subtitle",
    TableName: "EPISODES_TABLE"
};
// Create DynamoDB service object
var dbclient = new DynamoDBClient({ region: REGION });
var Title_Array = [];
var run = function () { return __awaiter(void 0, void 0, void 0, function () {
    var results, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, dbclient.send(new QueryCommand(params))];
            case 1:
                results = _a.sent();
                results.Items.forEach(function (element, index, array) {
                    console.log(element.Title.S + " (" + element.Subtitle.S + ")");
                    Title_Array.push(element.Title.S);
                });
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                console.error(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var intervalId = setInterval(function () {
    run();
}, 5000);
app.get("/", function (req, res) {
    res.send("<html>\n  <header>\n      <title>DEEC IoT CoAP Test Server v1.0</title>\n  </header>\n  <body>\n      <img src=\"/images/images\">\n      <p style=\"border:1px solid black; \"id=\"teste\">" + Title_Array.toString() + "</p>\n     </div>\n  </body>\n</html>\n\n<script>\n  var intervalId = setInterval(function(){\n    location.reload();\n  }, 5000);\n</script>\n");
});
app.listen(port, function () {
    console.log("server started a http://localhost:" + port + ".");
});
