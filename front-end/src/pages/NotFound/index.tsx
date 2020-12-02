import React from "react";
import { useHistory } from "react-router-dom";

export const NotFound: React.FC = () => {
  const history = useHistory();

  return (
    <>
      <div>not found</div>
      <button onClick={() => history.push("/")}>return to home</button>
    </>
  );
};
