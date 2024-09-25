import { useState, useEffect } from 'react';
import '../styles/styles.css';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const [cart, setCart] = useState(cartItems);
    const navigate = useNavigate();

    // Function to update the quantity of a specific item in the cart
    const updateQuantity = (id, amount) => {
        const updatedCart = cart.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    quantity: Math.max(1, (item.quantity || 1) + amount), // Ensure the quantity is at least 1
                };
            }
            return item;
        });
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update local storage
    };

    // Function to remove an item from the cart
    const removeItem = (id) => {
        const updatedCart = cart.filter(item => item.id !== id);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update local storage
    };

    // Calculate the total price of the items in the cart
    const calculateTotal = () => {
        return cart.reduce((total, item) => {
            const price = item.saleInfo.saleability === "FOR_SALE" ? (item.saleInfo?.retailPrice?.amount || 0) : 0;
            return total + price * (item.quantity || 1);
        }, 0).toFixed(2);
    };

    return (
        <div className="cart">
            <h1 className='main-heading'>Cart</h1>
            <button onClick={() => {
                navigate("/")
            }} className='btn'>Home</button>
            {cart.map(item => (
                <div key={item.id} className='cart-card-item'>
                    <h2>{item.volumeInfo.title}</h2>
                    <h4 style={{
                        marginLeft:'auto'
                    }}>
                        Price: {item.saleInfo.saleability === "FOR_SALE" ? `$${item.saleInfo?.retailPrice?.amount}` : item.saleInfo.saleability}
                    </h4>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '10px',
                        marginLeft: 'auto',
                        
                    }}>
                        <span className='decrease-qty' onClick={() => updateQuantity(item.id, -1)}>-</span>
                        <p className='quantity'>{item.quantity || 1}</p>
                        <span className='increase-qty' onClick={() => updateQuantity(item.id, 1)}>+</span>
                    </div>
                    <button className='remove-btn' onClick={() => removeItem(item.id)}>Remove</button>
                </div>
            ))}
            {
                cart.length > 0 &&
                <div className="checkout-section">
                    <h3>Total: ${calculateTotal()}</h3>
                        <button className='checkout-btn' onClick={() => {
                            navigate("/checkout")
                    }}>Checkout</button>
                </div>
            }

        </div>
    );
};

export default Cart;
