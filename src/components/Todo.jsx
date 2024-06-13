import EditTask from "./EditTask.jsx";
import DeleteTask from "./DeleteTask.jsx";
import Timer from "./Timer.jsx";
import { useDrag } from "react-dnd";

function Todo({ task, index, disabld }) {
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

  return (
    <>
      <div
        style={{ opacity: isDragging ? 0.9 : 1 }}
        ref={drag}
        className="border-2 max-w-md min-h-40 my-2 mx-2 sm:mx-0 bg-white p-4 rounded-lg flex flex-col items-start"
      >
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
