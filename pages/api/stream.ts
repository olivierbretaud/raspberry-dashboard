import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  //  res.writeHead(200, {
  //   Connection: 'keep-alive',
  //   'Cache-Control': 'no-cache',
  //   'Content-Type': 'text/event-stream',
  // });
  // var sseId = (new Date()).toLocaleTimeString();
  res.writeHead(200, {
    Connection: 'keep-alive',
    'Content-Encoding': 'none',
    'Cache-Control': 'no-cache',
    'Content-Type': 'text/event-stream',
  });
  if (req.method === 'POST') {
    console.log('post')
    res.write(`data: ${req.body} \n\n`);
  }

}