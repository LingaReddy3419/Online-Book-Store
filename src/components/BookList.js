import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchBooks } from '../services/bookService';
import SearchBar from './SearchBar';

import '../styles/styles.css';

const BookList = () => {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [cartQty, setCartQty] = useState(JSON.parse(localStorage.getItem('cart')).length || 0);

    useEffect(() => {
        fetchBooks("").then(data => setBooks(data));
    }, []);

    const clickBook = (bookId) => {
        navigate(`/book/:${bookId}`)
    }

    // Helper function to add a book to the cart in local storage
    const addToCart = (book) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || []; // Get the current cart from localStorage

        // Check if the book is already in the cart
        const isBookInCart = cart.find(item => item.id === book.id);
        if (!isBookInCart) {
            cart.push(book); // Add book to cart
            localStorage.setItem('cart', JSON.stringify(cart)); // Update local storage
            alert(`${book.volumeInfo.title} added to cart!`);
        } else {
            alert('This book is already in your cart.');
        }
        setCartQty(cart.length)

        // navigate(`/cart`);
    }

    return (
        <div className="book-list">
            <h1 className='main-heading'>Books Library</h1>
            <h3 onClick={() => {
                navigate("/cart")
            }} style={{
                marginLeft: 'auto',
                cursor: 'pointer'
            }}>🛒 {cartQty}</h3>
            <div className='main-heading'><SearchBar setBooks={setBooks} /></div>

            <div className='books-container'>
                {books?.map(book => (
                    <div className='book-card' key={book.id}>
                        <div onClick={() => clickBook(book.id)} >
                            <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
                            <h2>{book.volumeInfo.title}</h2>
                            <p>{book.volumeInfo.authors?.join(", ")}</p>
                        </div>
                        <button className='add-btn' onClick={() => addToCart(book)}>Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookList;
