export const statuses = [
  { label: 'In Review', value: "in_review", icon: "🙇" },
  { label: 'In Progress', value: "in_progress", icon: "🏃" },
  { label: 'Todo', value: "todo", icon: "📥" },
  { label: 'Done', value: "done", icon: "☑️" },
  { label: 'Canceled', value: "canceled", icon: "🗑" }
] as const;
export type Status = typeof statuses[number];


export const priorities = [
  { label: 'Urgent', value: 5, icon: "🔥" },
  { label: 'High', value: 4, icon: "🟧" },
  { label: 'Medium', value: 3, icon: "🟨" },
  { label: 'Low', value: 2, icon: "🟩" },
  { label: 'None', value: 1, icon: "⬜️" },
] as const;
export type Priority = typeof priorities[number];
export const defaultUsers = [
  { name: "John Doe", id: 0 },
  { name: "Jane Doe", id: 1 },
];

export type User = typeof defaultUsers[number];
type UserName = User['name'];
export interface TodoItem {
  id: number;
  value: string;
  completed: boolean;
  status: Status['value'];
  priority: Priority['value'];
  assigned: User['id'][];
}
export const defaultTodoItem: Omit<TodoItem, "id"> = {
  value: "",
  completed: false,
  status: 'todo',
  priority: 1,
  assigned: []
};

export const defaultTodos: TodoItem[] = [
  { id: 0, priority: 5, value: 'Learn JavaScript', completed: false, assigned: [], status: "done" },
  { id: 1, priority: 5, value: 'Learn React', completed: false, assigned: [], status: "in_progress" },
  { id: 2, priority: 4, value: 'Learn TypeScript', completed: false, assigned: [], status: "in_progress" },
  { id: 3, priority: 1, value: 'Learn React Native', completed: false, assigned: [], status: "todo" },
  { id: 4, priority: 1, value: 'Learn GraphQL', completed: false, assigned: [], status: "todo" },
  { id: 5, priority: 3, value: 'Learn Next.js', completed: false, assigned: [], status: "todo" },
  { id: 6, priority: 1, value: 'Learn Node.js', completed: false, assigned: [], status: "todo" },
  { id: 7, priority: 1, value: 'Learn MongoDB', completed: false, assigned: [], status: "todo" },
  { id: 8, priority: 1, value: 'Learn SQL', completed: false, assigned: [], status: "todo" },
  { id: 9, priority: 1, value: 'Learn Python', completed: false, assigned: [], status: "in_progress" },
  { id: 10, priority: 1, value: 'Learn Java', completed: false, assigned: [], status: "in_progress" },
  { id: 11, priority: 1, value: 'Learn C++', completed: false, assigned: [], status: "in_progress" },
  { id: 12, priority: 1, value: 'Learn C#', completed: false, assigned: [], status: "todo" },
  { id: 13, priority: 1, value: 'Learn Go', completed: false, assigned: [], status: "todo" },
  { id: 14, priority: 1, value: 'Learn Rust', completed: false, assigned: [], status: "todo" },
  { id: 15, priority: 1, value: 'Learn Kotlin', completed: false, assigned: [], status: "todo" },
  { id: 16, priority: 1, value: 'Learn Swift', completed: false, assigned: [], status: "todo" },
  { id: 17, priority: 1, value: 'Learn Elixir', completed: false, assigned: [], status: "todo" },
  { id: 18, priority: 1, value: 'Learn Ruby', completed: false, assigned: [], status: "todo" },
  { id: 19, priority: 1, value: 'Learn PHP', completed: false, assigned: [], status: "todo" },
];
