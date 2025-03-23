// GlobalStateContext.tsx
"use client";
import { createContext, useContext, useState } from "react";
import { oneProd } from "../cautrucdata";


interface SearchState {
  searchResults: oneProd[];
  currentPage: number;
  totalPages: number;
}

export const GlobalStateContext = createContext<{
  searchState: SearchState;
  setSearchState: React.Dispatch<React.SetStateAction<SearchState>>;
}>({
  searchState: { searchResults: [], currentPage: 1, totalPages: 1 },
  setSearchState: () => {},
});

export const GlobalStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchState, setSearchState] = useState<SearchState>({
    searchResults: [],
    currentPage: 1,
    totalPages: 1,
  });

  return (
    <GlobalStateContext.Provider value={{ searchState, setSearchState }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useContextGlobal = () => useContext(GlobalStateContext);