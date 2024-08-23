import { useEffect, useState } from "react";
import UserInputModal from "./UserInputModal";
import { applyPatch, deepClone } from "fast-json-patch";
import PatchList from "./PatchList";
import DiffViewer from "./DiffViewer";
import { Grid, GridItem } from "@chakra-ui/react";

export const Dashboard = () => {
  const [baseObject, setBaseObject] = useState({});
  const [patches, setPatches] = useState([]);
  const [currentPatches, setCurrentPatches] = useState([]);
  const [acceptedPatches, setAcceptedPatches] = useState([]);
  const [modifiedObject, setModifiedObject] = useState({});

  const handleSubmit = (object, patches) => {
    setBaseObject(object);
    setPatches(patches);
    setCurrentPatches(patches);
    setAcceptedPatches([]);
  };

  useEffect(() => {
    applyCurrentPatches();
  }, [currentPatches, acceptedPatches]);

  const applyCurrentPatches = () => {
    let updatedObject = deepClone(baseObject);
    const allPatches = [...acceptedPatches, ...currentPatches];
    allPatches.forEach((patch) => {
      const { newDocument } = applyPatch(updatedObject, [patch]);
      updatedObject = newDocument;
    });
    setModifiedObject(updatedObject);
  };

  const handleAcceptPatch = (index) => {
    const acceptedPatch = currentPatches[index];
    const updatedCurrentPatches = currentPatches.filter((_, i) => i !== index);
    setAcceptedPatches([...acceptedPatches, acceptedPatch]);
    setCurrentPatches(updatedCurrentPatches);
  };

  const handleRejectPatch = (index) => {
    const updatedPatches = patches.filter((_, i) => i !== index);
    const updatedCurrentPatches = currentPatches.filter((_, i) => i !== index);
    setPatches(updatedPatches);
    setCurrentPatches(updatedCurrentPatches);
  };

  return (
    <>
      {!Object.keys(baseObject).length ? (
        <UserInputModal onSubmit={handleSubmit} />
      ) : (
        <Grid templateColumns="repeat(10, 1fr)" gap={4}>
          <GridItem
            height="100vh"
            borderRight="1px solid"
            borderColor="gray.300"
            boxShadow="md"
            overflow="auto"
            colSpan={8}
          >
            <DiffViewer original={baseObject} modified={modifiedObject} />
          </GridItem>
          <GridItem
            colSpan={2}
            borderLeft="1px solid"
            borderColor="gray.300"
            h="100vh"
            overflow="auto"
          >
            <PatchList
              patches={currentPatches}
              onAccept={handleAcceptPatch}
              onReject={handleRejectPatch}
            />
          </GridItem>
        </Grid>
      )}
    </>
  );
};
