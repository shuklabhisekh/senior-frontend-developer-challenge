import { useState } from "react";
import UserInputModal from "./UserInputModal";

export const Dashboard = () => {
  const [initialObject, setInitialObject] = useState(null);
  const [patches, setPatches] = useState([]);

  const handleSubmit = (object, patches) => {
    setInitialObject(object);
    setPatches(patches);
  };

  return (
    <>
      <UserInputModal onSubmit={handleSubmit} />
    </>
  );
};
