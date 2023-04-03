import React, { useContext, useMemo } from "react";
import _ from "lodash";
import { GridContext } from "../store/GridContext";
import "./GridShow.css";
import * as constants from "../util/constants";

const GridShow: React.FC = () => {
  const gridsCtx = useContext(GridContext);

  //   const dropItem: number = (gridsCtx.page - 1) * perPage;
  //   const pagingData: any = _(gridsCtx.items)
  //     .drop(dropItem)
  //     .take(perPage)
  //     .value();

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === constants.ARROW_UP) {
      event.preventDefault();
      gridsCtx.setKeyDown();
    }
  }

  function handleKeyUp(event: React.KeyboardEvent) {
    if (event.key === constants.ARROW_DOWN) {
      event.preventDefault();
      gridsCtx.setKeyUp();
    }
  }

  const renderedRows = gridsCtx.items.map((data: any, index: number) => {
    return (
      <tr
        key={index}
        className={
          index === gridsCtx.highlightedRowIndex ? "highlighted-row" : ""
        }
        onMouseEnter={() => gridsCtx.setMouseEnter(index)}
        onMouseLeave={() => gridsCtx.setMouseLeave()}
      >
        <th scope="row">{index + 1}</th>
        {Object.keys(data).map((key) => (
          <td key={key}>
            {_.truncate(data[key], {
              length: 50,
              separator: "...",
            })}
          </td>
        ))}
      </tr>
    );
  });

  const renderedHeaderRows = useMemo(() => {
    return constants.GRID_HEADER.map((headerValue: string, index: number) => {
      return <th key={index}>{headerValue}</th>;
    });
  }, []);

  return (
    <div>
      <table
        className="table table-bordered"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
      >
        <thead>
          <tr>
            <th scope="col">No.</th>
            {renderedHeaderRows}
          </tr>
        </thead>
        <tbody>{renderedRows}</tbody>
      </table>

      {/* paging */}
      <nav>
        <ul className="pagination">
          <button
            className="page-item"
            hidden={gridsCtx.page === 1}
            onClick={gridsCtx.setPrePage}
          >
            Previous
          </button>
          <button className="page-item">{gridsCtx.page}</button>
          <button className="page-item" onClick={gridsCtx.setNextPage}>
            Next
          </button>
        </ul>
      </nav>
    </div>
  );
};

export default GridShow;
