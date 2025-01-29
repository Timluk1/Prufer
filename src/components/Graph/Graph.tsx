import { useEffect, useRef } from "react";
import {Network } from "vis-network";
import { DataSet } from "vis-data";
import type { INode, IEdge } from "../../utils/preufer";
import { options } from "../../options";
import classnames from "classnames"
import styles from "./graph.module.css"

interface IGraphProps {
    show: boolean;
    nodes: INode[];
    edges: IEdge[];
    className?: string;
}

export const Graph: React.FC<IGraphProps> = ({ show, nodes, edges, className}) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (!containerRef.current) return;

        const nodesDataSet = new DataSet<{ id: number; label: string }>(nodes);

        const edgesDataSet = new DataSet<{ id: number; from: number; to: number }>(edges);

        const network = new Network(containerRef.current, { nodes: nodesDataSet, edges: edgesDataSet }, options);

        return () => network.destroy();
    }, [edges, nodes]);
    return (
        <div className={classnames(styles.graph, className, show ? styles.show : styles.hide)}>
            <div ref={containerRef} className={styles.graphNetwork} />
        </div>
    )
}
