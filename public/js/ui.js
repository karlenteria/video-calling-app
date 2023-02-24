import * as constants from "./constants.js";
import * as elements from "./elements.js";

export const setPersonalCode = (personalCode) => {
  const personalCodeParagraph = document.getElementById(
    "personal_code_paragraph"
  );

  personalCodeParagraph.innerHTML = personalCode;
};

export const updateLocalVideo = (stream) => {
  const localVideo = document.getElementById("local_video");
  localVideo.srcObject = stream;

  localVideo.addEventListener("loadedmetadata", () => {
    localVideo.play();
  });
};

export const showIncomingDialog = (
  callType,
  acceptCallHandler,
  rejectCallHandler
) => {
  const callTypeInfo =
    callType === constants.callType.CHAT_PERSONAL_CODE ? "Chat" : "Video";

  const incomingCallDialog = elements.getIncomingDialog(
    callTypeInfo,
    acceptCallHandler,
    rejectCallHandler
  );

  //remove all dialogs inside
  const dialog = document.getElementById("dialog");
  dialog.querySelectorAll("*").forEach((dialog) => dialog.remove());
  dialog.appendChild(incomingCallDialog);
};

export const showCallingDialog = (rejectCallHandler) => {
  const callingDialog = elements.getCallingDialog(rejectCallHandler);

  // removing all dialogs inside HTML dialog element
  const dialog = document.getElementById("dialog");
  dialog.querySelectorAll("*").forEach((dialog) => dialog.remove());

  dialog.appendChild(callingDialog);
};

export const showInfoDialog = (preOfferAnswer) => {
  let infoDialog = null;

  if (preOfferAnswer === constants.preOfferAnswer.CALL_REJECTED) {
    infoDialog = elements.getInfoDialog(
      "Call rejected",
      "call rejected your call"
    );
  }
  if (preOfferAnswer === constants.preOfferAnswer.CALLEE_NOT_FOUND) {
    infoDialog = elements.getInfoDialog(
      "Callee is not Found",
      "Please Check Personal Code"
    );
  }
  if (preOfferAnswer === constants.preOfferAnswer.CALL_UNAVAILABLE) {
    infoDialog = elements.getInfoDialog(
      "Callee is Unavailable",
      "Please Try again later"
    );
  }

  if (infoDialog) {
    const dialog = document.getElementById("dialog");

    dialog.appendChild(infoDialog);

    setTimeout(() => {
      removeAllDialogs();
    }, [3000]);
  }
};

export const removeAllDialogs = () => {
  const dialog = document.getElementById("dialog");
  dialog.querySelectorAll("*").forEach((dialog) => dialog.remove());
};

//ui call buttons
const micOnImgSrc = "./utils/images/mic.png";
const micOffImgSrc = "./utils/images/micOff.png";

export const updateMicButton = (micActive) => {
  const micButtonImage = document.getElementById("mic_button_image");
  micButtonImage.src = micActive ? micOffImgSrc : micOnImgSrc;
};

const cameraOnImgSrc = "./utils/images/camera.png";
const cameraOffImgSrc = "./utils/images/cameraOff.png";

export const updateCameraButton = (cameraActive) => {
  const cameraButtonImage = document.getElementById("camera_button_image");
  cameraButtonImage.src = cameraActive ? cameraOffImgSrc : cameraOnImgSrc;
};

//ui messages

export const appendMessage = (message, right = false) => {
  const messagesContainer = document.getElementById("messages_container");
  const messageElement = right
    ? elements.rightMessage(message)
    : elements.leftMessage(message);

  messagesContainer.appendChild(messageElement);
};

export const clearMessenger = () => {
  const messagesContainer = document.getElementById("messages_container");
  messagesContainer.querySelectorAll("*").forEach((n) => n.remove());
};

//ui after hangup
export const updateUIafterHangUp = (callType) => {
  enableDashboard();
  //hide call buttons
  if (callType === constants.callType.VIDEO_PERSONAL_CODE) {
    const callButtons = document.getElementById("call_buttons");
    hideElement(callButtons);
  } else {
    const chatCallButtons = document.getElementById(
      "finish_chat_button_container"
    );
    hideElement(chatCallButtons);
  }
  const newMessageInput = document.getElementById("new_message");
  hideElement(newMessageInput);
  clearMessenger();

  updateMicButton(false);
  updateCameraButton(false);

  //hide remote video and placeholder
  const placeholder = document.getElementById("video_placeholder");
  showElement(placeholder);
  const remoteVideo = document.getElementById("remote_video");
  hideElement(remoteVideo);

  removeAllDialogs();
};

// ui helper function
export const showCallElements = (callType) => {
  if (callType === constants.callType.CHAT_PERSONAL_CODE) {
    showChatCallElements();
  }
  if (callType === constants.callType.VIDEO_PERSONAL_CODE) {
    showVideoCallElements();
  }
};
const showChatCallElements = () => {
  const finishConnectionChatButton = document.getElementById(
    "finish_chat_button_container"
  );
  showElement(finishConnectionChatButton);

  const newMessageInput = document.getElementById("new_message");
  showElement(newMessageInput);

  //block/disable panel
  disableDashboard();
};

const showVideoCallElements = () => {
  const callButtons = document.getElementById("call_buttons");
  showElement(callButtons);

  const placeholder = document.getElementById("video_placeholder");
  hideElement(placeholder);

  const remoteVideo = document.getElementById("remote_video");
  showElement(remoteVideo);

  const newMessageInput = document.getElementById("new_message");
  showElement(newMessageInput);

  //block/disable panel
  disableDashboard();
};
export const updateRemoteVideo = (stream) => {
  const remoteVideo = document.getElementById("remote_video");
  remoteVideo.srcObject = stream;
};
const enableDashboard = () => {
  const dashboardBlocker = document.getElementById("dashboard_blur");
  if (!dashboardBlocker.classList.contains("display_none")) {
    dashboardBlocker.classList.add("display_none");
  }
};

const disableDashboard = () => {
  const dashboardBlocker = document.getElementById("dashboard_blur");
  if (dashboardBlocker.classList.contains("display_none")) {
    dashboardBlocker.classList.remove("display_none");
  }
};

const hideElement = (element) => {
  if (!element.classList.contains("display_none")) {
    element.classList.add("display_none");
  }
};

const showElement = (element) => {
  if (element.classList.contains("display_none")) {
    element.classList.remove("display_none");
  }
};
