var http = require('http'), port = 8080;

http.createServer(function (req, res) {
    var Mng;
    try {
        Mng = 'Mongo INFO:\nUser:' + process.env.MONGODB_USER + '\nPassword:' + process.env.MONGODB_PASSWORD + '\nDataBase:' + process.env.MONGODB_DATABASE;
    } catch(e) { Mng = e.message; }
    console.log(Mng);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(Mng);
}).listen(port);

console.log(`Running at ${port}`);