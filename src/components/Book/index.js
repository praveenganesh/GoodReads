import React from "react";
export default function Book(props) {
  let { book } = props;
  return (
    <>
      <div className="book-wrap" data-testid={`book-${props.index}`}>
        <div className="flex-cover">
          <div style={{ marginRight: "10px" }}>
            <img src={book.best_book.small_image_url._text} />
          </div>
          <div className="align-center">
            <div>
              <a
                className="bold"
                title={book.best_book.title._text}
                target="_blank"
                href={`https://www.goodreads.com/book/show/${book.best_book.id._text}`}
              >
                {book.best_book.title._text}
              </a>
              <p>
                {`-by ${book.best_book.author.name._text}`}{" "}
                <span className="rating">
                  {parseFloat(book.average_rating._text).toFixed(1)}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
