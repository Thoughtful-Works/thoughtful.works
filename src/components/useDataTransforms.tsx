import { useState } from "react";
import { PersonNode, DataNode } from "./hexTypes";

export const sampleData: PersonNode = {
  type: "person",
  title: "Amit Kumar",
  children: [
    {
      type: "offering",
      title: "1", //"Web Software Architect",
    },
    {
      type: "offering",
      title: "2", //"Engineering Leader",
    },
    {
      type: "offering",
      title: "3", //"Entrepreneur",
    },
    {
      type: "offering",
      title: "4",
    },
    {
      type: "offering",
      title: "5",
    },
    {
      type: "offering",
      title: "6",
    },
  ],
};

export interface UseDataTransformsProps {
  data: DataNode;
}

export const useDataTransforms = ({ data }: UseDataTransformsProps) => {
  const [state, setState] = useState(data);
  return [state, setState] as const;
};
