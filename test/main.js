var isServer = typeof exports !== "undefined";
if (isServer) {
    var HelloWorld = require("../build/hello-world-es5.js").HelloWorld;
    var should = require("should");
} else {

}


describe("Should do something", function() {
    it("Should say hello", function() {

    });

    after(function() {

    });
})