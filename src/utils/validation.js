export const isValidJsObject = (input) => {
  try {
    const parsed = convertStringToJsObject(input);
    return (
      typeof parsed === "object" &&
      parsed !== null &&
      !Array.isArray(parsed) &&
      Object.keys(parsed).length > 0
    );
  } catch (error) {
    return false;
  }
};

export const convertStringToJsObject = (str) => {
  try {
    const parsed = new Function(`return ${str};`)();
    return parsed;
  } catch (error) {
    console.error("Error parsing string to JS object:", error);
    return null;
  }
};
