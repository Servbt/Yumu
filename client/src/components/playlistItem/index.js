import React from 'react';
import { useStoreContext } from "../../utils/GlobalState";
import { REMOVE_FROM_PLAYLIST } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

const PlaylistItem = ({ video }) => {

  const [, dispatch] = useStoreContext();

  const removeFromPlaylist = video => {
    dispatch({
      type: REMOVE_FROM_PLAYLIST,
      _id: video._id
    });
    idbPromise('cart', 'delete', { ...video });

  };

  return (
    <div className="flex-row">
      <div>
        <img
          src={`${video.image}`}
          alt=""
        />
      </div>
      <div>
        <div>{video.name}, ${video.thumbnail}</div>
          <span
            role="img"
            aria-label="trash"
            onClick={() => removeFromPlaylist(video)}
          >
            🗑️
          </span>
        </div>
      </div>
  );
}

export default PlaylistItem;