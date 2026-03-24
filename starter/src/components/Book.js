function Book({ book, onMoveBook }) {
    const imageUrl = book?.imageLinks?.thumbnail || "";
    const authors = Array.isArray(book?.authors) ? book.authors.join(", ") : "";
  
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: imageUrl ? `url("${imageUrl}")` : "none",
                backgroundColor: imageUrl ? "transparent" : "#f0f0f0",
              }}
            />
  
            <div className="book-shelf-changer">
              <select
                value={book.shelf || "none"}
                onChange={(event) => onMoveBook(book, event.target.value)}
              >
                <option value="move" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
  
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{authors}</div>
        </div>
      </li>
    );
  }
  
  export default Book;