import EditTask from "./EditTask.jsx";
import DeleteTask from "./DeleteTask.jsx";
import Timer from "./Timer.jsx";

function Todo({ task }) {
  //   const start = () => {
  //     run();
  //     setInterval(run, 10);
  //   };

  return (
    <>
      <div className="border-2 max-w-md min-h-40 my-4 bg-white p-4 rounded-lg flex flex-col items-start">
        <div className="flex flex-row justify-between w-full">
          <h1 className="font-semibold text-neutral-950 text-md capitalize">
            {task.title}
          </h1>
          <EditTask task={task}></EditTask>
        </div>
        <div
          className="opacity-80 text-neutral-950 text-sm mb-auto py-5 "
          style={{ whiteSpace: "pre-wrap" }}
        >
          {task.description}
        </div>
        <Timer task={task}></Timer>

        <DeleteTask task={task}></DeleteTask>
      </div>
    </>
  );
}

export default Todo;
