import React, { useContext } from "react";
import { PContext } from "./HeadComp";

function DeleteTask({ task, disabld }) {
  const { taskList, setTaskList, completed, setCompleted } =
    useContext(PContext);

  const deleteTask = (id) => {
    if (disabld === true) {
      const index = completed.findIndex((card) => card.id === id);
      let newTaskList = [...completed];
      newTaskList.splice(index, 1);

      console.log(newTaskList);
      localStorage.setItem("completedTask", JSON.stringify(newTaskList));

      setCompleted(newTaskList);
    } else {
      const index = taskList.findIndex((card) => card.id === id);
      let newTaskList = [...taskList];
      newTaskList.splice(index, 1);

      console.log(newTaskList);
      localStorage.setItem("taskList", JSON.stringify(newTaskList));
      setTaskList(newTaskList);
    }
  };
  return (
    <>
      <button
        onClick={() => deleteTask(task.id)}
        className="mx-auto px-4 py-1 bg-red-300 rounded-md hover:bg-red-500 hover:font-semibold disabled:bg-gray-600"
      >
        Delete ❌
      </button>
    </>
  );
}

export default DeleteTask;
