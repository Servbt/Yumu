import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import Jumbotron from '../components/Jumbotron';
import { ADD_PLAYLIST } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';

function PlaylistSuccess() {
  const [addPlaylist] = useMutation(ADD_PLAYLIST);

  useEffect(() => {
    async function savePlaylist() {
      const playlist = await idbPromise('playlist', 'get');
      const videos = playlist.map((video) => video._id);

      if (videos.length) {
        const { data } = await addPlaylist({ variables: { videos } });
        const videoData = data.addPlaylist.videos;

        videoData.forEach((video) => {
          idbPromise('playlist', 'delete', video);
        });
      }

      setTimeout(() => {
        window.location.assign('/');
      }, 3000);
    }

    savePlaylist();
  }, [addPlaylist]);

  return (
    <div>
      <Jumbotron>
        <h1>Success!</h1>
        <h2>Thank you for Saving this playlist!!!</h2>
        <h2>You will now be redirected to the home page</h2>
      </Jumbotron>
    </div>
  );
}

export default PlaylistSuccess;
