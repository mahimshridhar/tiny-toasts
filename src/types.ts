export type ToastPosition =
  | "top-right"
  | "top-left"
  | "top-center"
  | "bottom-right"
  | "bottom-left"
  | "bottom-center";

export interface ToastOptions {
  duration?: number;
  position?: ToastPosition;
  closable?: boolean;
  pauseOnHover?: boolean;
  showProgress?: boolean;
}

export type defaultOptionsType = Required<ToastOptions>;

export type ToastContainerType = Map<ToastPosition, HTMLElement>;
