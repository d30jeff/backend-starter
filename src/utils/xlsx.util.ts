import { Stream } from 'node:stream';
import XLSX from 'xlsx';

export const streamToBuffer = (stream: Stream) => {
  return new Promise((resolve, reject) => {
    const chunks: any[] = [];
    stream.on('data', (chunk) => {
      chunks.push(chunk);
    });
    stream.on('error', (error) => {
      console.log(error);
    });
    stream.on('end', () => {
      resolve(Buffer.concat(chunks));
    });
  });
};

export { XLSX };
