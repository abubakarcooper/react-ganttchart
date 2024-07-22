import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
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

