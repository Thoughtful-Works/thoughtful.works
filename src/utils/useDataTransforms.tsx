import { useState } from "react";
import { PersonNode, DataNode } from "./hexTypes";

export interface UseDataTransformsProps {
  data: DataNode;
}

export const useDataTransforms = ({ data }: UseDataTransformsProps) => {
  const [state, setState] = useState(data);
  return [state, setState] as const;
};
