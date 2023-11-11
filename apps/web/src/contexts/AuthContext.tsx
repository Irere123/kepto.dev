import { gqlClient } from "@/graphql/gqlClient";
import { ME_QUERY, getMe } from "@/graphql/user";
import { User } from "@kepto/db";
import React, { createContext, useEffect, useState } from "react";
import { useQuery } from "react-query";

export type AuthContextType = {
  user: User | null | undefined;
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
    return <div className="text-primary-fg">loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user: data?.me, updateUser(u) {} }}>
      {children}
    </AuthContext.Provider>
  );
};
