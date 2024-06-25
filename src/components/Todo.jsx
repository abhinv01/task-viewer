import EditTask from "./EditTask.jsx";
import DeleteTask from "./DeleteTask.jsx";
import Timer from "./Timer.jsx";
import { useDrag } from "react-dnd";
import Checkbox from "./checkbox.jsx";
import React, { useState, useContext } from "react";
import { PContext } from "./HeadComp";

function Todo({ task, index, disabld }) {
  const [isCheck, setIsCheck] = useState(task.isCheck);
  const { taskList, setTaskList, completed, setCompleted } =
    useContext(PContext);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "todo",
    item: {
      id: index,
      title: task.title,
      description: task.description,
      timeStamp: task.id,
      duration: task.duration,
    },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  }));
  //   const start = () => {
  //     run();
  //     setInterval(run, 10);
  //   };

  const handleCompleteCheck = (val) => {
    if (val === false) {
      console.log("IF BLOCK", val);

      setIsCheck(true);

      //user marked as complete
      const index = taskList.findIndex((card) => card.id === task.id);
      let newTaskList = [...taskList];
      let removedTask = newTaskList.splice(index, 1);

      localStorage.setItem("taskList", JSON.stringify(newTaskList));

      setTaskList(newTaskList);

      setCompleted((prev) => {
        removedTask[0].isCheck = !val;
        localStorage.setItem(
          "completedTask",
          JSON.stringify([...prev, ...removedTask])
        );
        return [...prev, ...removedTask];
      });
    } else {
      console.log("Else");
      setIsCheck(false);

      //user marked as complete
      const index = completed.findIndex((card) => card.id === task.id);
      let newTaskList = [...completed];
      let removedTask = newTaskList.splice(index, 1);

      localStorage.setItem("completedTask", JSON.stringify(newTaskList));

      setCompleted(newTaskList);

      setTaskList((prev) => {
        removedTask[0].isCheck = !val;
        localStorage.setItem(
          "taskList",
          JSON.stringify([...prev, ...removedTask])
        );
        return [...prev, ...removedTask];
      });
    }
  };

  return (
    <>
      <div
        style={{ opacity: isDragging ? 0.9 : 1 }}
        ref={drag}
        className="relative border-2 max-w-md min-h-40 my-2 mx-2 sm:mx-0 bg-white p-4 pt-2 rounded-lg flex flex-col items-start card-todo"
      >
        {" "}
        <div className="self-end mb-2">
          <Checkbox
            label={"complete"}
            isCheck={isCheck}
            onClick={handleCompleteCheck}
          ></Checkbox>
        </div>
        <div className="flex flex-row justify-between w-full">
          <h1 className="font-semibold text-neutral-950 text-md capitalize">
            {task.title}
          </h1>
          <EditTask task={task} disabld={disabld}></EditTask>
        </div>
        <div
          className="opacity-80 text-neutral-950 text-sm mb-auto py-5 "
          style={{ whiteSpace: "pre-wrap" }}
        >
          {task.description}
        </div>
        <Timer task={task} disabld={disabld}></Timer>
        <DeleteTask task={task} disabld={disabld}></DeleteTask>
      </div>
    </>
  );
}

export default Todo;
