import React, { useState } from "react";
import { Button, Textarea, useToast } from "@chakra-ui/react";
import CommonModal from "./CommonModal";
import CustomStepper from "./CustomStepper";
import { isValidJsonObject } from "../utils/validation";

const steps = [{ title: "Base Object" }, { title: "Patches" }];

const UserInputModal = ({ onSubmit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [objectInput, setObjectInput] = useState();
  const [patchesInput, setPatchesInput] = useState("");
  const toast = useToast();

  const handleOpen = () => setIsOpen(true);
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
    if (!isValidJsonObject(objectInput)) {
      toast({
        title: "Invalid or Empty base object JSON.",
        description: "Please check your JSON object.",
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
      const parsedObject = JSON.parse(objectInput);
      const parsedPatches = JSON.parse(patchesInput);

      if (!Array.isArray(parsedPatches)) {
        toast({
          title: "Patches should be an array.",
          description: "Please enter in patches in array.",
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
        title: "Invalid JSON input.",
        description: "Please check your input data.",
        position: "top",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button onClick={handleOpen} colorScheme="blue">
        Enter Data
      </Button>

      <CommonModal
        isOpen={isOpen}
        onClose={handleClose}
        title="Enter Data"
        footerContent={
          currentStep === 0 ? (
            <Button colorScheme="blue" onClick={() => handleNext()}>
              Next
            </Button>
          ) : (
            <>
              <Button colorScheme="gray" onClick={() => handleStepChange(0)}>
                Back
              </Button>
              <Button colorScheme="blue" onClick={handleSubmit}>
                Submit
              </Button>
            </>
          )
        }
      >
        <CustomStepper
          currentStep={currentStep}
          steps={steps}
          onStepChange={handleStepChange}
        />
        {currentStep === 0 && (
          <Textarea
            placeholder="Enter base object JSON here"
            value={objectInput}
            onChange={(e) => setObjectInput(e.target.value)}
            rows={15}
            mt="20px"
          />
        )}
        {currentStep === 1 && (
          <Textarea
            placeholder="Enter JSON patches array here"
            value={patchesInput}
            onChange={(e) => setPatchesInput(e.target.value)}
            rows={15}
            mt="20px"
          />
        )}
      </CommonModal>
    </>
  );
};

export default UserInputModal;
