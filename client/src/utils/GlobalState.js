import React, { createContext, useContext } from "react";
// import { useProductReducer } from './reducers'
import { useVideoReducer } from './video reducers'


const StoreContext = createContext();
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useVideoReducer({
    products: [],
    cart: [],
    videos: [],
    playlist: [],
    playlistOpen: false,
    cartOpen: false,
    categories: [],
    currentCategory: '',
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
