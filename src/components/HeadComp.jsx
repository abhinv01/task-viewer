import React, { useState, createContext, useEffect } from "react";
import AddTask from "./AddTask.jsx";
import Todo from "./Todo.jsx";
import { useDrop } from "react-dnd";

export const PContext = createContext();

function HeadComp() {
  const [taskList, setTaskList] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [timeStampList, settimeStampList] = useState([]);
  const value = { taskList, setTaskList, completed, setCompleted };

  useEffect(() => {
    const storedTasks = localStorage.getItem("taskList");
    const completedStored = localStorage.getItem("completedTask");
    if (storedTasks) {
      setTaskList(JSON.parse(storedTasks));
    }
    if (completedStored) {
      // setCompleted(JSON.parse(completedStored));
    }
  }, []);

  const [, drop] = useDrop(() => ({
    accept: "todo",
    drop: (item) =>
      addToCompleted(
        item.id,
        item.title,
        item.description,
        item.timeStamp,
        item.duration
      ),
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
  }));

  const addToCompleted = (id, title, description, timeStamp, duration) => {
    const moveTask = taskList.filter((task) => id === task.id);

    // console.log(moveTask, id, title, description, timeStamp, duration);
    setCompleted((prev) => {
      localStorage.setItem(
        "completedTask",
        JSON.stringify([
          ...prev,
          { moveTask, title, description, id: timeStamp, duration },
        ])
      );

      return [
        ...prev,
        { moveTask, title, description, id: timeStamp, duration },
      ];
    });

    // console.log(id, title, description, timeStamp, duration);
    settimeStampList((prev) => {
      return [...prev, timeStamp];
    });

    // const index = taskList.findIndex((card,) => card.id === timeStamp);
    // console.log(index);
    // const newTaskList = [...taskList];
    // newTaskList.splice(index, 1);

    // localStorage.setItem("taskList", JSON.stringify(newTaskList));

    // setTaskList(newTaskList);
  };

  return (
    <>
      <PContext.Provider value={value}>
        <div className="py-4">
          <div className="mx-1 md:mx-4 rounded px-6 py-4 bg-gradient-to-r from-blue-200 from-10% via-blue-100 via-30% to-blue-200 to-90% ">
            <h1 className="text-xl font-extrabold ">The Task Viewer</h1>
            <span>
              Click{" "}
              <span>
                <AddTask taskList={taskList} setTaskList={setTaskList} />{" "}
              </span>
              to add new task
            </span>
          </div>

          <div className="py-4">
            <div className="mx-1 md:mx-4 rounded px-6 py-1 font-medium bg-gradient-to-r from-violet-400 from-10% via-violet-300 via-40% to-violet-400 to-90% ">
              {/* <h1 className="text-xl font-extrabold ">The Task Viewer</h1> */}
              <span>Drag the task to completed section</span>
            </div>
          </div>

          <div className="flex flex-row gap-1 md:gap-3 mx-1 md:mx-4 ">
            <div className="rounded w-8/12 sm:w-1/2 my-4 flex flex-col">
              <span className="bg-slate-300 rounded w-full max-w-2xl inline-block px-6 py-3 text-lg font-bold">
                To Do:
              </span>
              {taskList.map((task, ind) => {
                const timeLst = completed.map((item) => item.id);
                if (!timeLst.includes(task.id)) {
                  return (
                    <Todo
                      key={ind}
                      index={ind}
                      task={task}
                      timeStampList={timeStampList}
                    ></Todo>
                  );
                } else {
                  return "";
                }
              })}

              {/* <div className="custom-scrollbar overflow-y-auto max-h-128"></div> */}
            </div>

            <div
              className="rounded w-8/12 sm:w-1/2 my-4 flex flex-col "
              ref={drop}
            >
              <span className="bg-slate-300 rounded w-full max-w-2xl inline-block px-6 py-3 text-lg font-bold">
                Completed:
              </span>
              {completed.map((task, ind) => (
                <Todo key={ind} task={task} disabld={true}></Todo>
              ))}
            </div>
          </div>
        </div>
      </PContext.Provider>
    </>
  );
}

export default HeadComp;
