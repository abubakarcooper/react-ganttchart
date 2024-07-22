import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
    // apiKey: "AIzaSyA8xh7ay28ZGZW-Xjt_6qiG4NTDwvDhSUU",
    // authDomain: "myzoho-f4f48.firebaseapp.com",
    // projectId: "myzoho-f4f48",
    // storageBucket: "myzoho-f4f48.appspot.com",
    // messagingSenderId: "491152810702",
    // appId: "1:491152810702:web:59dd34aa9d49abae92669f",
    // measurementId: "G-PRLDQGJVS7"


    apiKey: "AIzaSyDCB9RVVcTVSCUfHorUOGmI5Cwqj86_Pu8",
    authDomain: "zohoappstorage.firebaseapp.com",
    projectId: "zohoappstorage",
    storageBucket: "zohoappstorage.appspot.com",
    messagingSenderId: "44574091497",
    appId: "1:44574091497:web:3b468dc7969321c9472878",
    measurementId: "G-ZGFX5XSQKY"

};

const app = initializeApp(firebaseConfig)
export const firebaseStorage = getStorage(app);

