import { Options } from "vis-network";

export const options: Options = {
  physics: {
    enabled: true,
  },
  nodes: {
    font: {
      size: 16,
      color: "#ffffff",
      align: "middle", 
    },
    shape: "circle",
    size: 20, 
    color: {
      background: "#1e293b",
      border: "#6366f1",
      highlight: {
        background: "#6366f1",
        border: "#ffffff",
      },
    },
  },
  
  edges: {
    color: "#6366f1",
    width: 2,
    smooth: true,
  },
};