import { useNavigate } from 'react-router-dom';
import '../styles/styles.css';


const CheckoutPage = () => {

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Order placed successfully!");
    };

    return (
        <>
            <button onClick={() => {
                navigate("/")
            }} className='btn'>Home</button>
            <button onClick={() => {
                navigate('/cart')
            }} className='btn'>Back</button>
            <form onSubmit={handleSubmit} style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '100%'
            }}>
                <input type="text" placeholder="Name" required className='input-checkout' />
                <input type="email" placeholder="Email" required className='input-checkout' />
                <input type="text" placeholder="Address" required className='input-checkout' />
                <input type="text" placeholder="Card Number" required className='input-checkout' />
                <button type="submit" className='checkout-btn' onClick={() => {
                    alert("Proceed for Payment")
                }}>Checkout</button>
            </form>
        </>
    );
};

export default CheckoutPage;
