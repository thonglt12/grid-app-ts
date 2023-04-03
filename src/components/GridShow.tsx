import React, { useContext } from "react";
import _ from "lodash";
import { GridContext } from "../store/GridContext";
import "./GridShow.css";
import IGirdModel from "../model/IGridModel";
import * as constants from '../util/constants'

const GridShow: React.FC = () => {
  const gridsCtx = useContext(GridContext);

  //   const perPage: number = 10;

  //   const dropItem: number = (gridsCtx.page - 1) * perPage;
  //   const pagingData: any = _(gridsCtx.items)
  //     .drop(dropItem)
  //     .take(perPage)
  //     .value();

  //   const totalPage = gridsCtx.items.length / perPage + 1;
  
  const pagingData: IGirdModel[] = gridsCtx.items;

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === constants.ARROW_UP) {
      event.preventDefault(); // prevent default behavior of scrolling
      gridsCtx.setKeyDown();
    }
  }

  function handleKeyUp(event: React.KeyboardEvent) {
    if (event.key === constants.ARROW_DOWN) {
      event.preventDefault(); // prevent default behavior of scrolling
      gridsCtx.setKeyUp();
    }
  }

  const renderedRows = pagingData.map((data: any, index: number) => {
    return (
      <tr
        key={index}
        className={
          index === gridsCtx.highlightedRowIndex ? "highlightedRow" : ""
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

  const renderedHeaderRows = Object.keys(gridsCtx.items[0] || {}).map((key) => {
    return <th key={key}>{key}</th>;
  });

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
            <th scope="col">#</th>
            {renderedHeaderRows}
          </tr>
        </thead>
        <tbody>{renderedRows}</tbody>
      </table>

      {/* paging */}
      <nav aria-label="Page navigation example">
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
