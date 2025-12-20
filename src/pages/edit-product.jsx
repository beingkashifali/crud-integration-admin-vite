import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

function EditProduct() {
  const param = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState({});

  async function fetchProduct() {
    const product = await axios.get(
      `https://crud-integration-admin-node.onrender.com/${param.id}`
    );
    console.log(product.data);
    setProductData(product.data);
  }

  function changeHandler(e) {
    const name = e.target.name;
    const value = e.target.value;
    setProductData({ ...productData, [name]: value });
  }

  async function submitHandler(e) {
    e.preventDefault();
    const res = await axios.patch(
      `https://crud-integration-admin-node.onrender.com/${param.id}`,
      productData
    );
    toast.success("Product updated successfully.");
    console.log(res);
    navigate("/");
  }

  //   fetchProduct();
  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <div className="w-50 mx-auto my-4">
      <h2>Edit Product</h2>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Pants"
            name="title"
            value={productData.title}
            onChange={changeHandler}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Product info"
            name="desc"
            value={productData.desc}
            onChange={changeHandler}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="15"
            name="price"
            value={productData.price}
            onChange={changeHandler}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
          <Form.Label>Rating</Form.Label>
          <Form.Control
            type="number"
            placeholder="0-5"
            name="rating"
            value={productData.rating}
            onChange={changeHandler}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
          <Form.Label>Review</Form.Label>
          <Form.Control
            type="text"
            placeholder="Client's Review"
            name="review"
            value={productData.review}
            onChange={changeHandler}
          />
        </Form.Group>
        <Button type="submit" variant="success">
          Edit
        </Button>
      </Form>
    </div>
  );
}

export default EditProduct;
