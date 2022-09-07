import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import PlaylistItem from '../playlistItem';
import Auth from '../../utils/auth';
import { useStoreContext } from '../../utils/GlobalState';
import { TOGGLE_PLAYLIST, ADD_MULTIPLE_TO_PLAYLIST } from '../../utils/actions';
import './style.css';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Playlist = () => {
  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  useEffect(() => {
    async function getPlaylist() {
      const playlist = await idbPromise('playlist', 'get');
      dispatch({ type: ADD_MULTIPLE_TO_PLAYLIST, products: [...playlist] });
    }

    if (!state.cart.length) {
      getPlaylist();
    }
  }, [state.cart.length, dispatch]);

  function togglePlaylist() {
    dispatch({ type: TOGGLE_PLAYLIST });
  }

  // function calculateTotal() {
  //   let sum = 0;
  //   state.cart.forEach((item) => {
  //     sum += item.price * item.purchaseQuantity;
  //   });
  //   return sum.toFixed(2);
  // }

  function submitCheckout() {
    const videoIDs = [];

    // state.playlist.forEach((video) => {
    //   for (let i = 0; i < video.videoQuantity; i++) {
    //     videoIDs.push(video._id);
    //   }
    // });

    getCheckout({
      variables: { videos: videoIDs },
    });
  }

  if (!state.playlistOpen) {
    return (
      <div className="cart-closed" onClick={togglePlaylist}>
        <span role="img" aria-label="Music">
        🎶
        </span>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="close" onClick={togglePlaylist}>
        [close]
      </div>
      <h2>Current Playlist</h2>
      {state.playlist.length ? (
        <div>
          {state.playlist.map((video) => (
            <PlaylistItem key={video._id} item={video} />
          ))}

          <div className="flex-row space-between">
            <strong>Song Count: ${Playlist.length}</strong>

            {Auth.loggedIn() ? (
              <button onClick={submitCheckout}>Checkout</button>
            ) : (
              <span>(log in to Download playlist)</span>
            )}
          </div>
        </div>
      ) : (
        <h3>
          <span role="img" aria-label="Sleeping">
          😴
          </span>
          You haven't added anything to your Playlist yet...
        </h3>
      )}
    </div>
  );
};

export default Playlist;
