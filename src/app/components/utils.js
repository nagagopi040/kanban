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
  options: [
    { label: "Description", value: "Description" },
    { label: "Priority", value: "Priority" },
    { label: "Status", value: "Status" },
    { label: "Created By", value: "Created By" },
    { label: "Opened Date", value: "Opened Date" }
  ],
  priority: [
    { label: "", value: null },
    { label: "Critical", value: "Critical" },
    { label: "High", value: "High" },
    { label: "Normal", value: "Normal" },
    { label: "Low", value: "Low" }
  ],
  status: [
    { label: "", value: null },
    { label: "Complete", value: "Complete" },
    { label: "In-progress", value: "In-progress" },
    { label: "Can't reproduce", value: "Can't reproduce" },
    { label: "Blocked", value: "Blocked" },
    { label: "Duplicate", value: "Duplicate" }
  ],
  users: [
    { label: "Gopi", value: "Gopi" },
    { label: "Chandru", value: "Chandru" },
    { label: "David", value: "David" },
    { label: "Brunt", value: "Brunt" },
    { label: "Micheal", value: "Micheal" }
  ]
};
