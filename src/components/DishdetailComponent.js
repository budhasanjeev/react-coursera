import React, { Component } from "react";
import { Card, CardImg, CardBody, CardTitle, CardText, Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody, Label, Button, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LocalForm, Control, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {

  constructor(props){
    super(props);

    this.state = {
      isModalOpen: false
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  render(){
    return(
      <React.Fragment>
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-pencil"> Submit Comment</span>
        </Button>

        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}> Submit Comment </ModalHeader>
          <ModalBody>
            <div className="container">
              <LocalForm>
                <Row className="form-group">
                  <Label htmlFor="rating">Rating</Label>
                  <Control.select model=".rating" id="rating" name="rating" className="form-control">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Control.select>
                </Row>

                <Row className="form-group">
                  <Label htmlFor="author">Your Name</Label>
                  <Control.text model=".author" id="author" name="author" 
                    placeholder="Your Name" 
                    className="form-control" 
                    validators={{
                      required, minLength: minLength(3), maxLength: maxLength(15)
                    }}
                  />
                  <Errors
                      className="text-danger"
                      model=".author"
                      show="touched"
                      messages={{
                          required: 'Required',
                          minLength: 'Must be greater than 2 characters',
                          maxLength: 'Must be 15 characters or less'
                      }}
                  />
                </Row>

                <Row className="form-group">
                  <Label htmlFor="comment">Comment</Label>
                  <Control.textarea model=".comment" id="comment" name="comment" className="form-control" rows={6}/>
                </Row>
                
                <Row className="form-group">
                  <Button type="submit" value="submit" color="primary">Submit</Button>
                </Row>
              </LocalForm>
            </div>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }

}

function RenderDish({dish}) 
{
  return(
    <div className="col-12 col-md-5 m-1">
      <Card>
        <CardImg width="100%" src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

function RenderComments({comments}) 
{
  return(
    <div className="col-12 col-md-5 m-1">
      <h4>Comments</h4>
      <ul className="list-unstyled">

      {comments.map((comment) => {
        return (
          <li key={comment.id}>
            <p> {comment.comment }</p>
            <p> --{comment.author}, {new Intl.DateTimeFormat('en-US', { year:'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))} </p>
          </li>
        )
      })
      }
      </ul>
      <CommentForm />
    </div>
  );
}

const DishDetail = (props) => {

  if (props.dish != null) {
    return(
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderDish dish={props.dish} />
          <RenderComments comments={props.comments} />
        </div>
      </div>
    );
  }else {
    return(
      <div></div>
    )
  }
  
}

export default DishDetail;