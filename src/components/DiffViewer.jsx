import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import ReactDiffViewer from "react-diff-viewer";

const DiffViewer = ({ original, modified }) => {
  return (
    <Box>
      <Heading
        bg="white"
        position="sticky"
        top="0"
        w="100%"
        p={4}
        size="md"
        boxShadow="sm"
        zIndex="1"
        borderBottom="1px solid "
        borderColor="gray.300"
      >
        Difference Between Original and Modified JSON
      </Heading>
      <Box>
        <ReactDiffViewer
          oldValue={JSON.stringify(original, null, 2)}
          newValue={JSON.stringify(modified, null, 2)}
          splitView={true}
        />
      </Box>
    </Box>
  );
};

export default DiffViewer;
