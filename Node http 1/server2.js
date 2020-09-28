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

  let todos = [
    {id: 1, text: "Todo One"},
    {id: 2, text: "Todo Two"},
    {id: 3, text: "Todo three"}
  ]
  
  
  const {method, url} = req
  

  // Sending body data
  let body = []
  req
     .on('data', chunk => {
        body.push(chunk)
     })
     .on('end', () => {
       body = Buffer.concat(body).toString()

       let status = 404

       const response = {
         success: false,
         data: null,
         error: null
       }

       if(method === 'GET' && url === '/todos') {
        status = 200;
        response.success = true;
        response.data = todos
       } else if(method === 'POST' && url ==='/todos') {
          const {id, text} = JSON.parse(body)
          if (!id || !text) {
            status = 404
            response.error = 'Please add an id and a text'
          } else {
            todos.push({id, text})
            status: 201;
            response.success = true
            response.data = todos
          }
       }
       res.writeHead(status, {
        'Content-Type': 'application/json',
        'X-Powered-By': 'Nodejs'
       })

       res.end(JSON.stringify(response))
  })
     
  
});

const PORT = 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
