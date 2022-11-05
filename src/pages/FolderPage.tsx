import React, {useState} from "react";
import { useParams } from "react-router-dom";
import CreateActions from "../components/CreateActions";
import File from "../components/File";
import { IFile } from "../models/IFile";
import { fileAPI } from "../services/FileService";
import { folderAPI } from "../services/FolderService";
import { IFolder } from "../models/IFolder";
import Folder from "../components/Folder";

function FolderPage() {
  const { data: files } = fileAPI.useFetchAllFilesQuery(100);
  const [updateFile, {}] = fileAPI.useUpdateFileMutation();
  const [deleteFile, {}] = fileAPI.useDeleteFileMutation();
  let { folderId } = useParams();

  const [limit, setLimit] = useState(100);
  const {
    data: folders,
    error,
    isLoading,
  } = folderAPI.useFetchAllFoldersQuery(limit);

  
  const [updateFolder, {}] = folderAPI.useUpdateFolderMutation();
  const [deleteFolder, {}] = folderAPI.useDeleteFolderMutation();

  const handleRemoveFile = (file: IFile) => {
    deleteFile(file);
  };

  const handleUpdateFile = (file: IFile) => {
    updateFile(file);
  };

  const handleRemoveFolder = (folder: IFolder) => {
    deleteFolder(folder);
  };

  const handleUpdateFolder = (folder: IFolder) => {
    updateFolder(folder);
  };

  return (
    <>
      <CreateActions 
      // onlyFile={true}
       />

      <div className="flex flex-wrap ">

      {folders &&
            folders
              .filter((folder) => folder.isActive === true && folder.parentFolderId == folderId)
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

export default FolderPage;
