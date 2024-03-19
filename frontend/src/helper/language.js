const languageMapping = {
  28: "Python",
  71: "Python",
  62: "Java",
  93: "JavaScript",
  53: "C++",
};
export const getLanguage = (id) => {
  return languageMapping[id] || "Unknown";
};
