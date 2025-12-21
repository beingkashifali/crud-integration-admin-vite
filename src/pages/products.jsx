import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import toast from "react-hot-toast";

function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "https://crud-integration-admin-node.onrender.com/"
        );
        setProducts(res.data);
        console.log(res.data.products);
      } catch (error) {
        console.error("Axios GET error:", error.message);
      }
    };

    fetchProducts();
  }, []);

  async function deleteProduct(id) {
    await axios.delete(
      `https://crud-integration-admin-node.onrender.com/${id}`
    );
    const singleProduct = products.filter((product) => product._id !== id);
    setProducts(singleProduct);
    toast.success("Product deleted successfully.");
  }

  return (
    <div className="w-75 mx-auto my-4">
      <div className="d-flex justify-content-between align-items-center">
        <h1>All Products</h1>
        <Button variant="secondary" onClick={() => navigate("/create-product")}>
          Create Product
        </Button>
      </div>

      <div className="d-flex justify-content-center gap-4 mt-4 flex-wrap">
        {products.map((product) => (
          <Card key={product._id} style={{ width: "300px" }}>
            <Card.Img
              style={{ height: "300px" }}
              variant="top"
              src={product.productImage}
              // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQsmOvRlNQdkUocXUiM46PApbCHHSoV4Cc2A&s"
            />
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>{product.desc}</Card.Text>
              <Card.Text>Price: ${product.price}</Card.Text>
              <Card.Text>Rating: {product.rating}</Card.Text>
              <Card.Text>Review: {product.review}</Card.Text>
              <div className="d-flex align-items-center justify-content-between">
                <Button variant="primary">Details</Button>
                <div className="actions fs-2 d-flex gap-2">
                  <MdDelete
                    className="border p-1 "
                    onClick={() => deleteProduct(product._id)}
                  />
                  <MdEdit
                    className="border p-1 "
                    onClick={() => navigate(`/edit-product/${product._id}`)}
                  />
                </div>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Products;
