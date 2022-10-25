import React, { useState, useEffect } from "react";
import { fileAPI } from "../services/FileService";
import { useParams } from "react-router-dom";

function FileContent() {
  let { fileId } = useParams();

  const { data: file } = fileAPI.useFetchFileByIdQuery(fileId);

  const [bodyText, setBodyText] = useState(file?.body);
  console.log(bodyText, "files");

  useEffect(() => {
    setBodyText(file?.body);
  }, [file?.body]);

  return (
    <div>
      <label
        htmlFor="message"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
      >
        {file?.title}
      </label>
      <textarea
        id="message"
        value={bodyText}
        onChange={(e) => setBodyText(e.target.value)}
        rows={4}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
      ></textarea>

      {/* <input /> */}
      {/* {file?.body} */}
    </div>
  );
}

export default FileContent;
