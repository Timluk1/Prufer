import { useEffect, useRef, useState } from "react";
import { Network } from "vis-network";
import { DataSet } from "vis-data";
import { options } from "./options";
import type { IEdge, INode } from "./utils/preufer";
import { generateTree } from "./utils/preufer";
import "./App.css";


const Graph: React.FC = () => {
  const [pruferCode, setPruferCode] = useState<string>("");
  const [nodes, setNodes] = useState<INode[]>([]);
  const [edges, setEdges] = useState<IEdge[]>([]);
  const [error, setError] = useState<string>("");
  const [showGraph, setShowGraph] = useState<boolean>(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPruferCode(e.target.value);
  }

  const onClick = () => {
    const resultParse = generateTree(pruferCode.split(" ").map(Number));
    console.log(resultParse.edges);
    setEdges(resultParse.edges);
    setNodes(resultParse.nodes);
    setShowGraph(true);
  }

  const containerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!containerRef.current) return;

    const nodesDataSet = new DataSet<{ id: number; label: string }>(nodes);

    const edgesDataSet = new DataSet<{ id: number; from: number; to: number }>(edges);

    const network = new Network(containerRef.current, { nodes: nodesDataSet, edges: edgesDataSet }, options);

    return () => network.destroy();
  }, [edges, nodes]);

  return (
    <div className="graph-container">
      <h1 className="graph__title">Генерация дерева по коду Прюфера</h1>
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="Введите код Прюфера через"
          className="graph-input"
          onChange={onChange}
        />
        <button className="graph__button" onClick={onClick}>Вывести дерево</button>
      </div>
      {
        showGraph &&
        <div className="graph-display">
          <div ref={containerRef} className="graph-network" />
        </div>
      }
    </div>
  );
};

export default Graph;