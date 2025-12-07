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

## Installation

1. Install: `npm install tiny-toasts`
2. Add CSS: `<link rel="stylesheet" href="node_modules/tiny-toasts/dist/tiny-toasts.css">`

## 🚀 Quick Usage

```javascript
import toast from "tiny-toasts";

toast.success("File saved!");
toast.error("Something went wrong");
toast.warning("Check your input");
```
