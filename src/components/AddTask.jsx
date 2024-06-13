import { useState } from "react";
import Modal from "./Modal";
const initial = { description: "", title: "", id: null };

const AddTask = ({ taskList, setTaskList }) => {
  const [showModal, setShowModal] = useState(false);
  const [taskData, setTaskData] = useState(initial);

  const handleAdd = () => {
    if (taskData.title && taskData.description) {
      const timeStamp = new Date().getTime();
      const temp = [
        ...taskList,
        {
          ...taskData,
          id: timeStamp,
          duration: { d: 0, h: 0, m: 0, s: 0, ms: 0 },
        },
      ];
      localStorage.setItem("taskList", JSON.stringify(temp));

      setTaskList(temp);
      setTaskData(initial);
      setShowModal(false);
    }
  };

  const handleInput = (e) => {
    setTaskData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="px-4 py-1 bg-sky-300 rounded-md hover:bg-sky-500 hover:font-semibold"
      >
        +Add
      </button>

      {showModal ? (
        <Modal
          handleInput={handleInput}
          handleAdd={handleAdd}
          setShowModal={setShowModal}
          taskData={taskData}
          details={{ head: "Add new task", button: "Create Task" }}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default AddTask;
