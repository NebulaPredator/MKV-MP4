const ffmpeg = require('fluent-ffmpeg');
const path = require('path');

function convertMKVtoMP4(inputFile, outputFile) {
    return new Promise((resolve, reject) => {
        ffmpeg(inputFile)
            .output(outputFile)
            .on('end', () => {
                console.log(`Conversion complete: ${outputFile}`);
                resolve(outputFile);
            })
            .on('error', (err) => {
                console.error('Error:', err);
                reject(err);
            })
            .run();
    });
}

const inputPath = 'input.mkv'; // Replace with your actual MKV file path
const outputPath = path.basename(inputPath, path.extname(inputPath)) + '.mp4';

convertMKVtoMP4(inputPath, outputPath)
    .then(() => console.log('Conversion successful!'))
    .catch(err => console.error('Conversion failed:', err));
