var http = require('http');
var url = require('url');
var fs = require('fs');
var queryString = require('querystring');
const dir = './singuliers';

let handleRequest = (request, response) => {
    var page = url.parse(request.url).pathname;
    var params = queryString.parse(url.parse(request.url).query);
    response.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'})
    if(page == '/captcha') {
        fs.readFile('./captcha.html', null, (error, data) => {
            if(error) {
                response.writeHead(400);
                response.write('Error. Not captcha.html file found');
            }
            else {

                response.write(data);
            }
            response.end();
        });

    }
    else if (page=="/getsingular") {
        fs.readdir(dir, (err, files) => {
            response.writeHead(200, {'Content-Type': 'image'});
            fs.readFile('./singuliers/' + files[Math.floor(Math.random() * files.length-1 +1)], null, (error,data) => {
                response.write(data);
                response.end();
            });
        });
    }
    else {
        fs.readFile('./' + page, null, (error, data) => {
            if (error) {
                response.writeHead(404);
                response.write('File not found');
            } else {
                response.write(data);
            }
            response.end();

        });
    }
};

http.createServer(handleRequest).listen(8080);