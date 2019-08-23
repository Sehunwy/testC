import { Toast, Dialog } from "vant";

export const toastMessage = (msg, time = 3000, pos = "bottom") => {
  Toast({
    message: msg,
    duration: time,
    position: pos
  });
};

export const dialogAlert = (atitle, msg, isoverlay = true) => {
  let alert = Dialog.alert({
    title: atitle,
    message: msg,
    overlay: isoverlay,
    closeOnClickOverlay: true
  });
  return alert;
};

export const dialogConfirm = (ctitle, msg) => {
  let confirm = Dialog.confirm({
    title: ctitle,
    message: msg
  });
  return confirm;
};

export const common = {
  toastMessage,
  dialogAlert,
  dialogConfirm
};

export default common;
