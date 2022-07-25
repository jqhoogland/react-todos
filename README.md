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

- Change the checkbox into a status selector:

```ts
export const statuses = [
  { label: 'In Review', value: "in_review", icon: "🙇" },
  { label: 'In Progress', value: "in_progress", icon: "🏃" },
  { label: 'Todo', value: "todo", icon: "📥" },
  { label: 'Done', value: "done", icon: "☑️" },
  { label: 'Canceled', value: "canceled", icon: "🗑" }
];
```

Goals:
- Learn how to break apart files into a semisensible structure. (Atomic components is overkill and bad.)
    - https://www.joshwcomeau.com/react/file-structure/
    - https://www.youtube.com/watch?v=86i8ZODqMlI