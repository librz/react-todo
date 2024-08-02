export interface ITodoItem {
  id: string;
  description: string;
}

export type ITodoAction =
  | {
      type: "set";
      payload: ITodoItem[];
    }
  | {
      type: "select";
      payload: Pick<ITodoItem, "id">;
    }
  | {
      type: "add";
      payload: ITodoItem;
    }
  | {
      type: "delete";
      payload: Pick<ITodoItem, "id">;
    };
