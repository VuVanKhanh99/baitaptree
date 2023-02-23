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

export default function RecursiveTreeView(props) {
  const classes = useStyles();
  const [data, setData] = useState(nodeDatas);
  const handleGetPathTree = useCallback((path) => {
    if (path) {
      props.handleGetPath(path);
    }
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
    const newData = update(dataNodes, direction, (a) => {
      a.children = (a?.children || []).concat({
        id: uuidv4(),
        name: nodeAdd,
        childs: a.childs.concat(nodeAdd),
        product: "",
      });
      return a;
    });
    setData(newData);
    props.setNodeAdd("");
  }, []);

  useEffect(() => {
    if (props.nodeAdd && props.selectedPath?.length) {
      handleAddItem(props.nodeAdd, cloneDeep(data), props.selectedPath);
    }
  }, [props.nodeAdd, props.selectedPath]);

  const renderTree = useCallback(
    (nodes) => (
      <TreeItem
        key={nodes.id}
        nodeId={nodes.id}
        label={
          <FormControlLabel
            control={
              <div
                className={classes.rowCategory}
                onClick={() => handleGetPathTree(nodes.childs)}
              >
                <p>{nodes.name}</p>
                <div className={classes.rightViewActions}>
                  <p className={classes.productView}>{nodes.product}</p>
                  <div className={classes.actionsRow}>
                    <Edit style={{ textAlign: "left" }} />
                    <Delete style={{ textAlign: "right" }} />
                  </div>
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
        defaultCollapseIcon={<IndeterminateCheckBoxOutlined />}
        defaultExpanded={["0"]}
        defaultExpandIcon={<AddBoxOutlined />}
      >
        {renderTree(data)}
      </TreeView>
    </div>
  );
}
