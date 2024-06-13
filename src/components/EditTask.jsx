import React, { useState, useContext, useEffect } from "react";
import { PContext } from "./HeadComp";
import Modal from "./Modal";

function EditTask({ task }) {
  const [editModal, setEditModal] = useState(false);
  const [taskData, setTaskData] = useState({});

  useEffect(() => {
    setTaskData(task);
  }, [task]);

  const { taskList, setTaskList } = useContext(PContext);

  const handleAdd = (id) => {
    if (taskData.title && taskData.description) {
      const index = taskList.findIndex((card) => card.id === id);
      const newTaskList = [...taskList];
      newTaskList[index] = { ...taskData };

      localStorage.setItem("taskList", JSON.stringify(newTaskList));

      // console.log(newTaskList);
      setTaskList(newTaskList);
      setEditModal(false);
    }
  };

  const handleInput = (e) => {
    setTaskData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <button
        onClick={() => {
          setEditModal(true);
        }}
        className="px-4 py-1 bg-indigo-300 rounded-md hover:bg-indigo-500 hover:font-semibold "
      >
        Edit 🖊
      </button>

      {editModal ? (
        <Modal
          handleInput={handleInput}
          handleAdd={handleAdd}
          setShowModal={setEditModal}
          taskData={taskData}
          details={{ head: "Update Task", button: "Update" }}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default EditTask;
