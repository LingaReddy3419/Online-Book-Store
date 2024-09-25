// pages/CheckoutPage.js
const CheckoutPage = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Order placed successfully!");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" required />
            <input type="email" placeholder="Email" required />
            <input type="text" placeholder="Address" required />
            <input type="text" placeholder="Card Number" required />
            <button type="submit">Checkout</button>
        </form>
    );
};

export default CheckoutPage;
