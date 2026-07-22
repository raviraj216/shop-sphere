import { useParams } from 'react-router-dom';

function ProductDetailsPage() {
  const { productId } = useParams();

  return <h1>Product ID : {productId}</h1>;
}

export default ProductDetailsPage;