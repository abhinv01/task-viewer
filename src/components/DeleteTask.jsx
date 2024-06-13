import React, { useContext } from "react";
import { PContext } from "./HeadComp";

function DeleteTask({ task }) {
  const { taskList, setTaskList } = useContext(PContext);

  const deleteTask = (id) => {
    const index = taskList.findIndex((card) => card.id === id);
    const newTaskList = [...taskList];
    newTaskList.splice(index, 1);

    console.log(newTaskList);
    localStorage.setItem("taskList", JSON.stringify(newTaskList));

    setTaskList(newTaskList);
  };
  return (
    <>
      <button
        onClick={() => deleteTask(task.id)}
        className="mx-auto px-4 py-1 bg-red-300 rounded-md hover:bg-red-500 hover:font-semibold "
      >
        Delete ❌
      </button>
    </>
  );
}

export default DeleteTask;
