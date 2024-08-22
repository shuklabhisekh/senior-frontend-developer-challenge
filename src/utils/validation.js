export const isValidJsonObject = (str) => {
  try {
      const parsed = JSON.parse(str);

      console.log('str0000',parsed);
      console.log('typeof parsed === "object"',typeof parsed === "object")
      console.log("parsed !== null",parsed !== null)
      console.log('!Array.isArray(parsed)',!Array.isArray(parsed))
      console.log('Object.keys(parsed).length > 0',Object.keys(parsed).length > 0)
      console.log('false',str);
  

    return (
      typeof parsed === "object" &&
      parsed !== null &&
      !Array.isArray(parsed) &&
      Object.keys(parsed).length > 0
    );
  } catch (error) {
    console.log('typeof parsed === "object"---',typeof str === "object")
    console.log("parsed !== null",str !== null)
    console.log('!Array.isArray(parsed)',!Array.isArray(str))
    console.log('Object.keys(parsed).length > 0',Object.keys(str).length > 0)
    console.log('false',str);
    return false;
  }
};
