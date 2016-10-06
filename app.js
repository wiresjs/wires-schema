const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const appRoot = require("app-root-path");
const fs = require("fs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


const WiresSchema = require(__dirname + "/build/wires-schema.js")


app.use(cookieParser('your secret here'));

app.use("/build", express.static(`${appRoot.path}/build/`));
app.use("/lib/universal-dom", express.static(`${appRoot.path}/node_modules/universal-dom/dist/universal`));
app.use("/lib/wires-html-parser", express.static(`${appRoot.path}/node_modules/wires-html-parser/dist/universal`));


app.get("/", (req, res) => {
    let contents = fs.readFileSync(`${appRoot.path}/index.html`).toString();
    res.send(contents);
})

// kick in sample app
WiresSchema.SampleApp();

var appPort = process.env.PORT || 4000;
var server = app.listen(appPort, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.info('Admin app listening on http://localhost:%s', appPort);
});