import React, { createContext, useContext, useState } from "react";

// Tạo Context
const SearchContext = createContext();

// Tạo Provider
export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dataSearch, setDataSearch] = useState([]);

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm, dataSearch, setDataSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

// Hook để sử dụng context
export const useSearch = () => useContext(SearchContext);
