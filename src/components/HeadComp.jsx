import React, { useState, createContext, useEffect } from "react";
import AddTask from "./AddTask.jsx";
import Todo from "./Todo.jsx";

export const PContext = createContext();

function HeadComp() {
  const [taskList, setTaskList] = useState([]);
  const value = { taskList, setTaskList };

  useEffect(() => {
    const storedTasks = localStorage.getItem("taskList");
    if (storedTasks) {
      setTaskList(JSON.parse(storedTasks));
    }
  }, []);

  return (
    <>
      <PContext.Provider value={value}>
        <div className="py-4">
          <div className="mx-4 rounded px-6 py-4 bg-gradient-to-r from-blue-200 from-10% via-blue-100 via-30% to-blue-200 to-90% ">
            <h1 className="text-xl font-extrabold ">The Task Viewer</h1>
            <span>
              Click <AddTask taskList={taskList} setTaskList={setTaskList} /> to
              add new task
            </span>
          </div>

          <div className="ml-4 rounded w-8/12 sm:w-1/2 my-4 border-2">
            <span className="bg-slate-300 rounded w-full max-w-2xl inline-block px-6 py-3 text-lg font-bold">
              To Do:
            </span>
            {taskList.map((task, ind) => (
              <Todo task={task}></Todo>
            ))}
            <div className="custom-scrollbar overflow-y-auto max-h-128"></div>
          </div>
        </div>
      </PContext.Provider>
    </>
  );
}

export default HeadComp;
