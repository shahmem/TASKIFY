import React, { useState } from "react";
import bg from '../assets/img/bg.jpg'

const TodoApp = () => {
  const bgStyle = {
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
};
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [task, setTask] = useState("");

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { id: Date.now(), text: task, isEditing: false }]);
      setTask("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };
 

  const editTask = (id) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, isEditing: !task.isEditing } : task)));
  };

  const saveTask = (id, newText) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, text: newText, isEditing: !task.isEditing } : task)));
  };


  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  }
  const clearTask = () => {
    setCompletedTasks([]);
  }

  const completeTask = (id) => {
    const taskToComplete = tasks.find(task => task.id === id);
    if (taskToComplete) {
      setCompletedTasks([...completedTasks, taskToComplete]);
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  return (
    <>
    <div style={bgStyle} className="h-screen pt-20 md:pt-28 overflow-auto">
    <div  className="md:p-6 p-2  max-w-2xl mx-auto bg-[#ffffff09] backdrop-blur-sm rounded-lg shadow-md">
      <div className="mb-4 flex gap-1">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter anything..."
          className="w-full  placeholder-gray-300 text-white bg-[#00000066] px-4 py-2  rounded-lg focus:outline-none  focus:border-blue-300"
        />
        <button
          onClick={addTask}
          className=" bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Add 
        </button>
      </div>
      {tasks.length > 0 && (
      <>
      <br /><br />
      <h2 className="text-xl font-semibold text-white mb-2">Todos</h2>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between p-2 bg-gray-100 rounded-lg shadow-sm"
          >
            <input
              type="checkbox"
              onChange={() => completeTask(task.id)}
              className="mr-2"
            />
            {task.isEditing ? (
              <input
                type="text"
                defaultValue={task.text}
                onBlur={(e) => saveTask(task.id, e.target.value)}
                className="flex-grow px-2 py-1 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            ) : (
              <span className="flex-grow">{task.text}</span>
            )}
            <button
              onClick={() => editTask(task.id)}
              className="text-sm text-blue-500 hover:underline mr-2"
            >
              {task.isEditing ? "Save" : "Edit"}
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-sm text-red-500 hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      </>
      )}

      {completedTasks.length > 0 && (
        <>
        <div className="flex justify-between mt-6">
        <h2 className="text-xl font-semibold  text-white mb-2">Completed Tasks</h2>
        <button onClick={() => clearTask()} className="px-2 py-1 text-sm h-min bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none">Clear All</button>
        </div>
          <ul className="space-y-2">
            {completedTasks.map((task) => (
              <li
                key={task.id}
                className="p-2 bg-green-100 rounded-lg shadow-sm"
              >
                {task.text}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
    </div>
    </>
  );
};

export default TodoApp;