var http = require('http')
var sys = require('sys')
var urlparser = require("url")

function BaseCrawler() 
{    
    var self = this
    
    self.get_urls = function (url, html)
    {                
        //TODO use jquery to get A tags: 
        //    ~$ npm install jquery
        
        return html.match(/<a[^>]+href=["']http:\/\/[^\s"']+/ig);         
    }

    self._get_data = function (url) {
        
        var request = {
            host: url,
            port: 80,
            path: '/'
        }
        
        sys.log(url)
        
        data = ""
        
        http.get(request, function (response) {
            
            response.on('data', function(chunk) {
                data += chunk                
            })
            
            response.on("end", function() {
                urls = self.get_urls(url, data)
                sys.log(urls)
            })
        })
    }
    
    self.start = function() {
        
        for (i in this.start_urls)
        {
            self._get_data(this.start_urls[i])
        }
    }
}

function UserCrawler() 
{
    var self = this
    
    self.start_urls = ["www.google.com"]
    self.max_depth = 1
}

UserCrawler.prototype = new BaseCrawler()
crawler = new UserCrawler()

crawler.start()
