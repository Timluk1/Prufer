import type { INode, IEdge, IGenerateTree } from "./types";

const checkCorrectPrufer = (prufer: number[]): boolean => {
    const n = prufer.length + 2;
    return prufer.every(node => node >= 1 && node <= n);
};

// Генерация всех узлов
const generateNodes = (n: number): INode[] => {
    return Array.from({ length: n }, (_, i) => ({
        id: i + 1,
        label: (i + 1).toString(),
    }));
};

// Генерация рёбер из кода Прюфера
const generateEdges = (prufer: number[]): IEdge[] => {
    const n = prufer.length + 2;
    const degree = new Map<number, number>();

    // Подсчёт степеней вершин
    for (let i = 1; i <= n; i++) {
        degree.set(i, 1); // Все вершины изначально имеют степень 1 (лист)
    }
    for (const node of prufer) {
        degree.set(node, (degree.get(node) || 0) + 1);
    }

    const edges: IEdge[] = [];
    const available = Array.from({ length: n }, (_, i) => i + 1)
        .filter(node => degree.get(node) === 1)
        .sort((a, b) => a - b); // Массив листьев (по возрастанию)

    for (const parent of prufer) {
        const leaf = available.shift()!; // Берём первый лист
        edges.push({ id: edges.length + 1, from: leaf, to: parent });

        // Уменьшаем степень родителя
        degree.set(parent, degree.get(parent)! - 1);
        if (degree.get(parent) === 1) {
            available.push(parent);
            available.sort((a, b) => a - b); // Держим массив листьев отсортированным
        }
    }

    // Добавляем последнее ребро
    edges.push({ id: edges.length + 1, from: available[0], to: available[1] });

    return edges;
};

// Генерация дерева
const generateTree = (prufer: number[]): IGenerateTree => {
    return {
        nodes: generateNodes(prufer.length + 2),
        edges: generateEdges(prufer),
    };
};

export { checkCorrectPrufer, generateTree };
