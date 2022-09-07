import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Playlist from '../components/Playlist';
import { useStoreContext } from '../utils/GlobalState';
import {
  REMOVE_FROM_PLAYLIST,
  ADD_TO_PLAYLIST,
} from '../utils/actions';
import { idbPromise } from '../utils/helpers';

const VideoOptions = ( currentVideo ) => {
  console.log(currentVideo);
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  // const [currentVideo , setCurrentVideo   ] = useState({})


  const { playlist } = state;


  const addtoPlaylist = () => {
    // const videoInPlaylist = playlist.find((playlistItem) => playlistItem._id === id);
    // if (videoInPlaylist) {
      dispatch({
        type: ADD_TO_PLAYLIST,
        video: { currentVideo, },
      });
      idbPromise('playlist', 'put', { currentVideo, id});
    }
  // };

  const removeFromPlaylist = () => {
    dispatch({
      type: REMOVE_FROM_PLAYLIST,
      _id: currentVideo._id,
    });

    idbPromise('playlist', 'delete', { currentVideo ,id});
  };

  return (
    <>
      {currentVideo && playlist ? (
        <div className="container my-1">

          {/* <h2>{currentVideo.snippet.title}</h2> */}

          {/* <p>{currentVideo.snippet.description}</p> */}

          <p>
            <button onClick={addtoPlaylist}>Add to playlist</button>
            <button
              disabled={!playlist.find((v) => v._id === currentVideo._id)}
              onClick={removeFromPlaylist}
            >
              Remove from playlist
            </button>
          </p>

          {/* <img
            src={`${currentVideo.snippet.thumbnails.high}`}
            alt={currentVideo.snippet.title}
          /> */}
        </div>
      ) : null}
      <Playlist />
    </>
  );
}

export default VideoOptions;
