import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchBooks } from '../services/bookService';
import '../styles/styles.css'

const BookPage = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        fetchBooks(id).then(data => setBook(data[0]));
    }, [id]);

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

        // navigate(`/cart`);
    }

    console.log(book)
    return (
        book ? (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <button onClick={() => {
                    navigate("/")
                }} style={{
                    marginBottom: '20px',
                    marginTop:'20px'
                }}>Home Page</button>
                <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
                <h1>Title:<span>{book.volumeInfo.title}</span></h1>
                <h2>Author: {book.volumeInfo?.authors?.[0]}</h2>
                <h3>Published By: {book.volumeInfo.publisher}</h3>
                <h3>Publishing Year: {book.volumeInfo.publishedDate}</h3>
                <p>Description:{book.volumeInfo.description}</p>
                <button className='add-btn' onClick={() => addToCart(book)}>Add to Cart</button>
            </div>
        ) : <p>Loading...</p>
    );
};

export default BookPage;
