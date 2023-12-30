"use client";

import { Circle, userCirclesList } from "@kepto/shared";
import { createContext } from "react";
import { useQuery } from "react-query";

interface SharedDataContextType {
  userCircles: Circle[] | [] | null;
}

const SharedDataContext = createContext<SharedDataContextType>({
  userCircles: [],
});

export default SharedDataContext;

interface SharedDataContextProviderProps {
  children: React.ReactNode;
}

export const SharedDataContextProvider: React.FC<
  SharedDataContextProviderProps
> = ({ children }) => {
  const { data, isLoading } = useQuery("userCirclesList", userCirclesList);

  if (isLoading) {
    return null;
  }

  const contextData = {
    userCircles: data?.userCirclesList!,
  };

  return (
    <SharedDataContext.Provider value={contextData}>
      {children}
    </SharedDataContext.Provider>
  );
};
