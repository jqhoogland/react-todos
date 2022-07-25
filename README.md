# Bit todos
A Linear clone to serve as an introduction to React.

### Tutorial outline
1. **Welcome to React** (Todo list) 
    - Button to add new items with the value `item #1`, `item #2`, etc.
        - Goals: 
            - `jsx`: `className` over `class`, camelCase
            - `useState` (warn about changing local variables, info about naming conventions)
            - `map` & `key` (for rendering lists of items),
            - `onClick`  (`{}` over `""`)
    - Make items editable. And add a checkbox to delete items. (No autofocus)
        - Goal: 
            - **Prop-drilling** (& `children`) (+ reminder of destructuring)  
            - **Conditional renders** (+ reminder of `&&`, `? ... : ...`)
            - Breaking components apart into smaller bits
2. **Thinking in React** (Todo list with sections)
    - Given a list of items with a "status", group these items by status. Also display a navbar/header. 
        - Goal: [5 steps of React](https://beta.reactjs.org/learn/thinking-in-react):
            1. Break out the component hierarchy: `<Layout/>`, `<NavBar/>`, `<TodoSection/>`, `<TodoSectionHeader/>`, `<TodoSectionBody/>`, `<TodoItem/>`, `<ToggleableInput/>`, `<AddButton/>`
            2. Build a static version.
            3. Find the minimal but complete representation of UI state: add a `status` attribute to the list of items
            4. Identify where state should live ("moving state up").
            5. Add inverse data flow.
        - Somewhere mention race conditions in `setState`
3. **Pimping out the UI**
    - Importing & exporting components: split apart layout, todo components, & theme 
    - Integrate tailwind
    - Add a dark mode (via prop-drilling)
4. **All about hooks**:
    - **But what is a function?**: primer (/refresher?) on pure functions + side effects. 
    - **`useContext`**: simplify dark mode management.
    - **`useEffect`**: Refactor theme so it persists across page loads. Mention dependencies. 
        - Introduce the idea of the "virtual dom", the render cycle
        - Mention strict mode
    - **`useRef**: used to implement autofocus on the todo item value. And to implement auto-animate.
        - Mention use case outside referencing the actual DOM.
    - **Custom hook**: `usePersistedState` (for both theme & todos) & simplified `useTheme`
5. **Todos on todos**:
    - Add ability to change between statuses, priorities, and assigned users.
    - Items sorted by priority
    - Routing (`react-router`). Add a separate route & ability to update users.
    - Performance gains. Introduction to `useCallback` & `useMemo`.
    - Where to go next (just mention where to look for students who are interested in going further):
        - Meta-frameworks: `Next.JS` and `Remix`,
        - Fetching: `fetch`, `useSWR`, `useQuery`, `useTRPC`,
        - Forms: `react-use-form`, `formik`
        - Useful utils: `clsx`

### Set-up

- Run `npx create vite@latest`
    - Choose `react` & `react-ts`
- Remove `src/assets` and all files from `public/*`.
- Delete all `.css` files.
- Follow the guide on [this page](https://tailwindcss.com/docs/guides/vite) to add support for Tailwind.