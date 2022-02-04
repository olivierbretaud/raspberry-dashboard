const express = require('express');
const cors = require('cors');


run().catch(err => console.log(err));

async function run() {
  const app = express();
  app.use(cors());

  const sseId = new Date().toDateString();

  const writeEvent = (res, sseId , data ) => {
    res.write(`id: ${sseId}\n`);
    res.write(`data: ${data}\n\n`);
  };

  const sendEvent = (req, res , data) => {
    res.writeHead(200, {
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      'Content-Type': 'text/event-stream',
    });
  
    const sseId = new Date().toDateString();
  
    writeEvent(res, sseId, data );
  };

  app.post('/events', async function(req, res) {
    console.log('post');
    if (req.headers.accept === 'text/event-stream') {
      sendEvent(req, res , req.body);
    } else {
      res.json({ message: 'Ok' });
    }
    // Tell the client to retry every 10 seconds if connectivity is lost
    // res.write(JSON.stringify(req.body));
  });

  app.get('/events', async function(req, res) {
    console.log('Got /events');
    // res.set({
    //   'Cache-Control': 'no-cache',
    //   'Content-Type': 'text/event-stream',
    //   'Connection': 'keep-alive'
    // });
    if (req.headers.accept === 'text/event-stream') {
      sendEvent(req, res);
    } else {
      res.json({ message: 'Ok' });
    }
    // Tell the client to retry every 10 seconds if connectivity is lost
    // res.write(JSON.stringify(req.body));
  });

  const port = 8080;
  await app.listen(port);
  console.log(`Listening on port ${port}`);
}