import { useState } from "react";
import { Graph } from "./components/Graph";
import type { IEdge, INode } from "./utils/preufer";
import { generateTree } from "./utils/preufer";
import { checkCorrectPrufer } from "./utils/preufer/prufer";
import styles from "./App.module.css";

const App: React.FC = () => {
  const [pruferCode, setPruferCode] = useState<string>("");
  const [nodes, setNodes] = useState<INode[]>([]);
  const [edges, setEdges] = useState<IEdge[]>([]);
  const [error, setError] = useState<string>("");
  const [showGraph, setShowGraph] = useState<boolean>(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPruferCode(e.target.value);
  };

  const onClick = () => {
    const array = pruferCode.split(" ").map(Number);
    if (checkCorrectPrufer(array)) {
      setShowGraph(true);
      const resultParse = generateTree(array);
      setEdges(resultParse.edges);
      setNodes(resultParse.nodes);
      setError(""); 
    } else {
      setError("Некорректный код Прюфера");
      setShowGraph(false); 
    }
  };

  return (
    <div className={styles.graph2}>
      <h1 className={styles.title}>Генерация дерева по коду Прюфера</h1>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          placeholder="Введите код Прюфера через пробел"
          className={`${styles.input} ${error ? styles.errorInput : ""}`}
          value={pruferCode}
          onChange={onChange}
        />
        {error && <span className={styles.errorText}>{error}</span>}
        <button className={styles.button} onClick={onClick}>Вывести дерево</button>
      </div>
      <Graph show={showGraph} nodes={nodes} edges={edges} />
    </div>
  );
};

export default App;
