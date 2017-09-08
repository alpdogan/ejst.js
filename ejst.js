var express = require("express");
var fs = require("fs");


var Settings = require("./src/settings.js");
var Export = require("./src/export.js");

var settings = new Settings("./settings.json").init();


var app = express();
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.get("/", (req, resp)=> {
    resp.send("ejs-template");
})

app.get("/export", (req, resp) => {
    var exporter = new Export(settings);
    exporter.exportFiles(()=>{
        resp.send("output dir: " + settings.outputPath);
    });
});



settings.pages.forEach(function(page) {
    app.get(page.url, function(req, resp) {
        render(req, resp, page);
    });
}, this);

function render(request, response, page) {
    response.render(page.view);
}

app.listen(settings.port, "localhost", ()=>{
    console.log("server started");
});


