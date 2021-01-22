var http = require("http");
var fs = require("fs");
const port = 3000;
const host = "localhost";
var configJsonArray =[];
const handlerInstance={};
var handle =[];

init();
function init(){
  readJsonFile();
  }

function readJsonFile() {
  fs.readFile("config.json", "UTF-8", (err, json) => {
    if (err) {
      return err;
    }
    jsonParseData(json);
    });
}

readJsonFile();
function handleAccountDetail(){
  console.log("succuss")
};


handle.push(handleAccountDetail)

function jsonParseData(data){
  configJsonArray =JSON.parse(data);


}

function buildHandlerFun(){
  configJsonArray.forEach((obj,index)=>{
    handlerInstance[obj["handler"]]=handle[index];
    

  });
}
buildHandlerFun();
 



const requestListener = function (req, res) {
  res.writeHead(200);
  var methods =configJsonArray.httpMethod
  var returnObj = methods.find((obj) => {
    return obj.url === req.url && obj.method ===req.method
        });
  
res.send(handlerInstance[returnObj.handler]());
  console.log("succuss");
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`the server is listening port http://${host}/${port}`);
});

