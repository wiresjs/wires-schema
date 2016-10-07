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
const external = (p) => {
    return express.static(`${appRoot.path}/node_modules/${p}`)
}
app.use("/build", express.static(`${appRoot.path}/build/`));
app.use("/lib/universal-dom", external('universal-dom/dist/universal'));
app.use("/lib/wires-html-parser", external('wires-html-parser/dist/universal'));
app.use("/lib/async-watch", external("async-watch/dist/"));
app.use("/lib/extract-vars", external("extract-vars/dist/"));
app.use("/lib/wires-angular-expressions", external("wires-angular-expressions/src/"));

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