
const http = require('http').createServer((req, res) => {
        //if(req.method == 'GET' && req.url == '/')
        serveFile(__dirname + '/chat.html', res);
        }),
    fs = require('fs'),
    io = require('socket.io')(http);

function serveFile(fl, resp){
    resp.setHeader("Content-Type", "text/html; charset=utf-8");
    try {
        var file = fs.createReadStream(fl);
        file.pipe(resp);
    } catch(e) { console.log("Fale: " + fl + " - " + e.message); }
}

var NAMES = [];
function assignNew(name) {
    for(let nm of NAMES) if(nm == name) return false;
    NAMES.push(name);
    return true;
}
var CLR = ["red", "blue", "darkgreen", "purple", "orange"];
function usrColor(name) {
    for(var i in NAMES) if(NAMES[i]==name) return CLR[i % CLR.length];
    return "orange";
}

io.sockets.on('connection', socket => {
    socket.on('username', username => {
        socket.username = username;
        if(assignNew(username))
            io.emit('is_online', {username: username, cmt: usrColor(username)});
        else
            io.emit('is_online', {username: socket.username, cmt: 'exists'});
    });

    socket.on('disconnect', username => {
        io.emit('is_online', {username: socket.username, cmt: 'disconnect'});
    })

    socket.on('chat_message', message => {
        io.emit('chat_message', {usr:socket.username, msg:message, clr: usrColor(socket.username)});
    });

});

const server = http.listen(8080, () => {
    console.log('> listening on *:8080');
});
