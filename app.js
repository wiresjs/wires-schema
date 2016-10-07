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

app.use(cookieParser('your secret here'));

app.use("/build", express.static(`${appRoot.path}/build/`));
app.use("/lib/universal-dom", express.static(`${appRoot.path}/node_modules/universal-dom/dist/universal`));
app.use("/lib/wires-html-parser", express.static(`${appRoot.path}/node_modules/wires-html-parser/dist/universal`));

const WiresSchema = require(__dirname + "/build/wires-schema.js")
    // kick in sample app
const schema = WiresSchema.SampleApp();
schema.whenReady(schema => {

    app.use("/lib/schema.js", schema.expressSchema())

    app.get("/", (req, res) => {
        var context = schema.getRootContext();
        schema.trigger((inflation) => {
            let rootSelector = inflation.getRootSelector();
            let contents = fs.readFileSync(`${appRoot.path}/index.html`).toString();
            contents = contents.replace("$SSR", rootSelector.getHTML())
            res.send(contents);
        });
    });

    var appPort = process.env.PORT || 4000;
    var server = app.listen(appPort, function() {
        var host = server.address().address;
        var port = server.address().port;
        console.info('Admin app listening on http://localhost:%s', appPort);
    });
})