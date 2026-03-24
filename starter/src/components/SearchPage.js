import { useEffect, useState } from "react";
import * as BooksAPI from "../BooksAPI";
import Book from "./Book";

function SearchPage({ books, onClose, onMoveBook }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const runSearch = async () => {
      const trimmedQuery = query.trim();

      if (!trimmedQuery) {
        setResults([]);
        return;
      }

      try {
        setIsSearching(true);
        const data = await BooksAPI.search(trimmedQuery, 20);

        if (!Array.isArray(data)) {
          setResults([]);
          return;
        }

        const mergedResults = data.map((resultBook) => {
          const existingBook = books.find((b) => b.id === resultBook.id);
          return existingBook ? existingBook : { ...resultBook, shelf: "none" };
        });

        setResults(mergedResults);
      } catch (err) {
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    runSearch();
  }, [query, books]);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <button className="close-search" onClick={onClose} type="button">
          Close
        </button>

        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
      </div>

      <div className="search-books-results">
        {isSearching && <p style={{ padding: "1rem" }}>Searching...</p>}

        <ol className="books-grid">
          {results.map((book) => (
            <Book key={book.id} book={book} onMoveBook={onMoveBook} />
          ))}
        </ol>
      </div>
    </div>
  );
}

export default SearchPage;