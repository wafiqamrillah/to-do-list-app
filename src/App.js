import './App.css';
import Header from './Components/Layouts/Header';
import ToDoListForm from './Components/ToDoList/ToDoListForm';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPencilAlt, faTrash, faEdit, faCheck } from '@fortawesome/free-solid-svg-icons';

library.add( faPencilAlt, faTrash, faEdit, faCheck );

export default function App() {
  return (
    <div className="App bg-gray-300 font-sans text-base lg:text-sm antialiased">
      <Header title="To Do List"/>
      <div className="relative container mx-auto">
        <div className="fixed inset-0">
          <div className="flex items-center justify-center min-h-screen text-center">
            <ToDoListForm/>
          </div>
        </div>
      </div>
    </div>
  );
}
