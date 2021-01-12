import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { LocalForm, Control, Errors } from "react-redux-form";
import { Link } from "react-router-dom";

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);




class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      raiting: "",
      author: "",
      text: "",
      touched: {
        author: false,
      },
    };

    this.openModal = this.openModal.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validate(author) {
    const errors = {
      author: "",
    };

    if (this.state.touched.author) {
      if (author.length < 2) {
        errors.author = "Your name must be at least 2 characters.";
      } else if (author.length > 15) {
        errors.author = "Your name must be 15 or less characters.";
      }
    }

    return errors;
  }

  handleBlur = (field) => () => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  };

  openModal = () => this.setState({ isOpen: true });
  closeModal = () => this.setState({ isOpen: false });

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(values) {
    this.openModal();
    this.props.addComment(this.props.campsiteId, values.rating, values.author, values.text);
  }

  render() {


    return (
      <React.Fragment>
        <div>
          <Button
            outline
            color="secondary"
            className="fa-lg"
            onClick={this.openModal}
          >
            <i className="fa fa-pencil" aria-hidden="true">
              Submit Comment
            </i>
          </Button>{" "}
        </div>

        <Modal isOpen={this.state.isOpen} toggle={this.openModal}>
          <ModalHeader toggle={this.closeModal}>Submit Comment</ModalHeader>

          <ModalBody>
            <LocalForm onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="raiting">Raiting</label>
                <Control.select model=".raiting" id="raiting" name="raiting">
                  <option value=" "></option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Control.select>
              </div>

              <div className="form-group">
                <label htmlFor="author">Your Name</label>
                <Control.text
                  rows="6"
                  model=".author"
                  id="author"
                  name="author"
                  className="form-control"
                  validators={{
                    required,
                    minLength: minLength(2),
                    maxLength: maxLength(15),
                  }}
                  onBlur={this.handleBlur("author")}
                  onChange={this.handleInputChange}
                />

                <Errors
                  className="text-danger"
                  model=".author"
                  show="touched"
                  component="div"
                  messages={{
                    required: "Required",
                    minLength: "Must be at least 2 characters",
                    maxLength: "Must be 15 characters or less",
                  }}
                />
              </div>

              <div className="form-group">
                <Control.textarea
                  model=".text"
                  id="text"
                  name="text"
                  rows="6"
                  onChange={this.handleInputChange}
                />
              </div>

              <div lassName="form-group">
                <Button color="primary">Submit</Button>{" "}
              </div>
            </LocalForm>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

function RenderCampsite({ campsite }) {
  return (
    <div className="col-md-5 m-1">
      <Card>
        <CardImg top src={campsite.image} alt={campsite.name} />
        <CardBody>
          <CardText>{campsite.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

function RenderComments({ comments, addComment, campsiteId }) {
  if (comments) {
    return (
      <div className="col-md-5 m-1">
        <h4>Comments</h4>
        {comments.map((comment) => {
          return (
            <div key={comment.id}>
              <p>
                {comment.text}
                <br />
                -- {comment.author},{" "}
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                }).format(new Date(Date.parse(comment.date)))}
              </p>
            </div>
          );
        })}
        <CommentForm campsiteId={campsiteId} addComment={addComment} />
      </div>
    );
  }
  return <div />;
}

function CampsiteInfo(props) {
  if (props.campsite) {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/directory">Directory</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
            </Breadcrumb>
            <h2>{props.campsite.name}</h2>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderCampsite campsite={props.campsite} />
          <RenderComments 
                        comments={props.comments}
                        addComment={props.addComment}
                        campsiteId={props.campsite.id}
                    />
        </div>
      </div>
    );
  }
  return <div />;
}

export default CampsiteInfo;
