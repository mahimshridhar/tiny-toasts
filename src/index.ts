import {
  defaultOptions,
  MAX_DELAY,
  MAX_TOASTS,
  TOAST_DURATION,
  ToastType,
} from "./constants";
import { ToastContainerType, ToastOptions, ToastPosition } from "./types";
import "./styles.css";

let toastContainer: ToastContainerType = new Map();
let lastToastTime = 0;

function removeToast(toast: Element, position: ToastPosition) {
  const container = toastContainer.get(position);
  toast.classList.remove("tiny-toasts-show");
  toast.classList.add("tiny-toasts-hide");
  setTimeout(() => {
    if (container?.contains(toast)) container?.removeChild(toast);
  }, TOAST_DURATION);
}

function showToast(message: string, type: string, toastOptions?: ToastOptions) {
  const now = Date.now();
  if (now - lastToastTime < MAX_DELAY) {
    return;
  }

  lastToastTime = now;
  const options = {
    ...defaultOptions,
    ...toastOptions,
  };

  const { position, closable, duration, showProgress, pauseOnHover } = options;

  const toast = document.createElement("div");
  const content = document.createElement("div");

  let timerId: NodeJS.Timeout | null;
  let toastShouldEndAt = Date.now() + duration;
  let isPaused = false;

  const clearExistingTimer = () => {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
  };

  const startTimer = () => {
    clearExistingTimer();
    const timerLeft = Math.max(0, toastShouldEndAt - Date.now());
    timerId = setTimeout(() => {
      removeToast(toast, position);
    }, timerLeft);
  };

  const pauseTimer = () => {
    if (!isPaused && timerId) {
      isPaused = true;
      clearExistingTimer();
      if (showProgress) {
        const progressBar = toast.querySelector(
          ".tiny-toasts-progress"
        ) as HTMLElement;
        if (progressBar) {
          progressBar.style.animationPlayState = "paused";
        }
      }
    }
  };

  const resumeTimer = () => {
    if (isPaused) {
      isPaused = false;
      const timerLeft = Math.max(0, toastShouldEndAt - Date.now());
      if (showProgress) {
        const progressBar = toast.querySelector(
          ".tiny-toasts-progress"
        ) as HTMLElement;

        if (progressBar) {
          progressBar.style.animationPlayState = "running";
          progressBar.style.animation = `shrink ${timerLeft}ms linear`;
        }
      }

      startTimer();
    }
  };

  content.textContent = message;

  if (showProgress) {
    const progressBar = document.createElement("div");
    progressBar.classList.add("tiny-toasts-progress");
    toast.appendChild(progressBar);

    requestAnimationFrame(() => {
      progressBar.style.animation = `shrink ${duration}ms linear`;
      progressBar.style.animationPlayState = "running";
    });
  }

  if (pauseOnHover) {
    toast.addEventListener("mouseenter", pauseTimer);
    toast.addEventListener("mouseleave", resumeTimer);
  }

  toast.appendChild(content);
  toast.classList.add("tiny-toasts");
  toast.classList.add(`tiny-toasts-${type}`);

  if (closable) {
    const closeBtn = document.createElement("button");
    closeBtn.innerHTML = "&times;";
    closeBtn.classList.add("tiny-toasts-close");
    toast.appendChild(closeBtn);

    closeBtn.addEventListener("click", () => {
      removeToast(toast, position);
    });
  }

  if (!toastContainer.has(position)) {
    const container = document.createElement("div");

    container.classList.add("tiny-toasts-container");
    container.classList.add(`tiny-toasts-${position}`);

    document.body.appendChild(container);
    toastContainer.set(position, container);
  }

  const currentToastContainer = toastContainer.get(position);

  const existingToasts =
    currentToastContainer?.querySelectorAll(".tiny-toasts");
  if (existingToasts && existingToasts.length >= MAX_TOASTS) {
    const oldest = existingToasts[0];
    removeToast(oldest, position);
  }

  currentToastContainer?.appendChild(toast);

  setTimeout(() => toast.classList.add("tiny-toasts-show"), 10);

  startTimer();

  return {
    close: () => {
      removeToast(toast, position);
    },
  };
}

function clearAll() {
  toastContainer.forEach((container, position) => {
    const children = container.querySelectorAll(".tiny-toasts");
    children.forEach((toast) => {
      removeToast(toast, position);
    });
  });

  toastContainer.clear();
  lastToastTime = 0;
}

function resetForTesting() {
  toastContainer.clear();
  lastToastTime = 0;
  const allContainers = document.querySelectorAll(
    '[class*="tiny-toasts-container"]'
  );
  allContainers.forEach((container) => {
    container.remove();
  });
}

const toast = {
  success: (message: string, options?: ToastOptions) =>
    showToast(message, ToastType.success, options),
  error: (message: string, options?: ToastOptions) =>
    showToast(message, ToastType.error, options),
  info: (message: string, options?: ToastOptions) =>
    showToast(message, ToastType.info, options),
  warning: (message: string, options?: ToastOptions) =>
    showToast(message, ToastType.warning, options),
  clear: () => clearAll(),
  _resetForTesting: resetForTesting,
};

export default toast;
