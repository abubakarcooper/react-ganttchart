import { Modal } from "flowbite-react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addRecord, uploadFile } from "../../../../../apis/estimatesheet";
import { useState } from "react";
import { toast } from "react-toastify";
import { Spinner } from "flowbite-react";
import { firebaseStorage } from "../../../../../apis/firebase";

const Messages = {
  WENT_WRONG: "Something Went Wrong, Please try again",
  DATA_ADDED: "Data Added Successfully",
};

const DocumentModal = ({
  documentModalOpen,
  documentModalClose,
  getAllDocuments,
  setNewDocumentAdded
}) => {
  const [loading, setLoading] = useState(false);
  const [documentURL, setDocumentURL] = useState("");
  const [linkName, setLinkName] = useState("");
  const [documentFile, setDocumentFile] = useState(null);

  const cleanUp = () => {
    setDocumentURL("");
    setLinkName("");
    setDocumentFile(null);
  };

  const handleCloseModal = () => {
    cleanUp();
    documentModalClose();
  };


  // const handleUploadClick = (file) => {
  //   if (file) {
  //     setUploading(true);
  //     uploadFileToFirebase(
  //       file,
  //       (progress) => setProgress(progress),
  //       (url) => {
  //         console.log(url, 'url.................')
  //         setDownloadURL(url);
  //         setUploading(false);
  //       },
  //       (error) => {
  //         setUploading(false);
  //         console.error('Upload error:', error);
  //       }
  //     );
  //   }
  // };

  const uploadFileToFirebase = async (file) => {
    if (!file) {
      console.error('No file provided for upload');
      return null;
    }

    const storageRef = ref(firebaseStorage, `${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          console.log(snapshot, 'snapshot')
        },
        (err) => {
          console.error("Error uploading file:", err);
          reject(err);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log("File available at", downloadURL);
            resolve(downloadURL);
          } catch (error) {
            console.error("Error retrieving download URL:", error);
            reject(error);
          }
        }
      );
    });
  };


  const addData = async () => {

    try {


      if (linkName?.length === 0) {
        return toast.error("Please write the document name!");
      }

      if (!documentURL && !documentFile)
        return toast.error("Please choose the file or attach the URL!");

      let isDocumentUrl = true;

      if (documentURL && !documentFile) {
        isDocumentUrl = false;
      }

      setLoading(true);

      let payload = ''

      if (isDocumentUrl) {
        const fileUrl = await uploadFileToFirebase(documentFile)
        payload = {
          Url: fileUrl,
          Single_Line_Url: linkName,
          File_Name: fileUrl
        };
      } else {
        payload = {
          Url: documentURL,
          Single_Line_Url: linkName,
          File_Name: documentURL
        };
      }

      await addRecord(payload, "All_Documents", "Add_Documents");
      toast.success(Messages.DATA_ADDED);
      getAllDocuments('');
      handleCloseModal();
      // const config1 = {
      //   appName: "cooper-build",
      //   reportName: "All_Documents",
      //   fieldName: "Doc",
      //   file: fileUrl,
      //   Url: fileUrl,
      //   id: data.ID,
      // };
      // await uploadFile(config1);
    } catch (error) {
      console.error("Error: ", error);
      toast.error(Messages.WENT_WRONG);
    } finally {
      setLoading(false);
    }
  };

  const handleClearFile = () => {
    setDocumentFile(null);
    document.getElementById('fileInput').value = '';
  };

  const handleChangeFile = (event) => {
    setDocumentFile(event.target.files[0]);
  };


  return (
    <>
      <Modal show={documentModalOpen} onClose={handleCloseModal}>
        <div className="rounded-lg" style={{ backgroundColor: "white" }}>
          <Modal.Header> <h2 className="mt-5 font-bold">Add Document  </h2></Modal.Header>
          <Modal.Body>
            <div className="flex flex-col gap-4 mb-4">

              <div>
                <p className="text-sm text-left mb-1 font-semibold">Document Name</p>
                <input
                  className="w-full rounded h-11 font-medium focus:outline-none border-slate-200	 bg-white-300 text-sm  disabled:bg-slate-300 disabled:cursor-not-allowed "
                  type="text"
                  placeholder="Document Name"
                  value={linkName}
                  onChange={(e) => setLinkName(e.target.value)}
                />
              </div>

              {
                !documentFile &&
                <div>
                  <p className="text-sm  text-left mb-1 font-semibold">Document URL (Optional)</p>
                  <input
                    className="w-full rounded h-11 font-medium focus:outline-none border-slate-200	 bg-white-300 text-sm  disabled:bg-slate-300 disabled:cursor-not-allowed"
                    type="text"
                    placeholder="Document URL."
                    value={documentURL}
                    onChange={(e) => setDocumentURL(e.target.value)}
                  />
                </div>
              }

              {
                !documentURL &&
                <div className="relative ">
                  <p className="text-left mb-1 text-sm font-semibold">Choose Document</p>
                  <input
                    id="fileInput"
                    className="w-full roundedfont-medium  focus:outline-none border  bg-white-300 text-xs"
                    type="file"
                    onChange={handleChangeFile}
                  />
                  {documentFile && (
                    <button
                      type="button"
                      onClick={handleClearFile}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 "
                    >
                    </button>
                  )}
                </div>
              }

            </div>

            <div className="flex justify-end items-center">
              <button
                disabled={loading}
                onClick={addData}
                type="button"
                class="px-1	py-2 text-base font-semibold text-center flex justify-center	text-white-300 bg-primary-0 hover:bg-primary-1 focus:outline-none focus:ring-primary-300 dark:focus:ring-primary-3 text-white-0  border rounded-[5px] w-36 items-center"
              >
                {loading && <Spinner className="w-4 h-4 mr-2 mb-1" />}
                Add Document
              </button>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
};

export default DocumentModal;