import "./App.css";
import { useEffect, useState } from "react";
import * as BooksAPI from "./BooksAPI";
import MainPage from "./components/MainPage";
import SearchPage from "./components/SearchPage";

function App() {
  const [books, setBooks] = useState([]);
  const [isSearchPageOpen, setIsSearchPageOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");


  useEffect(() => {
    console.log("Theme changed to:", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setIsLoading(true);
        setError("");
        const data = await BooksAPI.getAll();
        setBooks(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("Failed to load books.");
      } finally {
        setIsLoading(false);
      }
    };

    loadBooks();
  }, []);

  const handleMoveBook = async (book, shelf) => {
    try {
      await BooksAPI.update(book, shelf);

      setBooks((prevBooks) => {
        const existingBook = prevBooks.find((b) => b.id === book.id);

        if (shelf === "none") {
          return prevBooks.filter((b) => b.id !== book.id);
        }

        if (existingBook) {
          return prevBooks.map((b) =>
            b.id === book.id ? { ...b, shelf } : b
          );
        }

        return [...prevBooks, { ...book, shelf }];
      });
    } catch (err) {
      setError("Failed to update book.");
    }
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className={`app theme-${theme}`}>
      <button
        type="button"
        onClick={toggleTheme} className="theme-toggle">
        {theme === "light" ? "Dark Mode" : "Light Mode"}
      </button>
      {error && <p style={{ padding: "1rem" }}>{error}</p>}

      {isSearchPageOpen ? (
        <SearchPage
          books={books}
          onClose={() => setIsSearchPageOpen(false)}
          onMoveBook={handleMoveBook}
        />
      ) : (
        <MainPage
          books={books}
          isLoading={isLoading}
          onOpen={() => setIsSearchPageOpen(true)}
          onMoveBook={handleMoveBook}
        />
      )}
    </div>
  );
}

export default App;