import React, { useState } from 'react';
import cross from '../../../../../images/cross.png';
import docs from '../../../../../images/docs.svg';
import choosefile from '../../../../../images/choosefiles.png';

const FileUploader = () => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files).map(file => ({
      name: file.name,
      size: (file.size / 1024).toFixed(2), // Size in KB
    }));
    setFiles(prevFiles => [...prevFiles, ...newFiles]); // Append new files to existing ones
  };

  const handleDeleteFile = (fileName) => {
    setFiles(prevFiles => prevFiles.filter(file => file.name !== fileName));
  };

  return (
    <>
    <h2 className="text-sm font-semibold  mt-4 mb-2">Choose Document</h2>
    <div className="flex  w-3/4">
        
      <div className="flex-1 flex flex-col  h-28 overflow-y-auto p-1 sm:p-4  border border-gray-0 rounded-lg rounded-tr-none ">
        
        <div className="sm:flex sm:flex-wrap sm:gap-2 justify-between sm:mx-3">
          {files.map((file, index) => (
            <div key={index} className="flex rounded-md w-full sm:w-[45%] sm:gap-2 my-1 sm:my-0">
                <img src={docs} alt='docs' className='h-5 my-auto'/>
              <span className="text-xs font-bold  w-2/5 my-auto break-words">{file.name}</span>
              <span className="text-xs font-bold text-gray-1 my-auto hidden sm:block">{file.size} KB</span>
              <p
                onClick={() => handleDeleteFile(file.name)}
                className="my-auto"
              >
                <img src={cross} alt="delete file" className="w-4 h-4 " />
              </p>
            </div>
          ))}
        </div>
      </div>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="opacity-0 w-0 h-0"
        id="file-upload"
      />
      <label
        htmlFor="file-upload"
        className="bg-gray-0 h-10 text-sm font-semibold py-1 px-3 bg-gray-300 rounded-r-lg cursor-pointer hover:bg-gray-400 flex items-center gap-2"
      >
        <img src={choosefile} alt='docs' /><p>Choose file</p>
      </label>
    </div>
    </>
  );
};

export default FileUploader;
