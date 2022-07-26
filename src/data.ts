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
  { label: 'High', value: 4, icon: "🟥" },
  { label: 'Medium', value: 3, icon: "🟧" },
  { label: 'Low', value: 2, icon: "🟨" },
  { label: "None", value: 1, icon: "⬜️" },
] as const
export type Priority = typeof priorities[number];


export const users = [
  { id: 0, label: 'Gadisa' },
  { id: 1, label: 'Mehdi' },
  { id: 1, label: 'Henk' },
  { id: 1, label: 'Ayşe' },
]
export type User = typeof users[number];

export interface TodoItem {
  id: number;
  value: string;
  completed: boolean;
  status: Status['value'];
  priority: Priority['value'];
  assigned?: User['id'];
}
export const defaultTodoItem: Omit<TodoItem, "id"> = {
  value: "",
  completed: false,
  status: 'todo',
  priority: 1
};

export const defaultTodos: TodoItem[] = [
  { id: 0, value: 'Learn JavaScript', completed: false, status: "done", priority: 1 },
  { id: 1, value: 'Learn React', completed: false, status: "in_progress", priority: 1 },
  { id: 2, value: 'Learn TypeScript', completed: false, status: "in_progress", priority: 1 },
  { id: 3, value: 'Learn React Native', completed: false, status: "todo", priority: 1 },
  { id: 4, value: 'Learn GraphQL', completed: false, status: "todo", priority: 1 },
  { id: 5, value: 'Learn Next.js', completed: false, status: "todo", priority: 1 },
  { id: 6, value: 'Learn Node.js', completed: false, status: "todo", priority: 1 },
  { id: 7, value: 'Learn MongoDB', completed: false, status: "todo", priority: 1 },
  { id: 8, value: 'Learn SQL', completed: false, status: "todo", priority: 1 },
  { id: 9, value: 'Learn Python', completed: false, status: "in_progress", priority: 1 },
  { id: 10, value: 'Learn Java', completed: false, status: "in_progress", priority: 1 },
  { id: 11, value: 'Learn C++', completed: false, status: "in_progress", priority: 1 },
  { id: 12, value: 'Learn C#', completed: false, status: "todo", priority: 1 },
  { id: 13, value: 'Learn Go', completed: false, status: "todo", priority: 1 },
  { id: 14, value: 'Learn Rust', completed: false, status: "todo", priority: 1 },
  { id: 15, value: 'Learn Kotlin', completed: false, status: "todo", priority: 1 },
  { id: 16, value: 'Learn Swift', completed: false, status: "todo", priority: 1 },
  { id: 17, value: 'Learn Elixir', completed: false, status: "todo", priority: 1 },
  { id: 18, value: 'Learn Ruby', completed: false, status: "todo", priority: 1 },
  { id: 19, value: 'Learn PHP', completed: false, status: "todo", priority: 1 },
];
