import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import ReactDiffViewer from "react-diff-viewer";

const DiffViewer = ({ original, modified }) => {
  return (
    <Box style={{ marginTop: "20px" }}>
      <Heading>Difference Between Original and Modified JSON</Heading>
      <ReactDiffViewer
        oldValue={JSON.stringify(original, null, 2)}
        newValue={JSON.stringify(modified, null, 2)}
        splitView={true}
      />
    </Box>
  );
};

export default DiffViewer;
