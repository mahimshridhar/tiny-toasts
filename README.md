# 🍞 tiny-toasts

> A minimal toast notification library. Currently in early development, improving over time.

**What works:**

- ✅ Basic toast display
- ✅ Multiple types (success, error, info, warning)
- ✅ Custom duration
- ✅ Simple positioning (top/bottom × left/right/center)
- ✅ Close button
- ✅ Pause on hover
- ✅ Progress bar
- ✅ Rate limiting
- ✅ Maximum toast limits
- ✅ TypeScript support
- ✅ Zero dependencies

**Planned improvements:**

- 🔄 Better animations
- 🔄 Accessibility (ARIA labels)
- 🔄 More positioning options
- 🔄 React/Vue wrappers

## Install

npm install tiny-toasts

## Usage ES Modules

```javascript
import toast from "tiny-toasts";
import "tiny-toasts/dist/tiny-toasts.css";

toast.success("Hello!");
toast.error("Oops!");
```

## Usage CDN

```javascript
<link rel="stylesheet" href="https://unpkg.com/tiny-toasts/dist/tiny-toasts.css">
<script src="https://unpkg.com/tiny-toasts"></script>
<script>
  tinyToasts.success('Hello from CDN!');
</script>
```

## Quick Usage

```javascript
import toast from "tiny-toasts";

// Show a success toast
toast.success("Operation completed!");

// Show an error with options
toast.error("Something went wrong!", {
  duration: 5000,
  closable: true,
  position: "top-right",
});
toast.info("New message received", { duration: 5000 });

// Toast that pauses when hovered
toast.info("Hover me!", {
  pauseOnHover: true,
  closable: true,
});

// Bottom-left positioned toast
toast.warning("Check this out", {
  position: "bottom-left",
  duration: 4000,
});
```

## Toast Options

```javascript
interface ToastOptions {
  duration?: number; // How long toast stays (ms), default: 3000
  position?: string; // 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  closable?: boolean; // Show close button, default: false
  showProgress?: boolean; // Show progress bar, default: false
  pauseOnHover?: boolean; // Pause timer on hover, default: false
}
```
