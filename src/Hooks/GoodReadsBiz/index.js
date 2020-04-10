import { useState, useEffect } from "react";
import axios from "axios";
const convert = require("xml-js");

export default function useGoodreadsBiz(props) {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [pageSize, setPageSize] = useState(0);
  const [fetchigBook, setFetchingBook] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    if (page > 1) {
      search();
    }
  }, [page]);
  let config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "X-Requested-With": "XMLHttpRequest",
    },
    crossDomain: true,
  };
  const resetStates = () => {
    setFetchingBook(false);
    setBooks([]);
    setTotalPages(0);
    setTotalItems(0);
    setPage(1);
    setPageSize(0);
  };
  async function search() {
    if (query !== "") {
      let totalBooks = 0;
      setFetchingBook(true);

      let url = `/search/index.xml?key=BnVW2sCI12Jiy6lILg&q=${query}&page=${page}`;
      axios
        .get(url, config)
        .then((result) => {
          if (result && result.status === 200) {
            let res = JSON.parse(
              convert.xml2json(result.data, { compact: true, spaces: 4 })
            );

            if (page === 1) {
              if (window.location.search && window.location.search !== "") {
                totalBooks = 500;
              } else {
                totalBooks = parseInt(
                  res.GoodreadsResponse.search["total-results"]["_text"]
                );
              }

              let pageWeight = parseInt(
                res.GoodreadsResponse.search["results-end"]["_text"]
              );
              setPageSize(pageWeight);

              setTotalItems(totalBooks);
              setTotalPages(Math.ceil(totalBooks / pageWeight));
            }
            if (totalBooks >= 0 && res.GoodreadsResponse.search.results.work) {
              if (Array.isArray(res.GoodreadsResponse.search.results.work)) {
                setBooks(res.GoodreadsResponse.search.results.work);
              } else if (res.GoodreadsResponse.search.results.work.best_book) {
                setBooks([res.GoodreadsResponse.search.results.work]);
              } else {
                setBooks([]);
              }
            } else {
              setBooks([]);
            }
          } else {
            resetStates();
            alert("book search failed !");
          }
          setFetchingBook(false);
        })
        .catch((e) => {
          resetStates();
          alert("book search failed !");
        });
    }
  }

  return {
    search,
    books,
    setBooks,
    page,
    totalItems,
    pageSize,
    setPage,
    query,
    setQuery,
    fetchigBook,
    totalPages,
  };
}
