import React, {  useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import Playlist from '../components/Cart';
import { useStoreContext } from '../utils/GlobalState';
import {
  REMOVE_FROM_PLAYLIST,
  ADD_TO_PLAYLIST,
} from '../utils/actions';
import { idbPromise } from '../utils/helpers';

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentVideo  ] = useState({});


  const { playlist } = state;


  const addtoPlaylist = () => {
    const videoInPlaylist = playlist.find((playlistItem) => playlistItem._id === id);
    if (videoInPlaylist) {
      dispatch({
        type: ADD_TO_PLAYLIST,
        video: { ...currentVideo, },
      });
      idbPromise('playlist', 'put', { ...currentVideo, });
    }
  };

  const removeFromPlaylist = () => {
    dispatch({
      type: REMOVE_FROM_PLAYLIST,
      _id: currentVideo._id,
    });

    idbPromise('playlist', 'delete', { ...currentVideo });
  };

  return (
    <>
      {currentVideo && playlist ? (
        <div className="container my-1">
          <Link to="/gapi">← Back to Search</Link>

          <h2>{currentVideo.name}</h2>

          <p>{currentVideo.description}</p>

          <p>
            <strong>Price:</strong>${currentVideo.price}{' '}
            <button onClick={addtoPlaylist}>Add to playlist</button>
            <button
              disabled={!playlist.find((v) => v._id === currentVideo._id)}
              onClick={removeFromPlaylist}
            >
              Remove from playlist
            </button>
          </p>

          <img
            src={`${currentVideo.thumbnail}`}
            alt={currentVideo.title}
          />
        </div>
      ) : null}
      <Playlist />
    </>
  );
}

export default Detail;
