interface IEdge {
    id: number;
    from: number;
    to: number;
}

interface INode {
    id: number;
    label: string;
}

interface IGenerateTree {
    nodes: INode[];
    edges: IEdge[];
}

export type { IEdge, INode, IGenerateTree };