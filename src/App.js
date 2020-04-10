import React from "react";
import useGoodreadsBiz from "./Hooks/GoodReadsBiz";
import Book from "./components/Book";
import Pagination from "./components/Pagination";
import "./App.css";

function App(props) {
  let biz = useGoodreadsBiz(props);
  let { books } = biz;
  const renderPagination = () => {
    return (
      !biz.fetchigBook &&
      biz.totalPages > 1 && (
        <div className="justify-end">
          <Pagination
            currentPage={biz.page}
            totalPages={biz.totalPages}
            onChange={(page) => biz.setPage(page)}
          />
        </div>
      )
    );
  };
  return (
    <div className="App">
      <header className="App-header">
        <p className="title">Good reads</p>
        <div className="wrapper">
          <div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <input
                type="text"
                placeholder="Search books ..."
                data-testid="search-box"
                value={biz.query}
                onChange={(e) => {
                  biz.setQuery(e.target.value);
                }}
              />
              <button
                data-testid="search-btn"
                onClick={() => {
                  biz.setPage(1);
                  biz.search();
                }}
              >
                search
              </button>
            </div>
          </div>
          <Pagination />
          <div>
            {biz.fetchigBook && <p className="info">Loading ...</p>}
            {!biz.fetchigBook && books.length === 0 && (
              <p className="info">No items</p>
            )}
            {biz.totalItems > 0 && !biz.fetchigBook && (
              <div className="justify-end">
                <p>{`${biz.pageSize} out of ${biz.totalItems} records`}</p>
              </div>
            )}

            {renderPagination()}
            <div>
              {!biz.fetchigBook &&
                books.map((book, index) => {
                  return <Book book={book} key={index} index={index} />;
                })}
            </div>
            {renderPagination()}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
