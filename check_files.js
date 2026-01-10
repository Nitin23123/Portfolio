
import fs from 'fs';
try {
    const files = fs.readdirSync('public/sequence');
    console.log('First 5 files:', files.slice(0, 5));
    console.log('Total files:', files.length);
} catch (err) {
    console.error(err);
}
