// import React from 'react';
// import './dlbtn.css';
// const fs = require('fs');
// const ytdl = require('ytdl-core');

// const  DownloadBtn = ({ videoID }) => {
//     return (
//         <button className='dlbutton' onClick={() => {
//             ytdl(`https://www.youtube.com/watch?v=${videoID}`, { quality: 'highest' })
//             .pipe(fs.createWriteStream('video.mp4'));

//         }}>
//             Download This Video!
//         </button>
//     )
// }

// export default DownloadBtn;