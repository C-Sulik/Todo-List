export type TodoI = {
  title: string;
  completed: boolean;
  id: number;
};

export type TodoListI = {
  id: number;
  title: string;
  items: TodoI[];
};
