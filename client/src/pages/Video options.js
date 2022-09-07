import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_VIDEOS } from '../utils/queries';
import Playlist from '../components/Playlist';
import { useStoreContext } from '../utils/GlobalState';
import {
  REMOVE_FROM_PLAYLIST,
  ADD_TO_PLAYLIST,
  ADD_VIDEO,
} from '../utils/actions';
import { idbPromise } from '../utils/helpers';


const VideoOptions = ( currentVideo ) => {
  // console.log(currentVideo);
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [ , setCurrentVideo] = useState({})
  const { loading, data } = useQuery(QUERY_VIDEOS);
  const { videos, playlist } = state;

  useEffect(() => {
    // already in global store
    if (videos) {
      setCurrentVideo(videos.find((video) => video._id === id));
    } else if (!videos.find((video)=> video.id)){
      dispatch({
        type: ADD_VIDEO,
        videos: currentVideo,
      });
      idbPromise('video', 'put', currentVideo);
    }
    // retrieved from server
    // else if (data) {
    //   dispatch({
    //     type: QUERY_VIDEOS,
    //     videos: data.video,
    //   });

    //   data.videos.forEach((video) => {
    //     idbPromise('video', 'put', video);
    //   });
    // }
    // get cache from idb
    else if (!loading) {
      idbPromise('video', 'get').then((indexedVideos) => {
        dispatch({
          type: QUERY_VIDEOS,
          videos: indexedVideos,
        });
      });
    }
  }, [videos, data, loading, dispatch, id]);


  const addtoPlaylist = () => {
    // const videoInPlaylist = playlist.find((playlistItem) => playlistItem._id === id);
    // if (videoInPlaylist) {
      setCurrentVideo(currentVideo._id === id);
      dispatch({
        type: ADD_TO_PLAYLIST,
        video: { currentVideo, },
      });
      idbPromise('playlist', 'put', { currentVideo});
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
