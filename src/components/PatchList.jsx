import React from "react";
import {
  Box,
  Heading,
  VStack,
  Flex,
  Text,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

const PatchList = ({ patches, onAccept, onReject }) => {
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
        Patch Operations
      </Heading>
      <Box>
        {patches.length > 0 ? (
          <VStack p={4} spacing={6} align="stretch">
            {patches.map((patch, index) => (
              <Box
                key={index}
                bg="gray.50"
                borderWidth="1px"
                borderColor="gray.200"
                borderRadius="md"
                boxShadow="sm"
                p={4}
              >
                <Box bg="white" p={4} borderRadius="md" whiteSpace="pre-wrap">
                  <Text fontSize="sm">{JSON.stringify(patch, null, 2)}</Text>
                </Box>

                <Flex mt={4} justify="flex-end">
                  <Tooltip
                    label="Accept Patch"
                    aria-label="Accept Patch Tooltip"
                  >
                    <IconButton
                      icon={<CheckIcon />}
                      colorScheme="green"
                      variant="outline"
                      mr={2}
                      onClick={() => onAccept(index)}
                      aria-label="Accept Patch"
                      size="sm"
                      _hover={{ bg: "green.100" }}
                    />
                  </Tooltip>
                  <Tooltip
                    label="Reject Patch"
                    aria-label="Reject Patch Tooltip"
                  >
                    <IconButton
                      icon={<CloseIcon />}
                      colorScheme="red"
                      variant="outline"
                      onClick={() => onReject(index)}
                      aria-label="Reject Patch"
                      size="sm"
                      _hover={{ bg: "red.100" }}
                    />
                  </Tooltip>
                </Flex>
              </Box>
            ))}
          </VStack>
        ) : (
          <Box pt="20px" textAlign="center">
            <Text>No patch available</Text>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PatchList;
