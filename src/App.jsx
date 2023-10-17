import React, { useEffect } from 'react';
import { useState } from 'react';
import 'tailwindcss/base.css'; // Add this import
import 'tailwindcss/components.css'; // Add this import
import 'tailwindcss/utilities.css'; // Add this import

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [completedTodos, setCompletedTodos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    };

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
  };

  const handleDeleteTodo = (index) => {
    let reducedToDo = [...allTodos];
    reducedToDo.splice(index, 1);
    localStorage.setItem('todolist', JSON.stringify(reducedToDo));
    setTodos(reducedToDo);
  }

  const handleDeleteCompletedTodo = (index) => {
    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.splice(index, 1);
    setCompletedTodos(updatedCompletedArr);
  }

  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = `${dd}-${mm}-${yyyy} at ${h}:${m}:${s}`;

    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn,
    };

    let updatecompletedArr = [...completedTodos];
    updatecompletedArr.push(filteredItem);
    setCompletedTodos(updatecompletedArr);
  };

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    if (savedTodo) {
      setTodos(savedTodo);
    }
  }, []);

  const filteredTodoList = allTodos.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCompletedList = completedTodos.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-100 h-screen">
      <h1 className="text-2xl text-center py-4">My Tools</h1>
      <div className="flex justify-center">
        <div className="w-full max-w-lg">
          <div className="bg-white p-4 shadow-md rounded-lg">
            <div className="flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full p-2 border border-gray-400 rounded-md shadow-sm"
              />
            </div>
            <div className="flex justify-between mt-4">
              <div className="w-2/3">
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Task Title"
                  className="w-full p-2 border border-gray-400 rounded-md shadow-sm"
                />
              </div>
              <div className="w-1/3 pl-2">
                <input
                  type="text"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Task Description"
                  className="w-full p-2 border border-gray-400 rounded-md shadow-sm"
                />
              </div>
              <button
                type="button"
                onClick={handleAddTodo}
                className="px-4 py-2 ml-2 text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <button
          className={`mx-4 py-2 px-4 ${isCompleteScreen === false ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setIsCompleteScreen(false)}
        >
          Todo
        </button>
        <button
          className={`mx-4 py-2 px-4 ${isCompleteScreen === true ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setIsCompleteScreen(true)}
        >
          Completed
        </button>
      </div>
      <div className="flex justify-center mt-4">
        <div className="w-full max-w-lg">
          {isCompleteScreen === false && (
            <div className="bg-white p-4 shadow-md rounded-lg">
              {filteredTodoList.map((item, index) => (
                <div key={index} className="mb-2 p-2 border border-gray-400 rounded-md shadow-md">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p>{item.description}</p>
                  <button
                    onClick={() => handleDeleteTodo(index)}
                    className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleComplete(index)}
                    className="ml-2 px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-700"
                  >
                    Complete
                  </button>
                </div>
              ))}
            </div>
          )}
          {isCompleteScreen === true && (
            <div className="bg-white p-4 shadow-md rounded-lg">
              {filteredCompletedList.map((item, index) => (
                <div key={index} className="mb-2 p-2 border border-gray-400 rounded-md shadow-md">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p>{item.description}</p>
                  <p className="text-sm">Completed On: {item.completedOn}</p>
                  <button
                    onClick={() => handleDeleteCompletedTodo(index)}
                    className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
