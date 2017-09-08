var fs = require("fs");
var request = require("request");
var fse = require("fs-extra");

class Export {
    constructor(settings){
        this.settings = settings;
    }
    exportFiles(callback){
        var self = this;
        self.createOutputDir();
        this.settings.pages.forEach(function(page) {
            self.createDirectories(page.url);
            self.saveUrl(page.url);
        
        }, this);
        self.copyAssets();
        callback();
    }

    createOutputDir(){
        if(fs.existsSync(this.settings.outputPath)){
            fse.removeSync(this.settings.outputPath);        
        }
        fs.mkdirSync(this.settings.outputPath)
    }
    
    createDirectories(url){
        if(url.split('/').length - 1 > 1)
		{
			var dSplit =  url.split('/');
			var dPAth = '';
			for(var di in dSplit)
			{
				var dUrl = dSplit[di];
				if(dUrl == '' || dUrl.includes(".")) continue;
				dPAth += "/" + dUrl;

                var oDir = `${outputPath}/${dPath}`;

                fs.exists(oDir, (exists) => {
                    if(!exists)
                        fs.mkdir(oDir, (err) => {
                            if(err)
                                throw err;
                        })
                });
			}
		}
    }

    saveUrl(url){
        let _url = this.settings.applicationUrl + url;
        var self = this;
        request(_url, function(error, response, html){
	        if(!error){
    			var fileName = response.request.uri.path.replace('/','');
	        	fs.writeFile(self.settings.outputPath + '/' + fileName, html, function(err) {
				    if(err) {
                        console.error(err);
                        throw err;
				    }

				    var msg = `${response.request.uri.href} saved to ${fileName}`;
	        		console.log(msg);
				}); 
	        }
    	});
    }

    copyAssets(){
        fse.copy(`${this.settings.publicPath}/_assets`, this.settings.outputPath + "/_assets" , function (err) {
            if (err) {
                console.error(err);
                throw err;
            }
        });
    }


}

module.exports = Export;