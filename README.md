# 1. Welcome to React
## 1. Warming up

Goals:
- What is a component?
- What is JSX? How is it different from html?
    - `className` over `class`
    - `style` is an object (not a string). 
    - `{}` for attributes rather than `""`.
    - `camelCase` over `kebab-case` for attributes

![](public/1-1.mov)

## 2. Let's get reactive
> Let's make the todo items editable & deletable. Also I want several todo lists.

1. Extract a `<TodoList/>` component (with local state) & put two of them next to each other on the home page.


Goals: 
- Breaking apart components.
- "Prop-drilling" 
- "Conditional renders"


![](public/1-2.mov)

## 3. Lifting state up
> Let's make it possible to move todo items between a "todo" list and "completed list".

Goals:
- "Lifting state up" & the perils of local state

![](public/1-3.mov)

# 2. Thinking in React

## 1. Break apart the component hierarchy
> Learn the [5 steps of React](https://beta.reactjs.org/learn/thinking-in-react). (This isn't an ironclad law but still useful).

Given this mockup:
![](public/2-1.png)

Goals:
- Break this down into components. It depends how you want to break it down, but you can get something like: `<Layout/>`, `<NavBar/>`, `<TodoSection/>`, `<TodoSectionHeader/>`, `<TodoSectionBody/>`, `<TodoItem/>` 


![](public/2-1.mov)


## 2. Build a static version

- Get [Tailwind up and running](https://tailwindcss.com/docs/guides/vite).
- Split out the layouts (`<NavBar/>`, `<Layout/>`, & `<Header/>`)

![](public/2-1c.png)


- Convert checkbox -> status select && split the todo list item into:
    - A span that turns into a text input on click (`<ToggleableInput/>`). (This is what the current list item is).
    - A status select (to replace the checkbox).
    - A wrapper for the two of these.

NOTE: You are free to skip prop drilling for now (thereby breaking the status select & text input)

```ts
export const statuses = [
  { label: 'In Review', value: "in_review", icon: "🙇" },
  { label: 'In Progress', value: "in_progress", icon: "🏃" },
  { label: 'Todo', value: "todo", icon: "📥" },
  { label: 'Done', value: "done", icon: "☑️" },
  { label: 'Canceled', value: "canceled", icon: "🗑" }
];
```

- Then change the top level component from a todos & completed list to a separate list for each status.

Goals:
- Learn how to break apart files into a semisensible structure. (Atomic components is overkill and bad.)
    - https://www.joshwcomeau.com/react/file-structure/
    - https://www.youtube.com/watch?v=86i8ZODqMlI


## 3. Find the minimal but complete representation of UI state

(Mostly thoughtwork)

What is state and what isn't? (This question is always relative to a given component)
- The status inside the status select component? Nope. We want it to be passed down all the way from the top-level Tasks component.
- The text of the todo component inside the text input? Maybe, it depends. 
    - This can be "controlled" by the top-level Tasks component.
    - But you may not want it to "submit" until the user hits enter to confirm. That way they could hit "escape" to revert to the original state. In this case, you would need local state during editing. (actually you could get away with an uncontrolled component but that comes later)
- Whether the todo component is editable (and displaying an input) or not (and displaying a span). Yes. This exists locally on each component.
- The list of todo items inside the status-specific todo list? Nope. This is passed down from one higher component, a <Tasks/> component whose state contains all of the todos.
    - This is because we want to be able to change todos between different lists by selecting a new status. It wouldn't be possible if the state was restricted to a specific status.


## 4. Identify where state should live.

We've actually already mostly done this. We want the state to live in the `<Tasks/>` component.
Let's pass state all the way down from the top-level to the bottom.

Another relatively easy step. 
NOTE: 2.2 is quite a lot of work in comparison to these two — maybe we can split more of this out or introduce a little more state (e.g., a button to collapse a section)?

## 5. Add inverse data flow

- When you select a new status, it should propagate up (and change in all other lists)
- When you change a test
- When you add a new todo, it should have the status of the group you added it from.
- Todos should be filtered by status