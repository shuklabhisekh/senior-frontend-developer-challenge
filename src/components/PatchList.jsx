import React from "react";
import {
  Box,
  Heading,
  Button,
} from "@chakra-ui/react";

const PatchList = ({ patches, onAccept, onReject }) => {
  return (
    <Box mt="20px">
      <Heading size="md">Patch Operations</Heading>
      {patches.length > 0 ? (
        patches.map((patch, index) => (
          <Box
            key={index}
            p="4"
            border="1px"
            borderColor="gray.200"
            borderRadius="md"
          >
            <Box bg="gray.50" p="4" borderRadius="md" whiteSpace="pre-wrap">
              {JSON.stringify(patch, null, 2)}
            </Box>
            <Button
              onClick={() => onAccept(index)}
              colorScheme="blue"
              size="sm"
              mt="2"
              mr="2"
            >
              Accept
            </Button>
            <Button
              onClick={() => onReject(index)}
              colorScheme="red"
              size="sm"
              mt="2"
            >
              Reject
            </Button>
          </Box>
        ))
      ) : (
        <Box>No patches available</Box>
      )}
    </Box>
  );
};

export default PatchList;
