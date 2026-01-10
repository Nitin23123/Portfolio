
import fs from 'fs';
import path from 'path';

const dir = 'public/sequence';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.png'));

files.forEach((file) => {
    // Extract the number from frame_XX_...
    const match = file.match(/frame_(\d+)_/);
    if (match) {
        const num = parseInt(match[1]);
        const newName = `frame_${String(num).padStart(3, '0')}.png`;
        fs.renameSync(path.join(dir, file), path.join(dir, newName));
        console.log(`Renamed ${file} -> ${newName}`);
    }
});
