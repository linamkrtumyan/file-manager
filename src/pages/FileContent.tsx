import React, { useState, useEffect } from "react";
import { fileAPI } from "../services/FileService";
import { useParams } from "react-router-dom";
import { IFile } from "../models/IFile";
import NoData from "../components/NoData";

function FileContent() {
  let { fileId } = useParams();

  const { data: file, isLoading } = fileAPI.useFetchFileByIdQuery(fileId);

  const [body, setBody] = useState("");
  const [updateFile, {}] = fileAPI.useUpdateFileMutation();

  function handleUpdateFile(file: IFile) {
    updateFile({ ...file, body });
  }

  const handleUpdate = (event: React.MouseEvent) => {
    if (file) {
      handleUpdateFile(file);
    }
  };

  useEffect(() => {
    if (!isLoading && file) {
      setBody(file.body!);
    }
  }, [isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!file) {
    return <NoData />;
  }

  return (
    <div className="m-8">
      <label
        htmlFor="message"
        className="block mb-2 text-base font-medium text-black"
      >
        {file && file.title}
      </label>
      <textarea
        id="message"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={4}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
      ></textarea>

      <button
        className="py-2 px-4 border bg-yellow-400 hover:text-white mt-4 "
        onClick={handleUpdate}
      >
        Save changes
      </button>
    </div>
  );
}

export default FileContent;
