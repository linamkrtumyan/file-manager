import React from "react";
import { useParams } from "react-router-dom";
import CreateActions from "../components/CreateActions";
import File from "../components/File";
import { IFile } from "../models/IFile";
import { fileAPI } from "../services/FileService";

function Folder() {
  const { data: files } = fileAPI.useFetchAllFilesQuery(100);
  const [updateFile, {}] = fileAPI.useUpdateFileMutation();
  const [deleteFile, {}] = fileAPI.useDeleteFileMutation();
  let { folderId } = useParams();

  const handleRemoveFile = (file: IFile) => {
    deleteFile(file);
  };

  const handleUpdateFile = (file: IFile) => {
    updateFile(file);
  };

  return (
    <>
      <CreateActions onlyFile={true} />

      <div className="flex flex-wrap ">
        {files &&
          files
            .filter(
              (file) => file.folderId == folderId && file.isActive === true
            )
            .map((file) => (
              <File
                remove={handleRemoveFile}
                update={handleUpdateFile}
                file={file}
                key={file.id}
              />
            ))}
      </div>
    </>
  );
}

export default Folder;
