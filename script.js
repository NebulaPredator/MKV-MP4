const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');

function convertMKVtoMP4(inputFile, outputFile) {
    return new Promise((resolve, reject) => {
        ffmpeg(inputFile)
            .output(outputFile)
            .videoCodec('libx264') // H.264 video encoding
            .audioCodec('aac')     // AAC audio encoding
            .format('mp4')         // Ensures MP4 output format
            .outputOptions('-movflags +faststart') // Optimizes for web streaming
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

async function main() {
    try {
        const inputPath = path.resolve('input.mkv'); // Ensure full path
        const outputPath = path.resolve(
            path.dirname(inputPath),
            path.basename(inputPath, path.extname(inputPath)) + '.mp4'
        );

        await convertMKVtoMP4(inputPath, outputPath);
        console.log('Conversion successful!');
        downloadFile(outputPath);
    } catch (err) {
        console.error('Conversion failed:', err);
    }
}

main();
