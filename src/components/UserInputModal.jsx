import React, { useEffect, useState } from "react";
import { Box, Button, useToast } from "@chakra-ui/react";
import CommonModal from "./CommonModal";
import CustomStepper from "./CustomStepper";
import { convertStringToJsObject, isValidJsObject } from "../utils/validation";
import CommonInput from "./CommonInput";

const steps = [{ title: "JS Object" }, { title: "Patches" }];

const UserInputModal = ({ isModalOpen, closeModal, onSubmit, initialStep }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [objectInput, setObjectInput] = useState("");
  const [patchesInput, setPatchesInput] = useState("");
  const toast = useToast();

  const handleClose = () => {
    closeModal();
    setCurrentStep(0);
    setPatchesInput("");
    setObjectInput("");
  };

  useEffect(() => {
    if (initialStep) setCurrentStep(initialStep ?? 0);
  }, [initialStep, currentStep]);

  const handleStepChange = (targetStep) => {
    if (targetStep >= 0 && targetStep < steps.length) {
      setCurrentStep(targetStep);
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

  const handleIncompleteClose = () => {
    toast({
      title: "Incomplete Step",
      description: "Please complete the current step to proceed.",
      status: "warning",
      position: "top",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <CommonModal
      isOpen={isModalOpen}
      onClose={() =>
        initialStep === 1 ? handleClose() : handleIncompleteClose()
      }
      title={currentStep === 0 ? "Set Up JS Object" : "Add Patches"}
      footerContent={
        currentStep === 0 ? (
          <Button colorScheme="blue" onClick={() => handleNext()}>
            Next
          </Button>
        ) : (
          <>
            {initialStep !== 1 && (
              <Button
                colorScheme="blue"
                variant="outline"
                mr={4}
                onClick={() => handleStepChange(0)}
              >
                Back
              </Button>
            )}
            <Button colorScheme="blue" onClick={handleSubmit}>
              Submit
            </Button>
          </>
        )
      }
    >
      {initialStep !== 1 && (
        <Box mt="10px">
          <CustomStepper
            currentStep={currentStep}
            steps={steps}
            onStepChange={handleStepChange}
          />
        </Box>
      )}
      {currentStep === 0 && (
        <CommonInput
          placeholder="Enter JS object here"
          value={objectInput}
          onChange={(e) => setObjectInput(e.target.value)}
          rows={20}
          mt="20px"
        />
      )}
      {currentStep === 1 && (
        <CommonInput
          placeholder="Enter array of patch here"
          value={patchesInput}
          onChange={(e) => setPatchesInput(e.target.value)}
          rows={20}
          mt="20px"
        />
      )}
    </CommonModal>
  );
};

export default UserInputModal;
