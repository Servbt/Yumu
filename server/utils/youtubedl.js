const fs = require('fs');
const ytdl = require('ytdl-core');
// const ytpl = require('ytpl');

// const  playlist =  ytpl('https://www.youtube.com/playlist?list=PLGZ11jE8mBFJsw2dOyR1lwXrq7f8LSJ1s');

// console.log( playlist);
ytdl('https://www.youtube.com/watch?v=UHHF1IrvTtg', {quality: 'highest'})
  .pipe(fs.createWriteStream('video.mp4'));


