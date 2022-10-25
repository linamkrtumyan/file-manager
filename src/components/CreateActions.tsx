import React, {useContext, useState} from 'react'
import { ModalContext } from '../context/ModalContext';
import CreateFolder from './CreateFolder';
import CreateFile from './CreateFile';
import Modal from './Modal';

function CreateActions({onlyFile = false}) {
    const { modal, open, close } = useContext(ModalContext);
    const [folder, setFolder] = useState(false);

   
  return (
    <>
     {modal && (
        <Modal
          title={folder ? "Create new folder" : "Create new file"}
          onClose={() => close()}
        >
          {folder ? (
            <CreateFolder close={close} />
          ) : (
            <CreateFile close={close} />
          )}
        </Modal>
      )}
      <div className="flex">
        {
            !onlyFile &&
            <button
            onClick={() => {
              setFolder(true);
              open();
            }}
            className="bg-amber-400 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded m-4"
          >
            Add new folder
          </button>
        }
      
        <button
          onClick={() => {
            setFolder(false);
            open();
          }}
          className="bg-lime-300 hover:bg-lime-400 text-white font-bold py-2 px-4 rounded m-4"
        >
          Add new file
        </button>
      </div>
    
    </>
   
  )
}

export default CreateActions