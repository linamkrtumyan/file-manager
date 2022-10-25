import React, {  useState, useEffect, useRef } from "react";
import { IFolder } from "../models/IFolder";
import {
  MdDeleteOutline,
  MdModeEditOutline,
  MdCheckCircleOutline,
} from "react-icons/md";
import {  useNavigate } from "react-router-dom";


interface FolderProps {
  folder: IFolder;
  remove: (folder: IFolder) => void;
  update: (folder: IFolder) => void;
}

function Folder({ folder, remove, update }: FolderProps) {
    const history = useNavigate();

  const [updName, setUpdName] = useState(false);
  const [title, setTitle] = useState(folder.title);

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
    remove(folder);
  };

  const handleUpdate = (event: React.MouseEvent) => {
    setUpdName(true);
  };
  const handleSubmitUpdate = (event: React.MouseEvent) => {
    update({ ...folder, title });
    setUpdName(false);
  };

  return (
    <>
      <div  className="w-25 p-6 m-3 rounded overflow-hidden shadow-lg flex flex-col justify-center align-middle">
        <div className="cursor-pointer" onClick={() => history(`${folder.id}`)}>
          <img
            src={require("../img/folder.svg").default}
            alt="Sunset in the mountains"
          />
        </div>

        <div ref={wrapperRef}>
          <div className=" text-sm mb-2">
            {updName ? (
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                id="first_name"
                className="border py-2 px-2 mb-2 outline-none rounded"
                required
              />
            ) : (
              <p>{folder.title}</p>
            )}
          </div>
          <button
            onClick={handleRemove}
            className="w-full flex items-center justify-center bg-transparent hover:bg-yellow-500 text-yellow-500 font-semibold hover:text-white p-1 m-1 border border-yellow-500 hover:border-transparent rounded"
          >
            <MdDeleteOutline /> Delete
          </button>
          <button
            onClick={updName ? handleSubmitUpdate : handleUpdate}
            className="w-full flex items-center justify-center bg-yellow-500 hover:bg-yellow-700 text-white font-bold p-1 m-1 border border-yellow-00 rounded"
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
        </div>
      </div>
    </>
  );
}

export default Folder;
