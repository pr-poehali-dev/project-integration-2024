import { createContext, useContext, useState, ReactNode } from "react";

interface PointsContextType {
  points: number;
  addPoints: (amount: number) => void;
}

const PointsContext = createContext<PointsContextType>({ points: 0, addPoints: () => {} });

export function PointsProvider({ children }: { children: ReactNode }) {
  const [points, setPoints] = useState(0);
  const addPoints = (amount: number) => setPoints((p) => p + amount);
  return <PointsContext.Provider value={{ points, addPoints }}>{children}</PointsContext.Provider>;
}

export const usePoints = () => useContext(PointsContext);
