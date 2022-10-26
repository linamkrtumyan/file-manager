import React, { useContext, useState } from "react";
import CreateActions from "../components/CreateActions";
import File from "../components/File";
import Folder from "../components/Folder";
import Loading from "../components/Loading";
import NoData from "../components/NoData";
import { IFile } from "../models/IFile";
import { IFolder } from "../models/IFolder";
import { fileAPI } from "../services/FileService";
import { folderAPI } from "../services/FolderService";

function RecycleBin() {
  const [limit, setLimit] = useState(100);
  const {
    data: folders,
    error,
    isLoading,
  } = folderAPI.useFetchAllFoldersQuery(limit);

  const { data: files, isLoading: isLoadingFile } =
    fileAPI.useFetchAllFilesQuery(limit);

  const [updateFolder, {}] = folderAPI.useUpdateFolderMutation();
  const [deleteFolder, {}] = folderAPI.useDeleteFolderMutation();

  const [updateFile, {}] = fileAPI.useUpdateFileMutation();
  const [deleteFile, {}] = fileAPI.useDeleteFileMutation();

  const handleRemoveFolder = (folder: IFolder) => {
    deleteFolder(folder);
  };

  const handleUpdateFolder = (folder: IFolder) => {
    updateFolder(folder);
  };
  const handleRemoveFile = (file: IFile) => {
    deleteFile(file);
  };

  const handleUpdateFile = (file: IFile) => {
    updateFile(file);
  };

  if (folders?.length === 0 && files?.length === 0) {
    return <NoData />;
  }

  return (
    <>
      <div className="flex flex-wrap ">
        {folders &&
          folders
            .filter((folder) => folder.isActive === false)
            .map((folder) => (
              <Folder
                remove={handleRemoveFolder}
                update={handleUpdateFolder}
                folder={folder}
                key={folder.id}
              />
            ))}
        {files &&
          files
            .filter((file) => file.isActive === false)
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

export default RecycleBin;
