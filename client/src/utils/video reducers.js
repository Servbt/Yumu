import { useReducer } from "react";
import {
  ADD_TO_PLAYLIST,
  REMOVE_FROM_PLAYLIST,
  ADD_MULTIPLE_TO_PLAYLIST,
  DELETE_PLAYLIST,
  TOGGLE_PLAYLIST,
  ADD_VIDEO,
} from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {

    case ADD_VIDEO:
      return {
        ...state,
        videos: [...state.videos, action.video],
      };

    case ADD_TO_PLAYLIST:
      return {
        ...state,
        playlistOpen: true,
        playlist: [...state.playlist, action.video],
      };

    case ADD_MULTIPLE_TO_PLAYLIST:
      return {
        ...state,
        playlist: [...state.playlist, ...action.videos],
      };

    case REMOVE_FROM_PLAYLIST:
      let newState = state.playlist.filter(video => {
        return video._id !== action._id;
      });

      return {
        ...state,
        playlistOpen: newState.length > 0,
        playlist: newState
      };

    case DELETE_PLAYLIST:
      return {
        ...state,
        playlistOpen: false,
        playlist: []
      };

    case TOGGLE_PLAYLIST:
      return {
        ...state,
        playlistOpen: !state.playlistOpen
      };

    default:
      return state;
  }
};

export function useVideoReducer(initialState) {
  return useReducer(reducer, initialState)
}
