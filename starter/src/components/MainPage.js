import Bookshelf from "./Bookshelf";
import {Link} from "react-router-dom";

function MainPage({ books, isLoading, onOpen, onMoveBook }) {
    const currentlyReading = books.filter(
        (book) => book.shelf === "currentlyReading"
    );
    const wantToRead = books.filter((book) => book.shelf === "wantToRead");
    const read = books.filter((book) => book.shelf === "read");
    const wantToGift = books.filter((book) => book.shelf === "wantToGift");

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>

            <div className="list-books-content">
                <div>
                    {isLoading ? (
                        <p style={{ padding: "1rem" }}>Loading books...</p>
                    ) : (
                        <>
                            <Bookshelf
                                title="Currently Reading"
                                books={currentlyReading}
                                onMoveBook={onMoveBook}
                            />


                            <Bookshelf
                                title="Want to gift "
                                books={wantToGift}
                                onMoveBook={onMoveBook}
                            />

                            <Bookshelf
                                title="Want to Read"
                                books={wantToRead}
                                onMoveBook={onMoveBook}
                            />

                            <Bookshelf
                                title="Read"
                                books={read}
                                onMoveBook={onMoveBook}
                            />
                        </>
                    )}
                </div>
            </div>

            <div className="open-search">
                <Link to="/search" className="fab" aria-label="Add a book" >
                    +
                </Link>
            </div>
        </div>
    );
}

export default MainPage;