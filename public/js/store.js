import * as constants from "./constants.js";
let state = {
  socketId: null,
  localStream: null,
  remoteStream: null,
  allowConnectionFromStrangers: false,
  screenSharingActive: false,
  screenSharingStream: null,
  callState: constants.callState.CALL_AVAILABLE_ONLY_ON_CHAT,
};

export const setSocketId = (socketId) => {
  state = {
    ...state,
    socketId,
  };
  console.log(state);
};
export const setLocalStream = (stream) => {
  state = {
    ...state,
    localStream: stream,
  };
};
export const setRemoteStream = (stream) => {
  state = {
    ...state,
    remoteStream: stream,
  };
};

export const setAllowConnectionFromStranger = (allowConnection) => {
  state = {
    ...state,
    allowConnectionFromStrangers: allowConnection,
  };
};
export const setScreenSharingStream = (stream) => {
  state = {
    ...state,
    screenSharingStream: stream,
  };
};
export const setScreenSharingActive = (screenSharingActive) => {
  state = {
    ...state,
    screenSharingActive,
  };
};
export const setCallState = (callState) => {
  state = {
    ...state,
    callState,
  };
};
export const getState = () => {
  return state;
};
