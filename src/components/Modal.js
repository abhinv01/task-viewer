import React from "react";

function Modal({ handleInput, handleAdd, setShowModal, taskData, details }) {
  return (
    <div className="fixed z-10 flex items-center justify-center overflow-y-auto inset-0 bg-slate-950 bg-opacity-25">
      <div className="border-2 bg-white rounded-md w-9/12 max-w-2xl px-3 md:px-6 py-4 md:py-8">
        <span className="flex justify-between">
          <h3 className="font-bold text-xl">
            {details?.head || "Add New Task"}
          </h3>
          <button
            className="font-bold text-lg text-gray-400 rotate-45"
            onClick={() => setShowModal(false)}
          >
            ➕
          </button>
        </span>
        <span>
          <form className="my-6">
            <label
              className="block text-gray-400 uppercase text-sm mt-2 font-bold"
              htmlFor="title"
            >
              Title
            </label>
            <input
              value={taskData.title}
              onChange={handleInput}
              id="title"
              name="title"
              required
              type="text"
              className="w-full border-2 rounded bg-gray-100 p-2 focus:outline-none focus:border-gray-400 focus:border-2"
            />
            {!taskData.title && (
              <p className="font-Noto text-xs text-red-600">Required*</p>
            )}

            <label
              className="block text-gray-400 uppercase text-sm mt-2 font-bold"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              value={taskData.description}
              onChange={handleInput}
              id="description"
              name="description"
              rows={4}
              type="text"
              className="w-full border-2 rounded bg-gray-100 p-2 focus:outline-none focus:border-gray-400 focus:border-2"
            />
            {!taskData.description && (
              <p className="font-Noto text-xs text-red-600">Required*</p>
            )}
          </form>
        </span>
        <div className="text-center ">
          <button
            onClick={() => handleAdd(taskData.id)}
            className="px-4 py-1 bg-sky-300 rounded-md hover:bg-sky-500 hover:font-semibold"
          >
            {details?.button || "Done"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
