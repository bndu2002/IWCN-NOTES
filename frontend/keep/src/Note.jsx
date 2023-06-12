import React from "react";
import "./index.css";
import { useState } from "react";
import axios from "axios";

const url = "http://localhost:8000";

export default function Note(props) {
  console.log("props from note ==>", props);

  let [isClicked, setToClick] = useState(false);

  let [newTC, setNewTC] = useState({
    newTitle: props.title,
    newContent: props.content,
  });

  //was using this before delteNote
  // function deleteItem() {
  //   props.delete(props.id);
  //   setToClick(false);
  // }

  const deleteNote = async () => {
    console.log("delete note id" , props.id)

    try {
      let options = {
        method: "DELETE",
        url: `${url}/api/delete/${props.id}`,
      };

      const response = await axios(options);

      if (!response) return alert("an error occured");

      props.delete(props.id);
      setToClick(false);
    } catch (error) {
      return alert(error);
    }
  };

  function inEve(event) {
    let { name, value } = event.target;
    console.log("heloo");
    setNewTC((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function saveUpdate() {
    setToClick(false);
  }

  return (
    <>
      <div className="note">
        {isClicked ? (
          <>
            <input
              type="text"
              value={newTC.newTitle}
              name="newTitle"
              onChange={inEve}
            />
            <input
              type="text"
              value={newTC.newContent}
              name="newContent"
              onChange={inEve}
            />
          </>
        ) : (
          <>
            <h1>{props.title}</h1>
            <br />
            <p>{props.content}</p>
          </>
        )}

        <button className="btn" onClick={deleteNote}>
          ✖
        </button>

        <button
          className="btn"
          style={{ fontWeight: "bold" }}
          onClick={() => {
            setToClick(!isClicked);
          }}
        >
          🖊
        </button>

        {isClicked ? (
          <button className="btn" onClick={saveUpdate}>
            📩
          </button>
        ) : null}
      </div>
    </>
  );
}
