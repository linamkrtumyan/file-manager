import React, { useState } from "react";
import { IFile } from "../models/IFile";
import { fileAPI } from "../services/FileService";
import { useParams } from "react-router-dom";

interface CreateFileProps {
  close: () => void;
}

function CreateFolder({ close }: CreateFileProps) {
  let { folderId } = useParams();

  const [createFile, {}] = fileAPI.useCreateFileMutation();

  const [title, setValue] = useState("");
  const [error, setError] = useState("");

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    await createFile({
      title,
      body: "",
      folderId: folderId ? folderId : null,
      isActive: true,
    } as IFile);

    close();
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        className="border py-2 px-4 mb-2  w-full outline-none"
        placeholder="Enter product title..."
        value={title}
        onChange={changeHandler}
      />


      <button
        type="submit"
        className="py-2 px-4 border bg-yellow-400 hover:text-white"
      >
        Create
      </button>
    </form>
  );
}

export default CreateFolder;
