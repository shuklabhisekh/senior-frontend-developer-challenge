import React, { useState } from "react";
import { Box, Button, Textarea, useToast } from "@chakra-ui/react";
import CommonModal from "./CommonModal";
import CustomStepper from "./CustomStepper";
import { convertStringToJsObject, isValidJsObject } from "../utils/validation";

const steps = [{ title: "JS Object" }, { title: "Patches" }];

const UserInputModal = ({ onSubmit }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [objectInput, setObjectInput] = useState(null);
  const [patchesInput, setPatchesInput] = useState([]);
  const toast = useToast();

  const handleClose = () => {
    setIsOpen(false);
    setCurrentStep(0);
  };

  const handleStepChange = (step) => {
    if (step >= 0 && step < steps.length) {
      setCurrentStep(step);
    }
  };

  const handleNext = () => {
    if (!isValidJsObject(objectInput)) {
      toast({
        title: "Invalid or Empty JS object .",
        description: "Please check your JS object.",
        position: "top",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    handleStepChange(1);
  };

  const handleSubmit = () => {
    try {
      const parsedObject = convertStringToJsObject(objectInput);
      const parsedPatches = convertStringToJsObject(patchesInput);

      if (!Array.isArray(parsedPatches)) {
        toast({
          title: "Patches should be an array.",
          description: "Please check your patches.",
          position: "top",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        return;
      }

      onSubmit(parsedObject, parsedPatches);
      handleClose();
    } catch (error) {
      toast({
        title: "Invalid input.",
        description: "Please check your input.",
        position: "top",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <CommonModal
        isOpen={isOpen}
        title="Set Up JS Object & Patches"
        footerContent={
          currentStep === 0 ? (
            <Button colorScheme="blue" onClick={() => handleNext()}>
              Next
            </Button>
          ) : (
            <>
              <Button
                colorScheme="blue"
                variant="outline"
                mr={4}
                onClick={() => handleStepChange(0)}
              >
                Back
              </Button>
              <Button colorScheme="blue" onClick={handleSubmit}>
                Submit
              </Button>
            </>
          )
        }
      >
        <Box mt="10px">
          <CustomStepper
            currentStep={currentStep}
            steps={steps}
            onStepChange={handleStepChange}
          />
        </Box>

        {currentStep === 0 && (
          <Textarea
            placeholder="Enter JS object here"
            value={objectInput}
            onChange={(e) => setObjectInput(e.target.value)}
            rows={20}
            mt="20px"
          />
        )}
        {currentStep === 1 && (
          <Textarea
            placeholder="Enter patches array here"
            value={patchesInput}
            onChange={(e) => setPatchesInput(e.target.value)}
            rows={20}
            mt="20px"
          />
        )}
      </CommonModal>
    </>
  );
};

export default UserInputModal;
