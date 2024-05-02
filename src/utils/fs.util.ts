import fs from 'fs/promises';

export const readDirectory = fs.readdir;
export const { readFile } = fs;
