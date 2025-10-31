import { IToDo } from '@/models/IToDo';

export type EditTodoProps = {
   isOpen: boolean;
   onClose: () => void;
   todo: IToDo;
};
