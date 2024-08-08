import { v4 as uuidv4 } from 'uuid';

export function generateUniqueReference() {
  // Generate a UUID
  const uuid = uuidv4();
  // Extract numeric digits from the UUID
  const digits = uuid.replace(/\D/g, ''); // Remove non-digit characters
  // Use the first 6 digits of the numeric part
  const reference = digits.substring(0, 6);
  // Ensure the result is exactly 6 digits, padding with zeros if necessary
  return '#' + reference.padStart(6, '0');
}

export const formatAmount = (amount) => {
  let [integerPart, decimalPart] = amount.toString().split(".");

  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  if (!decimalPart) {
    decimalPart = "00";
  } else {
    decimalPart = decimalPart.padEnd(2, "0");
  }

  return integerPart + "." + decimalPart;
};

export const findMaxEndDate = (tasks) => {
  let maxDate = new Date(0);

  const checkDate = (dateString) => {
    const date = new Date(dateString);
    if (date > maxDate) {
      maxDate = date;
    }
  }

  tasks.forEach(task => {
    if (task.EndDate) {
      checkDate(task.EndDate);
    }
    if (task.subtasks) {
      task.subtasks.forEach(subtask => {
        if (subtask.EndDate) {
          checkDate(subtask.EndDate);
        }
      });
    }
  });
  return maxDate
}

export function getInnerTextFromDiv(divHtml) {
  const tempContainer = document.createElement('div');
  tempContainer.innerHTML = divHtml;
  const innerText = tempContainer.innerText;
  return innerText;
}

export function fixedTwoDigit(num) {
  return parseFloat(num).toFixed(2)
}

export function appendQueryString(url, key, value) {
  const hasQueryString = url.includes('?');
  const queryString = `${key}=${encodeURIComponent(value)}`;
  const newUrl = hasQueryString ? `${url}&${queryString}` : `${url}?${queryString}`;
  return newUrl;
}


export function getFileNameFromUrl(url) {
  try {
    const parsedUrl = new URL(url);

    // Extract the pathname and remove any URL encoding
    const path = parsedUrl.pathname;
    const fileName = decodeURIComponent(path.substring(path.lastIndexOf('/') + 1));

    // Check if fileName is valid and not empty
    if (fileName) {
      return fileName;
    } else {
      throw new Error("File name is empty.");
    }
  } catch (error) {
    // Return default text if there's an error
    console.error("Error extracting file name:", error);
    return "File Name Here";
  }
}
