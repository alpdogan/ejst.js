var fs = require("fs");

class Settings{

    constructor(file){
        this.file = file;
    }

    init(){
        var data = fs.readFileSync(this.file);
        var settings = JSON.parse(data);
        this.props = settings;
        this.props.applicationUrl = `http://${settings.host}:${settings.port}`;
        return this.props;
    }

}

module.exports = Settings;