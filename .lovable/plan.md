

## Fix: Chat Demo Scroll Hijacking Page

### Problem
`scrollIntoView({ behavior: "smooth" })` on the `chatEndRef` scrolls the entire page, not just the chat container, because `scrollIntoView` bubbles up to the nearest scrollable ancestor (the page itself).

### Fix
**File: `src/components/landing/AIDemoSection.tsx`**

Replace the `scrollToBottom` function to use the chat container's `scrollTop` instead of `scrollIntoView`:

1. Add a `chatContainerRef` pointing to the chat body `div` (the scrollable `div` with `overflow-y-auto`)
2. Change `scrollToBottom` to:
   ```ts
   const scrollToBottom = useCallback(() => {
     setTimeout(() => {
       if (chatContainerRef.current) {
         chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
       }
     }, 50);
   }, []);
   ```
3. Attach `ref={chatContainerRef}` to the chat body div (the one with `overflow-y-auto` class)
4. Remove `chatEndRef` div and ref since they're no longer needed

This keeps scrolling contained within the chat panel without affecting the page.

