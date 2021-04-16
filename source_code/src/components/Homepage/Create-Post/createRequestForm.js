import { React, useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { createRequest } from "../../../store/actions/requestActions";
import "../homepage.css";

function CreateRequestForm({ selectedTag, createRequest, modalClose }) {
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(null);
  const types = ["image/png", "image/jpeg"];
  var images = [];

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidated(true);
    const form = e.target;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      return;
    }
    const formData = new FormData(form);
    const formDataObj = Object.fromEntries(formData.entries());
    console.log(formDataObj);
    createRequest(formDataObj, images);
    modalClose();
  };

  useEffect(() => {
    if (document.getElementsByName("form")[0]) {
      document.getElementsByName("form")[0].reset();
      setValidated(false);
    }
  }, [selectedTag]);

  const handleChange = (e) => {
    e.preventDefault();
    images = e.target.files;
    console.log(images);
  };

  return (
    <div>
      <br />
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        name="form"
      >
        <Row>
          <Col>
            <Form.Control
              required
              type="text"
              placeholder="Title"
              name="title"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please enter a title.
            </Form.Control.Feedback>
          </Col>

          <Col>
            <Form.Control
              type="text"
              required
              placeholder="Location"
              name="location"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please enter a location.
            </Form.Control.Feedback>
          </Col>
        </Row>
        <br />
        <Form.Group>
          <Form.Label>Message</Form.Label>
          <Form.Control as="textarea" rows={3} required name="message" />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please enter a message.
          </Form.Control.Feedback>
        </Form.Group>
        <Row>
          <Col>
            <Form.Group as={Col}>
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                defaultValue="Choose..."
                required
                name="category"
              >
                <option disabled={true}>Choose...</option>
                <option>Clothing</option>
                <option>Electronics</option>
                <option>Food</option>
                <option>Hobbies</option>
                <option>Home & Living</option>
                <option>Other</option>
              </Form.Control>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please choose a Category.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <input
                type="file"
                className="position-relative"
                name="file"
                label="Add Image"
                onChange={handleChange}
                multiple
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please choose a valid image.
              </Form.Control.Feedback>
              {error && <div className="error">{error}</div>}
            </Form.Group>
          </Col>
        </Row>
        <br />
        <Row>
          <Col></Col>
          <Col>
            <Button className="add-request-button" variant="dark" type="submit">
              Add Request
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    createRequest: (request, images) =>
      dispatch(createRequest(request, images)),
  };
};

export default connect(null, mapDispatchToProps)(CreateRequestForm);
