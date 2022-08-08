# Module: React 

# 1. Warming up

## 1.1 Introductie

### 1 Omschrijving

React is een open-source framework die ontwikkeld is door Facebook en de open-source community. Dit framework is uitgebracht in mei 2013.

Veel populaire bedrijven werken met dit framework. Denk aan:

- Facebook
- Instagram
- Airbnb
- Netflix
- Reddit
- Uber




> **Note**
> The original React lesson mentions a bit about React's license [that is no longer true](https://www.codemag.com/article/1701041/Legal-Notes-What%E2%80%99s-the-Deal-with-ReactJS%E2%80%99s-Licensing-Scheme). React is released under an MIT license.


### 1.0.1.1 Kracht in components 
De kracht van React zit hem in components. Components zijn JavaScript functies die HTML[^1] returnen. Je kan een component zien als een bouwsteen waarmee je complete, dynamische web applicaties kunt bouwen.

```jsx

function MyButton() {
  return (
    <button>Ik ben een knopje</button>
  );
}
```

React stelt je in staat om eenvoudig allemaal kleine bouwstenen te maken en deze aan elkaar te knopen. Elke bouwsteen kan je meerdere keren hergebruiken.

```jsx
export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton />
    </div>
  );
}
```

Elke bouwsteen (of "component") houdt zijn eigen staat bij en kan daardoor los van andere componenten functioneren. Verandert er iets in de staat van een component? Dan wordt dat component opnieuw naar je DOM gerenderd. React zorgt hier automatisch voor!

[^1]: Technisch gezien, returnen ze "JSX". Daar leer je meer over in de komende exercises.

## Imperative en Declarative UI

React was aan het begin heel erg geinspireerd door Angular.

Beide Angular en React zijn ontstaan als een reactie op JQuery. In "the old days"[^1], was Javascript een nachtmerrie.

Toendertijd was de enige manier om via Javascript toegang te krijgen aan de DOM (de boom van HTML elementen), door `getElemenyById`. 

```html
<html>

    <div id="my-div">
        Hello world
    </div>

    <button id="my-button">
        My Button
    <button>

    <script>

        document.getElementById('my-button').addEventListener('click', function () {
            document.getElementById('my-div').classList.toggle('red') // Check toggleClass
        })

    </script>
</html>

```

Dat is heel veel code om alleen de class van een component te veranderen aan de hand van een button click. Het wordt alleen erger naarmate de functionaliteit ingewikkelder wordt. 

```html
<script>

$('#my-button').on('click', function() {
    $('#my-div').toggleClass('red')
})

</script>
```

Veel compacter! 

Waar het probleem onstaat is bij grotere applicaties. Die veel requests naar de server sturen en terugkrijgen. 

Met een imperative aanpak, vertel je de DOM wat er moet gebeuren (imperatief van het latijn voor bevel). Met JQuery (en vanilla Javascript) vertel je een element om de classe `red` te switchen.






[^1]: Het is nog steeds een nachtmerrie, maar het was toen nog erger.


## React vs. Andere Frameworks

React is bekend voor minimaliteit. 

Vergelijk [Angular](https://angular.io/), de historische "vijand" van React ontworpen door Google. Angular komt met "batteries included" — de core product heeft al oplossing bedacht voor veel voorkomende problemen zoals routing, forms, internationalization ("i18n") en meer. 

Bij React, worden deze oplossingen overgelaten aan de community. 
- Voor routing moet je kiezen tussen bijvoorbeeld [Remix/react-router](https://github.com/remix-run/react-router) en [Next.js](https://nextjs.org/).
- Voor formulieren, [react hook form](https://react-hook-form.com/) of [formik](https://github.com/jaredpalmer/formik) of misschien vanilla. 
- Voor i18n, [react-i18next](https://react.i18next.com/) of [React-intl](https://github.com/formatjs/formatjs) of [next-intl](https://github.com/amannn/next-intl/tree/main/packages/next-intl/src)...
- Voor data-fetching, [react-query](https://react-query.tanstack.com/) of [swr](https://swr.vercel.app/) (of weer Remix). 

Dan moet je nog een component library kiezen, authenticatie bedenken, misschien een state management library, en zo voort. 

Dit kan voor een beginner (en zelfs een gevorderde React developer) overweldigend zijn. Maar het heeft voordelen. Dankzij het feit dat React klein blijft, heeft de community meer vrijheid om te besluiten wat de beste manier is om naar vore te gaan.

Bijvoorbeeld, in 2019, is React overgestapt van [class-based components naar functional components](https://reactjs.org/blog/2019/02/06/react-v16.8.0.html). Dit is een belangrijke stap geweest wat vaak naar veel heldere code heeft geleid. 

Zier hier een voorbeeld van een component wat een verbinding met een chatroom heeft. Deze verbinden moet aangemaakt worden als de component voor het eerst is gerendered, maar het moet ook afgebroken worden als de component verwijderd wordt (omdat je naar een nieuwe pagina gaat).

Met class-based components, worde deze faze van de "lifecycle" gesplits.

```jsx

class MyChatRoom {
    // Runs the first time the component is rendered (on "mount")
    componentDidMount() {
        chatroom.connect()
    }

    // Runs before the component is unrendered (on "unmount")
    componentWillUnmount() {    
        chatroom.disconnect()
    }

    render() {
        return <div>...</div>
    }
}

```

Met functional components schrijf je een "hook":


```jsx
function MyChatRoom() {

    // Hooks let you bundle logic by meaning rather than lifecyle
    useEffect(() => {
        chatroot.connect()

        // De returnwaarde is een functie die gecalld wordt op "unmount"
        return () => chatroom.disconnect() 
    }, [])

    return <div>...</div>
}

```

Nog beter, je kan deze functionaliteit abstraheren, dus ook hergebruiken in andere components.

```jsx
function useChatRoom () {
    useEffect(() => {
        chatroom.connect()
        return () => chatroom.disconnect()
    })
}

function MyChatRoom() {
    useChatRoom()

    return <div>...</div>
}

```





### 1.0.2 


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

- [x] How might you break this apart? Just list some of the component names.

Goals:
- Break this down into components. It depends how you want to break it down, but you can get something like: `<Layout/>`, `<NavBar/>`, `<TodoSection/>`, `<TodoSectionHeader/>`, `<TodoSectionBody/>`, `<TodoItem/>` 


![](public/2-1.mov)


## 2. Build a static version

- [x] Get [Tailwind up and running](https://tailwindcss.com/docs/guides/vite).
- [x] Split out the layouts (`<NavBar/>`, `<Layout/>`, & `<Header/>`)

![](public/2-1c.png)


- [x] Convert checkbox -> status select && split the todo list item into:
    - [x] A span that turns into a text input on click (`<ToggleableInput/>`). (This is what the current list item is).
    - [x] A status select (to replace the checkbox).
    - [x] A wrapper for the two of these.

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
- [x] Let's pass state all the way down from the top-level to the bottom.

Another relatively easy step. 
NOTE: 2.2 is quite a lot of work in comparison to these two — maybe we can split more of this out or introduce a little more state (e.g., a button to collapse a section)?

## 5. Add inverse data flow

- [x] When you select a new status, it should propagate up (and change in all other lists)
- [x] When you change a test
- [x] When you add a new todo, it should have the status of the group you added it from.
- [x] Todos should be filtered by status

# 3. All about hooks

## 1. `useContext` (and implementing a dark-mode).

- [x] Add a checkbox to the right of the navbar for enabling dark mode. Also add DaisyUI because it makes themes a little easier (all you have to do is replace `bg-white` with `bg-base-100`).
   - This involves changing attributes on `<html/>` so a diagram will be helpful. (This previews what we're about to do with state).
- [x] Let's add a footer that displays a moon or sun emoji depending on the theme. We have to lift state up to `<Layout/>`. Oof. Also, changing the DOM directly is not very React, so there's a good "theoretical" reason to do this!
- [x] Extract the state to a `<ThemeProvider/>` and remove prop-drilling in favor of context.
    - Show that this gets a little easier with prop spreading.
    - To show how much nicer this is, put a `<ThemeToggle/>` inside each of the todo items. Doing this with drilling would have meant raising the state to `<App/>`, then passing it down all the way. No thanks.
- [x] Make it look a little prettier. Take advantage of Daisyui's component-style classes (`.btn` for the add button, `.input` for the toggleable input, `.select` for the select, `.bg-base-[100,200,300]`, `.border-base-[100,200,300]`, and `.toggle` for the switch. Also useful are modifiers `.[btn,input,select,...]-[xs,sm,...]`, and `.[btn,input,...]-bordered`).

Goals:
- Actually learn the word "prop-drilling". Are you exhausted yet having to repeatedly type the same props you pass down again and again? It gets easy with the spread operator, but it's still annoying!
- Understand `useContext`, `Providers`
- Introduction to the render cycle. 
- When to use `useContext` and when not to use `useContext` (most of the time). Alternatives (smart use of children).

![](3-1.mov)

## 2. `useRef` to autofocus & animate

- [x] When we click the toggleable input to open the text input, we want it to autofocus. Right now, we have to click twice. That's frustrating and annoying!
   - In order to focus, we need to access the actual DOM element. You see... [introduce the "virtual dom"].
   - Also introduce the render cycle because we'll need `flushSync` (because the element isn't rendered immediately!)
- [x] Introduce [auto-animate](https://auto-animate.formkit.com/) for another example of `useRef` (& light introduction of `useEffect`)

![](3-2.mov)

## 3. `useEffect` to autofocus better

- [x] When you create a new element, it shows up non-toggled. Ideally, we'd like to create a new element, and automatically open & focus the input & slide it into view.
- [x] We want to persist the state of our theme, so that it's the same after the page reloads.
- [x] We want to avoid FOUC (flash of unstyle content) so we use `useLayoutEffect` instead.
- [x] We want to persist the todos to local storage as well. Let's start by writing out the code inside the `<Tasks/>` element.

- A small theoretical section on `useEffect`:
  - A major note of caution: `useEffect` should be used as a last resort. Side-effects belong in event handlers not as a consequence of special renders.


```tsx
function loadDarkMode() {
    const theme = localStorage.getItem('theme')
    document.documentElement.setAttribute('data-theme', theme ?? 'light')
    return theme === 'dark'
}

export function ThemeProvider({ children }: PropsWithChildren) {
    const [isDarkMode, setIsDarkMode] = useState(loadDarkMode);
    
    // ...
}
```

would be more appropriate than doing the same inside a `useLayoutEffect`.

## 4. `useCustomEffect` to persist state in multiple places & explain ourselves better
- [x] First of all, let's take advantage of `autoFocus` to get rid of some excess code. 
- [x] And let's use `auto-animate`'s custom hook to simplify that code. Lightweight example that introduces the idea of custom hooks without having to write a custom hook yourself.
- [x] Let's start by extracting a `useTheme = () => useContext(ThemeContext)` hook. (Out of order)
- [x] Now let's extract the `<Tasks/>` logic into its own hook. For now, this serves to make it more legible.
- [x] In light of the single responsibility principle, can we extract the specific function of `useState` + local storage? 
- [x] What about the list-methods that we need in todos. We're likely to need those in the future.
    - In hindsight this is probably too difficult, and it's not obvious what the value is. First, introduce users and why we need this.


# 4. Finishing & launching the application

## 1. Priority. 

- [x] Let's add priority. Create a `<TodoPrioritySelect/>` and wire it up inside the `<TodoListItem/>`. Get it fully working. Add the following to `data.ts`.
    - NOTE: (You may have to delete `todos` in localStorage to get everything displaying correctly)

```ts
export const priorities = [
  { label: 'Urgent', value: 5, icon: "🔥" },
  { label: 'High', value: 4, icon: "🟥" },
  { label: 'Medium', value: 3, icon: "🟧" },
  { label: 'Low', value: 2, icon: "🟨" },
  { label: "None", value: 1, icon: "⬜️" },
]
```

![](4-1.mov)

## 2. Users

- [x] Let's add users we can assign todos to. Create a `<TodoUserSelect/>` and wire it up inside the TodoListItem... Make sure to add a fallback in case nobody has been assigned!
```ts
export const users = [
  { id: 0, label: 'Gadisa' },
  { id: 1, label: 'Mehdi' },
  { id: 1, label: 'Henk' },
  { id: 1, label: 'Ayşe' },
]
```
![](4-2.mov)

## 2b. Multiple users

- [x] But what if we want multiple users? You will definitely want to delete `todos` from localStorage (and include `assigned: []` in your new list of defaults )

![](4-2b.mov)

## 3. Let's make it pretty

- Make a `<Dropdown/>` component (on top of [this](https://daisyui.com/components/dropdown/)) to free up some space in the todo list. Put the multiselect inside of it and display a button of initial avatars instead.
- Can you make it look like what you see in the video?

Tip: 
- If you want the dropdown on the right to align correctly, you'll have to pass it the `.dropdown-end` class. How to do this with nested components? Check out the library `clsx`.

```jsx

const myComponent = <MyCustomComponent className="my-classname"/>;

function MyCustomComponent({className}) {
    return <div className={"base-class " + className} />
    // OR
    return <div className={["base-class", className].join(" ")} />
    // OR
    return <div className={clsx("base-class", className)} />  // This is great if, for example, `className=undefined` or `null`.
}

```
Bonus points for avatar items (but this isn't required).


![](4-3.mov)

### XXX? Deleting items

Add the ability to delete items if you hit delete or backspace & it's empty.
In retrospect this fits more appropriately with the custom `useTodos` hooks.


## 4. Adding routing

- [x] Clean up the file structure a little
- [x] Install react-router & react-router-dom. Wrap `<App/>` in `main.tsx` with `<BrowserRouter/>`. Put `<Routes>...</Routes>` in the `App.tsx`. 
- [x] Add a `<Users/>` page. Let it display a list of users (and a header with the title "Users").
- [x] Add a `useUsers` hook, based off of the `useTodos` hook. Link it to state
- [x] Link the original `<TodoAssignedSelect/>` component to useUsers

Make sure to emphasize the sense in which this is not a typical hook. It uses localStorage to synchronize state. That means it won't actually update in real time & only makes sense on different routes. 


## 5. Adding performance — memoization

Talk about the render cycle. At what point does React decide to rerender a component. Shallow comparison versus nested comparison.




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