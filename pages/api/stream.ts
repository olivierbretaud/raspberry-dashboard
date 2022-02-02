import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.writeHead(200, {
    Connection: 'keep-alive',
    'Content-Encoding': 'none',
    'Cache-Control': 'no-cache',
    'Content-Type': 'text/event-stream',
  });
  if (req.method === 'POST') {
    if (req.body.type === 'open') {
      console.log('open' , req.body);
      return res.write(`connected`);
    }
    return res.write(`data: ${req.body} \n\n`);
  }

}