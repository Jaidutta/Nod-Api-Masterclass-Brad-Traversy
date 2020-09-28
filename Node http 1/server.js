const http = require("http");

const server = http.createServer((req, res) => {
  // const { headers, url, method } = req;
  // console.log(headers, url, method);

  // for setting Content-Type as html
  //res.setHeader("Content-Type", "text/html");

  /* for setting Content-Type as text
     res.setHeader("Content-Type", "text/plain");
   
     res.write("<h1>Hello</h1>");
     res.write("<h2>Hello Again</h2>");
  */
  // Non standard header
  //res.setHeader("X-Powered-By", "Nodejs");

  const todos = [
    {id: 1, text: "Todo One"},
    {id: 2, text: "Todo Two"},
    {id: 3, text: "Todo three"}
  ]
  
  //res.setHeader('Content-Type', 'application/json')
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'X-Powered-By': 'Nodejs'
  })
  console.log(req.headers.authorization);


  // Sending body data
  let body = []
  req
     .on('data', chunk => {
        body.push(chunk)
     })
     .on('end', () => {
       body = Buffer.concat(body).toString()
       console.log(body);
     })
     
  res.end(JSON.stringify({
    success: true, 
    data: todos
  }));
});

const PORT = 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
