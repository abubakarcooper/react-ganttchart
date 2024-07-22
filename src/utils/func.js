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
