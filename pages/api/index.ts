import type { NextApiRequest, NextApiResponse } from 'next';
import path from "path";
import { IInitData } from '../../types/Types';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IInitData>,
) {
  var fs = require('fs');
  var images : string[] = fs.readdirSync(process.env.IMAGES_PATH).map((f:string) => `/images/${f}`);
  res.status(200).json({ images });
}
