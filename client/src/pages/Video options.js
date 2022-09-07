import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Playlist from '../components/Playlist';
import { useStoreContext } from '../utils/GlobalState';
import {
  REMOVE_FROM_PLAYLIST,
  ADD_TO_PLAYLIST,
  ADD_VIDEO,
} from '../utils/actions';
import { idbPromise } from '../utils/helpers';

const VideoOptions = ( {video} ) => {
  // console.log(video);
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  // const [video , setvideo   ] = useState({})
const addToVideos = () => {
  const videoObject = {
    videoID: video.id.videoId,
    title: video.snippet.title,
    image: video.snippet.thumbnails.high.url
  };
  console.log(videoObject);

  dispatch({
    type: ADD_VIDEO,
    video: videoObject
  })
  idbPromise('videos', 'add', videoObject)
}
  const { playlist } = state;


  const addtoPlaylist = () => {
    // const videoInPlaylist = playlist.find((playlistItem) => playlistItem._id === id);
    // if (videoInPlaylist) {
      dispatch({
        type: ADD_TO_PLAYLIST,
        video: { video, },
      });
      idbPromise('playlist', 'put', {video});
    }
  // };

  const removeFromPlaylist = () => {
    dispatch({
      type: REMOVE_FROM_PLAYLIST,
      _id: video._id,
    });

    idbPromise('playlist', 'delete', { video ,id});
  };

  return (
    <>
      {video && playlist ? (
        <div className="container my-1">

          {/* <h2>{video.snippet.title}</h2> */}

          {/* <p>{video.snippet.description}</p> */}

          <p>
            <button onClick={addToVideos}>Add to Videos</button>
            <button onClick={addtoPlaylist}>Add to playlist</button>
            <button
              disabled={!playlist.find((v) => v._id === video._id)}
              onClick={removeFromPlaylist}
            >
              Remove from playlist
            </button>
          </p>

          {/* <img
            src={`${video.snippet.thumbnails.high}`}
            alt={video.snippet.title}
          /> */}
        </div>
      ) : null}
      <Playlist />
    </>
  );
}

export default VideoOptions;