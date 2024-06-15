const http = require('http')
const fs = require('fs')
const url = require('url')

function myHandler(req,res){
    if(req.url === "/favicon.ico")  return res.end();

    const now = new Date();
    const formattedTime = now.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false // Use 24-hour format
    });

    const Loginfo = `${formattedTime}: `;
    console.log(Loginfo);

    const urlParse = url.parse(req.url, true); 

    fs.appendFile("./userLog.txt", Loginfo +  req.url + '\n' , (error) => {
        if (error) {
            console.log("Unable to write");
        }
        else {
            console.log("Loginfo appended to file");
        }
    }) 



    if (urlParse.pathname === '/') {
        res.end("Hello, I am on Home Page");
    } else if (urlParse.pathname === '/user') {
        const userName = urlParse.query.username;
        res.end(`Hello ${userName}, I am on User Page`);
        
    } else if (urlParse.pathname === '/search') {
        const search = urlParse.query.search;
        res.end(`Hello your result are : ${search}, I am on User Page`);
        
    } else {
        res.end("Error 404");
    }

}


const myServer = http.createServer(myHandler)


myServer.listen(8000, () =>
    console.log("Server has been started !")
)
