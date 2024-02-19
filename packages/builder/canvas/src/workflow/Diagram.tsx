/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import { type BaseBlockWithIdType, useCanvas } from "@fibr/providers";
import { Thread } from "@fibr/react";
import { useBlocks } from "@fibr/shared";
import { useCallback, useMemo } from "react";
import {
  Background,
  Connection,
  DefaultEdgeOptions,
  Edge,
  FitViewOptions,
  Node,
  NodeDragHandler,
  type NodeTypes,
  OnEdgesChange,
  OnNodesChange,
  ReactFlow,
  SelectionMode,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  useStoreApi,
} from "reactflow";
import "reactflow/dist/style.css";

const fitViewOptions: FitViewOptions = {
  padding: 0.5,
};

const defaultEdgeOptions: DefaultEdgeOptions = {
  animated: true,
};

const MIN_DISTANCE = 200;

export function Diagram() {
  const store = useStoreApi();

  const config = useBlocks((state) => state.config);

  const { nodes, edges, set } = useCanvas(({ all, set }) => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    const blocks = all();

    for (const block of blocks) {
      if (block.type === "edge") edges.push(block as Edge);
      else nodes.push(block as Node);
    }

    return {
      nodes,
      edges,
      set,
    };
  });

  console.log(nodes, edges);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) =>
      set(
        (nds) =>
          applyNodeChanges(changes, nds as Node[]) as BaseBlockWithIdType[],
      ),
    [set],
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) =>
      set(
        (edgs) =>
          applyEdgeChanges(changes, edgs as Edge[]) as BaseBlockWithIdType[],
      ),
    [set],
  );

  const onConnect = useCallback(
    (params: Connection) =>
      set(
        (eds) =>
          addEdge(
            { ...params, type: "edge" },
            eds as Edge[],
          ) as BaseBlockWithIdType[],
      ),
    [set],
  );

  const nodeTypes = useMemo(
    () =>
      Object.keys(config).reduce<NodeTypes>((prev, name) => {
        prev[name] = Thread;
        return prev;
      }, {}),
    [config],
  );

  const getClosestEdge = useCallback(
    (node: Node) => {
      const { nodeInternals } = store.getState();
      const storeNodes = Array.from(nodeInternals.values());

      const closestNode = storeNodes.reduce<{
        distance: number;
        node: Node | null;
      }>(
        (res, n) => {
          if (n.id !== node.id && n.positionAbsolute && node.positionAbsolute) {
            const dx = n.positionAbsolute.x - node.positionAbsolute.x;
            const dy = n.positionAbsolute.y - node.positionAbsolute.y;
            const d = Math.sqrt(dx * dx + dy * dy);

            if (d < res.distance && d < MIN_DISTANCE) {
              res.distance = d;
              res.node = n;
            }
          }

          return res;
        },
        {
          distance: Number.MAX_VALUE,
          node: null,
        },
      );

      if (!closestNode.node) {
        return null;
      }

      let closeNodeIsSource = false;

      if (closestNode.node.positionAbsolute && node.positionAbsolute)
        closeNodeIsSource =
          closestNode.node.positionAbsolute.x < node.positionAbsolute.x;

      return {
        id: closeNodeIsSource
          ? `${closestNode.node.id}-${node.id}`
          : `${node.id}-${closestNode.node.id}`,
        type: "default",
        source: closeNodeIsSource ? closestNode.node.id : node.id,
        target: closeNodeIsSource ? node.id : closestNode.node.id,
        className: "",
      };
    },
    [store],
  );

  const onNodeDrag: NodeDragHandler = useCallback(
    (_, node) => {
      const closeEdge = getClosestEdge(node);

      set((es) => {
        const nextEdges = es.filter((e) => e.className !== "temp");

        if (
          closeEdge &&
          !nextEdges.find(
            (ne) =>
              ne.source === closeEdge.source && ne.target === closeEdge.target,
          )
        ) {
          closeEdge.className = "temp";
          // @ts-ignore
          nextEdges.push(closeEdge);
        }
        return nextEdges;
      });
    },
    [getClosestEdge, set],
  );

  const onNodeDragStop: NodeDragHandler = useCallback(
    (_, node) => {
      const closeEdge = getClosestEdge(node);

      set((es) => {
        const nextEdges = es.filter((e) => e.className !== "temp");

        if (
          closeEdge &&
          !nextEdges.find(
            (ne) =>
              ne.source === closeEdge.source && ne.target === closeEdge.target,
          )
        )
          // @ts-ignore
          nextEdges.push(closeEdge);

        return nextEdges;
      });
    },
    [getClosestEdge, set],
  );

  return (
    <div className="flex-1">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodesConnectable
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeDrag={onNodeDrag}
        onNodeDragStop={onNodeDragStop}
        onConnect={onConnect}
        fitViewOptions={fitViewOptions}
        defaultEdgeOptions={defaultEdgeOptions}
        nodeTypes={nodeTypes}
        proOptions={{ hideAttribution: true }}
        selectionMode={SelectionMode.Partial}
        selectionOnDrag
        panOnScroll
        panOnDrag={[1, 2]}
      >
        <Background />
      </ReactFlow>
    </div>
  );
}
