// import { storage } from './firebase'; // Import Firebase storage instance
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


const ZOHO_FAILED_MESSAGE = "Error initializing Zoho Creator SDK";
const SOME_THING_WENT = "Zoho Connectionn Failed ..";
const appName = "cooper-build";

export async function initializeZohoCreatorSDK() {
  if (window?.ZOHO?.CREATOR) {
    try {
      await window.ZOHO.CREATOR.init();
      console.log("Zoho Creator SDK initialized successfully");
    } catch (error) {
      console.error(ZOHO_FAILED_MESSAGE, error);
      throw error;
    }
  }
}

export async function getApi(
  reportName,
  criteria = "",
  page = 1,
  pageSize = 200
) {
  try {
    // Ensure that the Zoho Creator SDK is initialized
    await initializeZohoCreatorSDK();

    const config = {
      appName,
      reportName,
      criteria,
      page,
      pageSize,
    };
    const result = await window.ZOHO.CREATOR.API.getAllRecords(config);
    if (result.code == 3000) return result.data;
    return null;
  } catch (error) {
    // console.error('Error in getApi:', error);
    throw error;
  }
}

export async function getRecordCount(reportName, criteria) {
  try {
    await initializeZohoCreatorSDK();

    const config = {
      appName,
      reportName,
      criteria,
    };

    const result = await window.ZOHO.CREATOR.API.getRecordCount(config);
    if (result.code == 3000) {
      return result.result.records_count;
    }
    return null;
  } catch (error) {
    console.error("Error in getApi:", error);
    throw error;
  }
}

export async function updateAPI(id, data, reportName) {
  try {
    var formData = {
      // "data": {
      //     Title: uploadTitle.value,
      //     Description: message.value
      // },
      data,
    };

    const config = {
      appName,
      reportName,
      id,
      data: formData,
    };

    await initializeZohoCreatorSDK();

    const result = await window.ZOHO.CREATOR.API.updateRecord(config);
    if (result.code == 3000) return result.data;
    return null;
  } catch (error) {
    console.error("Error in getApi:", error);
    throw error;
  }
}

export async function addRecord(data, reportName, formName) {
  try {
    var formData = {
      data,
    };

    const config = {
      appName,
      reportName,
      formName,
      data: formData,
    };

    await initializeZohoCreatorSDK();

    const result = await window.ZOHO.CREATOR.API.addRecord(config);
    if (result.code == 3000) return result.data;
    return null;
  } catch (error) {
    console.log("Error in getApi:", error);
    throw error;
  }
}

export async function deleteRecord(reportName, criteria = "") {
  try {
    await initializeZohoCreatorSDK();

    const config = {
      appName,
      reportName,
      criteria,
    };

    const result = await window.ZOHO.CREATOR.API.deleteRecord(config);
    if (result.code == 3000) return result.data;
    return null;
  } catch (error) {
    console.error("Error in getApi:", error);
    throw error;
  }
}

export async function getQueryParams(queryName = "") {
  try {
    await initializeZohoCreatorSDK();
    const result = await window.ZOHO.CREATOR.UTIL.getQueryParams(queryName);
    return result;
  } catch (error) {
    console.error("Error in getApi:", error);
    throw error;
  }
}

export async function uploadFile(config) {
  try {
    await initializeZohoCreatorSDK();
    const result = await window.ZOHO.CREATOR.API.uploadFile(config);
    return result;
  } catch (error) {
    console.error("Error in getApi:", error);
    throw error;
  }
}

