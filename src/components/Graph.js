import React, { useEffect } from 'react';
import ReactFlow, { addEdge, useNodesState, useEdgesState } from 'react-flow-renderer';
import '../styles/components.css';

const initialNodes = [
  { id: '1', data: { label: 'Want to learn a skill?' }, position: { x: 20, y: 425 } },
  { id: '2', data: { label: 'Generate guide' }, position: { x: 480, y: 300 } },
  { id: '3', data: { label: 'Follow steps' }, position: { x: 850, y: 150 } },
  { id: '4', data: { label: 'Success' }, position: { x: 1200, y: 30 } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '2', target: '3' },
  { id: 'e3-4', source: '3', target: '4' },
];

const Graph = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {}, []);

  const onConnect = (params) => setEdges((eds) => addEdge(params, eds));

  return (
    <div className="graph-container">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        style={{ width: '100%', height: '500px' }}
      />
    </div>
  );
};

export default Graph;
