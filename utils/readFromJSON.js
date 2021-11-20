import { readFileSync } from 'fs';

const obj = JSON.parse(readFileSync('file.json', 'utf8'));
