import React, { useCallback, useEffect, useState } from "react";
import TreeView from "@material-ui/lab/TreeView";
import AddBoxOutlined from "@material-ui/icons/AddBoxOutlined";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import IndeterminateCheckBoxOutlined from "@material-ui/icons/IndeterminateCheckBoxOutlined";
import TreeItem from "@material-ui/lab/TreeItem";
import { FormControlLabel } from "@material-ui/core";
import { data as nodeDatas } from "./data";
import { useStyles } from "./styles";
import { cloneDeep, update } from "lodash";
import { v4 as uuidv4 } from "uuid";
import { Alert, Snackbar } from "@mui/material";

export default function RecursiveTreeView(props) {
  const classes = useStyles();
  const [data, setData] = useState(nodeDatas);
  const [showError, setShowError] = useState(false);

  const handleGetPathTree = useCallback((path) => {
    props.handleGetPath(path);
  }, []);

  const getDirectionArray = (nodes, path) => {
    let arr = "";
    const arr2 = path;
    const getChildPath = (node, childPath) => {
      if (!node.children) return;
      const child = node.children.find((item) => item.name === childPath[0]);
      const index = node.children
        .map((item) => item.name)
        .indexOf(childPath[0]);
      if (child && index >= 0) {
        if (arr) {
          arr += `.children[${index}]`;
        } else {
          arr += `children[${index}]`;
        }
        childPath.shift();
        getChildPath(child, childPath);
      }

      return arr;
    };
    arr2.shift();
    return getChildPath(nodes, arr2);
  };

  const handleAddItem = useCallback((nodeAdd, dataNodes, selectedPath) => {
    const direction = getDirectionArray(dataNodes, selectedPath);

    let newData;
    if (direction) {
      newData = update(dataNodes, direction, (a) => {
        a.children = (a?.children || []).concat({
          id: uuidv4(),
          name: nodeAdd,
          childs: a.childs.concat(nodeAdd),
          product: "",
        });
        return a;
      });
    } else {
      newData = cloneDeep(dataNodes);
      newData.children = (newData?.children || []).concat({
        id: uuidv4(),
        name: nodeAdd,
        childs: newData.childs.concat(nodeAdd),
        product: "",
      });
    }
    setData(newData);
    props.setNodeAdd("");
  }, []);

  const handleDelete = useCallback((childs, dataNodes) => {
    const direction = getDirectionArray(dataNodes, cloneDeep(childs));
    if (!direction) {
      return setData({});
    }
    let newData;
    const splitPath = direction.split(".");
    const childPath = splitPath.pop();
    if (splitPath.length !== 0) {
      newData = update(dataNodes, splitPath.join("."), (a) => {
        a.children = (a?.children || []).filter(
          (_, index) => index !== Number(childPath.slice(-2, -1))
        );
        return a;
      });
    } else {
      newData = dataNodes;
      delete newData.children;
    }
    handleGetPathTree("");
    setData(newData);
  }, []);

  const checkExist = useCallback((nodeAdd, dataNodes) => {
    let arrCheckExist = false;
    const checkItemExist = (nodes) => {
      if (arrCheckExist) return;
      if (!nodes.children) return;
      nodes.children.map((item) => {
        if (item.name === nodeAdd) {
          arrCheckExist = true;
        } else {
          checkItemExist(item);
        }
      });
      return arrCheckExist;
    };
    return checkItemExist(dataNodes);
  }, []);

  useEffect(() => {
    if (props.nodeAdd && props.selectedPath?.length) {
      const isExist = checkExist(props.nodeAdd.trim(), cloneDeep(data));
      if (isExist) {
        return setShowError(true);
      }
      handleAddItem(props.nodeAdd, cloneDeep(data), props.selectedPath);
    }
  }, [props.nodeAdd, props.selectedPath]);

  useEffect(() => {
    if (props.selectedPath) {
      const currentNode = document.getElementById(
        cloneDeep(props.selectedPath).pop()
      );
      if (currentNode) {
        currentNode.click();
      }
    }
  }, [props.selectedPath]);

  const renderTree = useCallback(
    (nodes) => (
      <TreeItem
        key={nodes.id}
        nodeId={nodes.id}
        label={
          <FormControlLabel
            control={
              <div className={classes.rowCategory} id={nodes.name}>
                <p
                  onClick={(e) => {
                    e.preventDefault();
                    handleGetPathTree(nodes.childs);
                  }}
                >
                  {nodes.name}
                </p>
                <div className={classes.rightViewActions}>
                  <p className={classes.productView}>{nodes.product}</p>
                  {nodes.childs.length > 1 && (
                    <div className={classes.actionsRow}>
                      <Edit style={{ textAlign: "left" }} />
                      <Delete
                        style={{ textAlign: "right" }}
                        onClick={() => {
                          handleGetPathTree([]);
                          handleDelete(nodes.childs, cloneDeep(data));
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            }
            label={<></>}
            key={nodes.id}
          />
        }
      >
        {Array.isArray(nodes.children)
          ? nodes.children.map((node) => renderTree(node))
          : null}
      </TreeItem>
    ),
    [data]
  );

  return (
    <div className={classes.treeContainer}>
      <TreeView
        defaultExpanded={["0"]}
        defaultCollapseIcon={<IndeterminateCheckBoxOutlined />}
        defaultExpandIcon={<AddBoxOutlined />}
      >
        {renderTree(data)}
      </TreeView>
      <Snackbar
        open={showError}
        autoHideDuration={4000}
        onClose={() => setShowError(false)}
        anchorOrigin={{
          horizontal: "center",
          vertical: "top",
        }}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          The name tree item is exist!
        </Alert>
      </Snackbar>
    </div>
  );
}
