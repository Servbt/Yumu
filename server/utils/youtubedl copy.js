const fs = require('fs');
const ytdl = require('ytdl-core');

export function downloadVideo(videoId) {
  
  ytdl(`https://www.youtube.com/watch?v=${videoId}`, {quality: 'highest'})
   .pipe(fs.createWriteStream('video.mp4'));

}




