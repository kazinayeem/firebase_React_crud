import React, { Component } from "react";
import { firestore } from "./firebase";
import {
  setDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { Modal, Button } from "react-bootstrap";

export default class Getdata extends Component {
  state = {
    data: [],
    idEdit: false,
    name: "",
    email: "",
    id: "",
    showmodal: false,
  };
  componentDidMount() {
    //  this.getdata();
    const colRef = collection(firestore, "todos");
    //real time update
    onSnapshot(colRef, (snapshot) => {
      const todo = [];
      snapshot.forEach((doc) => {
        todo.push({
          id: doc.id,
          name: doc.data().name,
          email: doc.data().email,
        });
        this.setState({
          data: todo,
        });
      });
    });
  }

  deletetodos = (id) => {
    deleteDoc(doc(firestore, "todos", id))
      .then(() => {
        alert("delete done");
      })
      .catch((error) => console.log(error));
  };
  updatestate = (data) => {
    const { name, email, id } = data;
    this.setState({
      idEdit: true,
      name: name,
      email: email,
      id: id,
      showmodal: true,
    });
  };

  updatedocsubmit = async (e) => {
    e.preventDefault();
    await setDoc(doc(firestore, "todos", this.state.id), {
      name: this.state.name,
      email: this.state.email,
    });

    this.setState({ idEdit: false, showmodal: false });
  };

  changetext = (e) => {
    const { value, name } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleClose = () => {
    this.setState({
      showmodal: false,
    });
  };

  // getdata = async () => {
  //   // const unsub = onSnapshot(doc(firestore, "todos"), (doc) => {
  //   //     console.log("Current data: ", doc.data());
  //   // });

  //   const data = await getDocs(collection(firestore, "todos"));
  //   const todo = [];
  //   data.forEach((doc) => {
  //     todo.push({ id: doc.id, name: doc.data().name, email: doc.data().email });
  //     this.setState({
  //       data: todo,
  //     });
  //   });
  // };

  render() {
    return (
      <div className="container">
        <div>
          {this.state.idEdit ? (
            <Modal show={this.state.showmodal} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Change</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {" "}
                <form
                  onSubmit={this.updatedocsubmit}
                  className="form-group w-50"
                >
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={this.state.name}
                    onChange={this.changetext}
                    placeholder="Enter your Name "
                    className="form-control"
                  />

                  <br />

                  <input
                    value={this.state.email}
                    type="text"
                    name="email"
                    id="name"
                    onChange={this.changetext}
                    placeholder="Enter your Email "
                    className="form-control"
                  />

                  <br />

                  <button type="submit" className="btn btn-info">
                    Update
                  </button>
                </form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                  Close
                </Button>
               
              </Modal.Footer>
            </Modal>
          ) : null}
        </div>
        <table className="table">
          <thead>
            <tr>
              <td>ID</td>
              <td>Name</td>
              <td>Email</td>
              <td>Delete</td>
              <td>Edit</td>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((d) => (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>{d.name}</td>
                <td>{d.email}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => this.deletetodos(d.id)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() => this.updatestate(d)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
