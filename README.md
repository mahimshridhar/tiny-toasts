# 🍞 tiny-toasts

> A minimal toast notification library. Currently in early development, improving over time.

**What works:**

- ✅ Basic toast display
- ✅ Multiple types (success, error, warning)
- ✅ Custom duration
- ✅ Simple positioning

**Planned improvements:**

- 🔄 Better animations
- 🔄 Accessibility (ARIA labels)
- 🔄 More positioning options
- 🔄 TypeScript definitions
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

## 🚀 Quick Usage

```javascript
import toast from "tiny-toasts";

toast.success("File saved!");
toast.error("Something went wrong");
toast.warning("Check your input");
```
