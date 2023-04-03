import axios from "axios";
import React, { useEffect, useState } from "react";
import IGirdModel from "../model/IGridModel";
import * as constants from '../util/constants'

type GridContextObj = {
  highlightedRowIndex: number | null;
  page: number;
  items: IGirdModel[];
  setPrePage: () => void;
  setNextPage: () => void;
  setKeyDown: () => void;
  setKeyUp: () => void;
  setMouseEnter: (index: number) => void;
  setMouseLeave: () => void;
};

export const GridContext = React.createContext<GridContextObj>({
  page: 0,
  highlightedRowIndex: 0,
  items: [],
  setPrePage: () => {},
  setNextPage: () => {},
  setKeyDown: () => {},
  setKeyUp: () => {},
  setMouseEnter: (index: number) => {},
  setMouseLeave: () => {},
});

const GridContextProvider: React.FC<{ children?: React.ReactNode }> = (
  props
) => {
  const [page, setPage] = useState(1);
  const [grids, setGrids] = useState<IGirdModel[]>([]);
  const [highlightedRowIndex, setHighlightedRowIndex] = useState<number | null>(
    null
  );

  const fetchGirdData = async (page: number) => {
    const rs = await axios.get(
      `https://fsg-tss.onrender.com/users?_page=${page}&_limit=${constants.PER_PAGE}`
    );
    setGrids(rs.data);
  };

  useEffect(() => {
    fetchGirdData(page);
  }, [page]);

  const setPrePage = () => {
    setPage(page - 1);
  };

  const setNextPage = () => {
    setPage(page + 1);
  };

  const setKeyDown = () => {
    const index: number = highlightedRowIndex ?? 0;
    const nextIndex: number = index > 0 ? index - 1 : 0;
    setHighlightedRowIndex(nextIndex);
  };

  const setKeyUp = () => {
    const index = highlightedRowIndex ?? 0; // get current selected row, or default to first row
    const nextIndex = index < constants.PER_PAGE - 1 ? index + 1 : constants.PER_PAGE - 1; // calculate index of previous row
    setHighlightedRowIndex(nextIndex); // update selected row state
  };

  const setMouseEnter = (index: number) => {
    setHighlightedRowIndex(index);
  };

  const setMouseLeave = () => {
    setHighlightedRowIndex(null);
  };

  const contextValue: GridContextObj = {
    highlightedRowIndex,
    page,
    items: grids,
    setPrePage: setPrePage,
    setNextPage: setNextPage,
    setKeyDown: setKeyDown,
    setKeyUp: setKeyUp,
    setMouseEnter: setMouseEnter,
    setMouseLeave: setMouseLeave,
  };

  return (
    <GridContext.Provider value={contextValue}>
      {props.children}
    </GridContext.Provider>
  );
};

export default GridContextProvider;
