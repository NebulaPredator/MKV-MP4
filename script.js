const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');

function convertMKVtoMP4(inputFile, outputFile) {
    return new Promise((resolve, reject) => {
        ffmpeg(inputFile)
            .output(outputFile)
            .videoCodec('libx264')
            .audioCodec('aac')
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

function downloadFile(filePath) {
    if (fs.existsSync(filePath)) {
        console.log(`Download your file at: file://${path.resolve(filePath)}`);
    } else {
        console.error('File not found.');
    }
}

const inputPath = 'input.mkv'; // Replace with your actual MKV file path
const outputPath = path.basename(inputPath, path.extname(inputPath)) + '.mp4';

convertMKVtoMP4(inputPath, outputPath)
    .then(() => {
        console.log('Conversion successful!');
        downloadFile(outputPath);
    })
    .catch(err => console.error('Conversion failed:', err));
