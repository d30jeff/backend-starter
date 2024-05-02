import XLSX from 'xlsx';

export const streamToBuffer = (stream) => {
  return new Promise((resolve, reject) => {
    const chunks = [];
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
