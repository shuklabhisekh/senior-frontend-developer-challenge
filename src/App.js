import { Box } from "@chakra-ui/react";
import UserInputModal from "./components/UserInputModal";
import { useState } from "react";

function App() {
  const [initialObject, setInitialObject] = useState(null);
  const [patches, setPatches] = useState([]);

  const handleSubmit = (object, patches) => {
    setInitialObject(object);
    setPatches(patches);
  };
  return (
    <Box>
      <UserInputModal onSubmit={handleSubmit} />
    </Box>
  );
}

export default App;
