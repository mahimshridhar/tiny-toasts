import "@testing-library/jest-dom";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import toast from "../index";

const mockToastText = "mock text message";

describe("toast", () => {
  beforeEach(() => {
    jest.clearAllTimers();
    toast._resetForTesting();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it("should render toast with proper text message", () => {
    toast.success("Hello World");
    const toastElement = document.querySelector(".tiny-toasts");
    expect(toastElement).toBeInTheDocument();
    expect(toastElement?.textContent).toBe("Hello World");
  });

  it("should render success toast on screen", () => {
    toast.success(mockToastText);
    const toastElement = document.querySelector(".tiny-toasts-success");
    expect(toastElement).toBeInTheDocument();
  });

  it("should render error toast on screen", () => {
    toast.success(mockToastText);
    const toastElement = document.querySelector(".tiny-toasts-error");
    expect(toastElement).toBeInTheDocument();
  });

  it("should render info toast on screen", () => {
    toast.success(mockToastText);
    const toastElement = document.querySelector(".tiny-toasts-info");
    expect(toastElement).toBeInTheDocument();
  });

  it("should render warning toast on screen", () => {
    toast.success(mockToastText);
    const toastElement = document.querySelector(".tiny-toasts-warning");
    expect(toastElement).toBeInTheDocument();
  });

  it("should render close icon if closable is enabled", () => {
    toast.success(mockToastText, { closable: true });
    const closeBtn = document.querySelector(".tiny-toasts-close");
    expect(closeBtn).toBeInTheDocument();
  });

  it("should not render close icon if closable is enabled", () => {
    toast.success(mockToastText);
    const closeBtn = document.querySelector(".tiny-toasts-close");
    expect(closeBtn).not.toBeInTheDocument();
  });

  it("should render progressbar is it is enabled", () => {
    toast.success(mockToastText, { showProgress: true });
    const progressBar = document.querySelector(".tiny-toasts-progress");
    expect(progressBar).toBeInTheDocument();
  });

  it("should not render progressbar is it is not enabled", () => {
    toast.success(mockToastText, { showProgress: false });
    const progressBar = document.querySelector(".tiny-toasts-progress");
    expect(progressBar).not.toBeInTheDocument();
  });

  it("should close button should dismiss toast", async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ delay: null });
    toast.success(mockToastText, { closable: true });
    const toastElement = document.querySelector(".tiny-toasts");
    const closeBtn = document.querySelector(".tiny-toasts-close");
    expect(closeBtn).toBeInTheDocument();
    await user.click(closeBtn as any);
    expect(toastElement).toHaveClass("tiny-toasts-hide");
    jest.advanceTimersByTime(300);
    expect(toastElement).not.toBeInTheDocument();
  });

  it("should stay when mouse poiner is on the toast and dismiss only after pointer leaves", () => {
    jest.useFakeTimers();
    toast.success(mockToastText, { pauseOnHover: true, duration: 1000 });
    const toastElement = document.querySelector(".tiny-toasts");
    jest.advanceTimersByTime(500);
    toastElement?.dispatchEvent(new Event("mouseenter"));
    expect(toastElement).toBeInTheDocument();
    jest.advanceTimersByTime(100);
    toastElement?.dispatchEvent(new Event("mouseleave"));
    jest.advanceTimersByTime(1050);
    expect(toastElement).toHaveClass("tiny-toasts-hide");
  });

  it("should clear all the toasts", () => {
    jest.useFakeTimers();
    toast.success(mockToastText);
    toast.clear();
    jest.advanceTimersByTime(350);
    const toastElement = document.querySelector(".tiny-toasts");
    expect(toastElement).not.toBeInTheDocument();
  });

  it("blocks second toast if called too fast", () => {
    const mockNow = jest.spyOn(Date, "now");
    mockNow.mockReturnValue(1000);
    toast.success(mockToastText);
    jest.advanceTimersByTime(20);
    mockNow.mockReturnValue(1005);
    toast.success(mockToastText);
    jest.advanceTimersByTime(20);
    const allToasts = document.querySelectorAll(".tiny-toasts");
    expect(allToasts.length).toBe(1);
    mockNow.mockRestore();
  });

  it("should all follow toasts if delay exceeds MAX_DELAY", () => {
    let mockNow = jest.spyOn(Date, "now");
    mockNow.mockReturnValue(1000);
    toast.success(mockToastText);
    jest.advanceTimersByTime(20);
    mockNow.mockReturnValue(1500);
    toast.success(mockToastText);
    jest.advanceTimersByTime(20);
    const allToasts = document.querySelectorAll(".tiny-toasts");
    expect(allToasts.length).toBe(2);
    mockNow.mockRestore();
  });

  it("should close toast which is returned by the toast instance", () => {
    jest.useFakeTimers();
    const instance = toast.success(mockToastText, {
      duration: 5000,
    });
    jest.advanceTimersByTime(1200);
    instance?.close();
    jest.advanceTimersByTime(310);
    const toastElement = document.querySelector(".tiny-toasts");
    expect(toastElement).not.toBeInTheDocument();
  });

  it("should pause/resume correctly", () => {
    toast.success("Test", {
      showProgress: true,
      pauseOnHover: true,
      closable: true,
      duration: 5000,
    });

    jest.advanceTimersByTime(20);

    const toastEl = document.querySelector(".tiny-toasts")!;

    jest.advanceTimersByTime(2000);

    toastEl.dispatchEvent(new MouseEvent("mouseenter"));

    jest.advanceTimersByTime(2000);

    expect(document.querySelector(".tiny-toasts")).toBeInTheDocument();

    toastEl.dispatchEvent(new MouseEvent("mouseleave"));

    jest.advanceTimersByTime(1500);

    expect(document.querySelector(".tiny-toasts")).not.toBeInTheDocument();
  });
});
