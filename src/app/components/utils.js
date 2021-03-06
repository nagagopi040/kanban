import shortid from "shortid";

// Return the total number of checkboxes and the number of checked checkboxes inside a given text
export const findCheckboxes = text => {
  const checkboxes = text.match(/\[(\s|x)\]/g) || [];
  const checked = checkboxes.filter(checkbox => checkbox === "[x]").length;
  return { total: checkboxes.length, checked };
};

export const filteredList = (lists, value) => {
  var filteredObj = lists.reduce((acc, cur) => {
    (acc[cur[value]] = acc[cur[value]] || []).push(cur);
    return acc;
  }, {});
  var result = [];
  Object.keys(filteredObj).map(key => {
    key &&
      result.push({
        _id: shortid.generate(),
        title: key !== "undefined" ? key : "Uncategorized",
        cards: filteredObj[key]
      });
  });
  return result;
};

export const CONSTANTS = {
  options: [ "Description", "Priority", "Status", "Created By", "Assigned To", "Opened Date"],
  priority: [ "Critical", "High", "Normal", "Low"],
  status: ["Complete", "In-Progress", "Cannot reproduce", "Blocked", "Duplicate"],
  users: ["Naga Gopi", "David", "Micheal", "Brunt"]
};
