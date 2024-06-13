import React, { useRef, useState, useEffect, useContext } from "react";
import { PContext } from "./HeadComp";

function Timer({ task }) {
  const [time, setTime] = useState(task.duration);
  const [strStp, setStrStp] = useState("Start");
  const { taskList, setTaskList } = useContext(PContext);

  //   const [isRunning,setIsRunning] = useState(false)
  const intervalRef = useRef({ timerOn: false, timer: null });

  const startStop = () => {
    if (!intervalRef.current.timerOn) {
      console.log("Starting timer");
      intervalRef.current.timerOn = true;
      intervalRef.current.timer = setInterval(() => {
        setStrStp("Stop");
        setTime((prev) => {
          let { d, h, m, s, ms } = prev;
          ms++;
          if (ms === 100) {
            s++;
            ms = 0;
          }
          if (s === 60) {
            m++;
            s = 0;
          }
          if (m === 60) {
            h++;
            m = 0;
          }
          if (h === 24) {
            d++;
            h = 0;
          }
          return { d, h, m, s, ms };
        });
      }, 10);
    } else {
      console.log("Stopping timer");

      //Add timer to duration when hit stop
      const index = taskList.indexOf(task);
      const newTaskList = [...taskList];
      newTaskList[index]["duration"] = time;
      localStorage.setItem("taskList", JSON.stringify(newTaskList));
      setTaskList(newTaskList);
      // Done storing value

      setStrStp("Start");
      clearInterval(intervalRef.current.timer);
      intervalRef.current.timerOn = false;
    }
  };

  const reset = () => {
    //Add timer to duration when hit stop
    const index = taskList.indexOf(task);
    const newTaskList = [...taskList];
    newTaskList[index]["duration"] = { ms: 0, s: 0, m: 0, h: 0, d: 0 };
    localStorage.setItem("taskList", JSON.stringify(newTaskList));
    setTaskList(newTaskList);
    // Done storing value

    clearInterval(intervalRef.current.timer);
    intervalRef.current.timerOn = false;
    setTime({ ms: 0, s: 0, m: 0, h: 0, d: 0 });
  };

  useEffect(() => {
    // console.log("usf");
    const interval = intervalRef.current.timer;

    // Cleanup function to clear interval when component unmounts
    return () => {
      clearInterval(interval);
    };
  }, [intervalRef.current.timer]);

  return (
    <div className="flex flex-wrap justify-evenly my-2 w-full">
      <div className="font-IBM text-sm font-medium cursor-help">
        <span title="days" className="text-lg">
          {time.d ? time.d + ":" : ""}
        </span>
        <span title="hours">{time.h >= 10 ? time.h : "0" + time.h}</span>:
        <span title="minutes">{time.m >= 10 ? time.m : "0" + time.m}</span>:
        <span title="seconds">{time.s >= 10 ? time.s : "0" + time.s}</span>:
        <span title="mili-seconds" className="text-xs">
          {time.ms >= 10 ? time.ms : "0" + time.ms}
        </span>
      </div>
      <div className="flex gap-3 text-sm">
        <button
          onClick={startStop}
          className="py-0.5 px-1.5 bg-gray-300 active:bg-gray-400"
        >
          {strStp}
        </button>
        <button
          onClick={reset}
          className="py-0.5 px-1.5 bg-gray-300 active:bg-gray-400"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
export default Timer;
