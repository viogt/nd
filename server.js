var http = require('http');

http.createServer(function (req, res) {
    var Mng;
    try {
        Mng = 'Mongo INFO:\nUser:' + process.env.MONGODB_USER + '\nPassword:' + process.env.MONGODB_PASSWORD + '\nDataBase:' + process.env.MONGODB_DATABASE;
    } catch(e) { Mng = e.message; }
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(Mng);
}).listen(8080, '0.0.0.0');
