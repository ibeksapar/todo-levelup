import { AddTodo, TodoList } from '@/components';

import { HomePageContainer } from './HomePage.styled';

export function HomePage() {
   return (
      <HomePageContainer>
         <AddTodo />
         <TodoList />
      </HomePageContainer>
   );
}
