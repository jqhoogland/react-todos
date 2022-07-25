# Bit todos
A Linear clone to serve as an introduction to React.

### Where to learn what
- Context. Used to make the theme globally accessible (for the toggle theme button in the navbar). 
- Custom hooks: `usePersistedState`. Used in order to persist a user's theme & todos across refreshes
- Prop-drilling: all over the place
- Refs: used to implement autofocus on the todo item value. And to implement auto-animate.
- useCallback & useMemo: used at the very end to clean up inline functions

### Set-up

- Run `npx create vite@latest`
    - Choose `react` & `react-ts`
- Remove `src/assets` and all files from `public/*`.
- Delete all `.css` files.
- Follow the guide on [this page](https://tailwindcss.com/docs/guides/vite) to add support for Tailwind.