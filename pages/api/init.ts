import type { NextApiRequest, NextApiResponse } from 'next';
import { IInitData } from '../../types/Types';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IInitData>,
) {
  // eslint-disable-next-line
  const fs = require('fs');
  const images : string[] = fs.readdirSync(process.env.IMAGES_PATH).map((f:string) => `/images/${f}`);
  res.status(200).json({ images });
}
