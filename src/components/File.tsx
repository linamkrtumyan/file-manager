import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdDeleteOutline,
  MdModeEditOutline,
  MdCheckCircleOutline,
  MdRestore,
} from "react-icons/md";
import { IFile } from "../models/IFile";

interface FileProps {
  file: IFile;
  remove: (file: IFile) => void;
  update: (file: IFile) => void;
}

function File({ file, remove, update }: FileProps) {
  const history = useNavigate();

  const [updName, setUpdName] = useState(false);
  const [title, setTitle] = useState(file.title);

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setUpdName(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const handleRemove = (event: React.MouseEvent) => {
    event.stopPropagation();
    remove(file);
  };

  const handleUpdate = (event: React.MouseEvent) => {
    setUpdName(true);
  };
  const handleSubmitUpdate = (event: React.MouseEvent) => {
    update({ ...file, title });
    setUpdName(false);
  };

  const handleDelete = (event: React.MouseEvent) => {
    update({ ...file, isActive: false });
  };

  const handleRestore = (event: React.MouseEvent) => {
    update({ ...file, isActive: true });
  };

  const showContent = () => {
    history(`/file/${file.id}`);
  };

  return (
    <>
      <div className="w-25 p-6 m-3 rounded overflow-hidden shadow-lg flex flex-col justify-center align-middle">
        <div
          className={file.isActive ? "cursor-pointer" : ""}
          onClick={file.isActive ? showContent : () => {}}
        >
          <img src={require("../img/file.svg").default} alt="file icon" />
        </div>

        <div ref={wrapperRef}>
          <div className=" text-sm mb-2">
            {updName ? (
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                id="first_name"
                className="border py-2 px-2 mb-2   outline-none rounded"
                required
              />
            ) : (
              <p>{file.title}</p>
            )}
          </div>
          <button
            // onClick={handleRemove}
            onClick={file.isActive ? handleDelete : handleRestore}
            className="w-full flex items-center justify-center bg-transparent hover:bg-lime-500 text-lime-500 font-semibold hover:text-white p-1 m-1 border border-lime-500 hover:border-transparent rounded"
          >
            {file.isActive ? (
              <>
                {" "}
                <MdDeleteOutline /> Delete
              </>
            ) : (
              <>
                {" "}
                <MdRestore /> Restore{" "}
              </>
            )}
          </button>

          {!file.isActive ? (
            <button
              onClick={handleRemove}
              className="w-full flex items-center justify-center bg-lime-500 hover:bg-lime-700 text-white font-bold p-1 m-1 border border-lime-00 rounded"
            >
              <MdDeleteOutline /> Remove
            </button>
          ) : (
            <button
              onClick={updName ? handleSubmitUpdate : handleUpdate}
              className="w-full flex items-center justify-center bg-lime-500 hover:bg-lime-700 text-white font-bold p-1 m-1 border border-lime-00 rounded"
            >
              {updName ? (
                <>
                  <MdCheckCircleOutline /> Save
                </>
              ) : (
                <>
                  <MdModeEditOutline /> Edit
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default File;
