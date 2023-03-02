import React, { useCallback, useState } from "react";
import FiltersAction from "./components/Filters";
import TreesSelect from "./components/TreesSelect";
import { useStyles } from "./styles";

function App() {
  const classes = useStyles();
  const [selectedPath, setSelectedPath] = useState([]);
  const [nodeAdd, setNodeAdd] = useState("");
  const [nodeItem, setNodeItem] = useState([]);

  const handleGetSelected = useCallback((arrayNode) => {
    setSelectedPath(arrayNode);
  }, []);

  const handleSetNodeAdd = useCallback((val) => setNodeAdd(val), []);

  return (
    <div className={classes.rootApp}>
      <FiltersAction
        selectedPath={selectedPath}
        setNodeAdd={handleSetNodeAdd}
        nodeAdd={nodeAdd}
        setNodeItem={handleGetSelected}
      />
      <TreesSelect
        nodeAdd={nodeAdd}
        handleGetPath={handleGetSelected}
        selectedPath={selectedPath}
        setNodeAdd={handleSetNodeAdd}
      />
    </div>
  );
}

export default App;
