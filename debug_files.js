
import fs from 'fs';
const files = fs.readdirSync('public/sequence').filter(f => f.endsWith('.png'));
console.log('Total PNG files:', files.length);
console.log('Last 5 files:', files.sort().slice(-5));
