import React, { useEffect, useState } from 'react';
import displayRWFCurrency from '../helpers/displayCurrency'; // Currency formatter

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const response = await fetch('/api/orders', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`, // Assuming token-based authentication
                },
            });

            const responseData = await response.json();

            if (responseData.success) {
                setOrders(responseData.orders);
            } else {
                console.error('Error fetching orders:', responseData);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    if (loading) {
        return <div>Loading orders...</div>;
    }

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">My Orders</h1>
            {orders.length === 0 ? (
                <p>No orders found</p>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white p-4 border rounded">
                            <h2 className="text-xl font-semibold">Order #{order._id}</h2>
                            <p>Status: {order.paymentStatus}</p>
                            <p>Total Price: {displayRWFCurrency(order.totalPrice)}</p>
                            <p>Payment Method: {order.paymentMethod}</p>
                            <ul>
                                {order.products.map((product) => (
                                    <li key={product.productId}>
                                        {product.productName} - {product.quantity} x {displayRWFCurrency(product.price)}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrdersPage;
