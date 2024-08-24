export const isValidJsObject = (input) => {
  try {
    const parsed = convertStringToOriginalState(input);
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

export const convertStringToOriginalState = (str) => {
  try {
    const parsed = new Function(`return ${str};`)();
    return parsed;
  } catch (error) {
    return null;
  }
};

export const validatePatch = (patches) => {
  const validOperations = ["add", "remove", "replace", "move", "copy", "test"];

  for (const patch of patches) {
    if (
      typeof patch !== "object" ||
      !patch.op ||
      !validOperations.includes(patch.op) ||
      !patch.path ||
      (patch.op !== "remove" &&
        patch.value === undefined &&
        patch.op !== "move" &&
        patch.op !== "copy")
    )
      return false;
  }

  return true;
};
