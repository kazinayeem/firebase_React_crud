import React, { useEffect, useState } from "react";
import shortid from "shortid";
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "./firebase";

export default function Addtodo() {
  useEffect(() => {}, []);

  const [todo, settodo] = useState({
    id: shortid.generate(),
    name: "",
    email: "",
    date: new Date(),
  });

  const handelchange = (e) => {
    settodo({
      ...todo,
      [e.target.name]: e.target.value,
    });
  };

  const submithandelr = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(firestore, "todos"), {
        name: todo.name,
        email: todo.email,
        date: todo.date,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  return (
    <div className="container">
      <hr />
      <form onSubmit={submithandelr} className="form-group w-50 m-auto">
        <input
          type="text"
          name="name"
          className="form-control"
          onChange={handelchange}
          value={todo.name}
        />
        <br />
        <input
          type="text"
          name="email"
          className="form-control"
          onChange={handelchange}
          value={todo.email}
        />
        <br />
        <button className="btn btn-info" type="submit">
          Add todo
        </button>
      </form>
    </div>
  );
}
