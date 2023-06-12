import React from "react";
import { useState } from "react";
import "./index.css";
import axios from "axios";

const url = "http://localhost:8000";

export default function CreateNote({ passNote, setNote, note }) {
  let [expand, setExpand] = useState(false);
  // let [note, setNote] = useState({
  //   title: "",
  //   content: "",
  // });

  function inputEvent(eve) {
    let { name, value } = eve.target;
    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  //was using addEvent befor instead of createNote
  // function addEvent(eve) {
  //   eve.preventDefault();
  //   if (!note.title || !note.content) {
  //     return alert("make a note");
  //   } else {
  //     passNote(note);

  //     setNote({
  //       title: "",
  //       content: "",
  //     });
  //     setExpand(false);
  //   }
  // }

  const createNote = async (eve) => {
    eve.preventDefault();
    try {
      const options = {
        method: "POST",
        url: `${url}/api/create`,
        data: {
          title: note.title,
          content: note.content,
        },
      };

      const response = await axios(options);

      if (!response) return alert("error occurred");

      let { data } = response;

      let noteData = data.data;

      let { title, content, _id } = noteData;

      console.log("note Data is here ", _id);

      setNote({
        title: title,
        content: content,
        id: _id,
      });

      console.log("note is here", note);

      passNote(note);

      setNote({
        title: "",
        content: "",
      });

      setExpand(false);
    } catch (error) {
      return alert(error);
    }
  };

  function expandIt() {
    setExpand(true);
  }

  return (
    <>
      <div className="main_note">
        <form>
          {expand ? (
            <input
              type="text"
              value={note.title}
              name="title"
              onChange={inputEvent}
              placeholder="Title"
              autoComplete="off"
            />
          ) : null}
          <textarea
            rows=""
            column=""
            value={note.content}
            name="content"
            onChange={inputEvent}
            placeholder="write a note..."
            onClick={expandIt}
          ></textarea>

          {expand ? (
            <button className="plus_sign" onClick={createNote}>
              ➕
            </button>
          ) : null}
        </form>
      </div>
    </>
  );
}
