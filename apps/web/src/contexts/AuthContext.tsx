import { getMe } from "@/graphql/user";
import { User } from "@kepto/db";
import React, { createContext } from "react";
import { useQuery } from "react-query";

export type AuthContextType = {
  user: User | null;
  updateUser: (u: User) => void;
};

export type AuthContextProviderProps = {
  children?: React.ReactNode;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  updateUser() {},
});

export default AuthContext;

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const { data, isLoading } = useQuery("me", getMe);

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user: data?.me!, updateUser(u) {} }}>
      {children}
    </AuthContext.Provider>
  );
};
