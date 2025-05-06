const http = require('http');
const server = http.createServer((req, res) => {
   if(req.url === '/about'){
    res.end('About Us');
   }

   if(req.url === '/contact'){
    res.end('Contact Us');
   }
   if(req.url === '/'){
    res.end('Welcome to our homepage');
   }
});

server.listen(3000);
console.log('Server is running on port 3000');