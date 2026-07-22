import { useParams } from 'react-router-dom';

function OrderDetailsPage() {    
    const { orderId } = useParams();
    return (
        <p>Order id : {orderId}</p>
    );
}
export default OrderDetailsPage;