import { defaultOptionsType } from "./types";

export const MAX_DELAY = 350;

export const MAX_TOASTS = 5;
export const TOAST_DURATION = 300;

export enum ToastType {
  success = "success",
  error = "error",
  info = "info",
  warning = "warning",
}

export const defaultOptions: defaultOptionsType = {
  duration: 3000,
  position: "top-right",
  closable: false,
  pauseOnHover: false,
  showProgress: false,
};
