import { IToDo } from '@/models/IToDo';

export type TodoItemProps = {
   todo: IToDo;
   onIsEditing: (id: number) => void;
};
