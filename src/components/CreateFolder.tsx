import React, { useState } from "react";

import { IFolder } from "../models/IFolder";
import { folderAPI } from "../services/FolderService";

interface CreateFolderProps {
  //   onCreate: (folder: IFolder) => void;
  close: () => void;
}

function CreateFolder({ close }: CreateFolderProps) {
  const [createFolder, {}] = folderAPI.useCreateFolderMutation();

  const [title, setValue] = useState("");
  const [error, setError] = useState("");

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    await createFolder({ title, body: title } as IFolder);

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

      {/* {error && <ErrorMessage error={error} />} */}

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
