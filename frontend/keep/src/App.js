import Header from "./Header";
import Footer from "./Footer";
import CreateNote from "./CreateNote"
import Note from "./Note";
import { useState } from "react";



function App() {

  let [item, setItem] = useState([])
  let [note, setNote] = useState({
    title: "",
    content: "",
    id: ""
  });

  console.log("note from app.js" , note)

  function addItem(note) {
    setItem((prevItem) => {
      return [...prevItem, note]
    })

  }

  function deleteNote(id) {
    console.log("note from deletNote in APP.JS" , note)
    setItem((prevNote) => {
      return prevNote.filter((val, ind) => {
        return id !== val._id
      })
    })
  }


  return (
    <>
      <Header />
      <CreateNote passNote={addItem} setNote={setNote}
        note={note} />
      {
        item.map((val, ind) => {
          return <Note
            key={ind}
            id={val.id}
            title={val.title}
            content={val.content}
            delete={deleteNote}
            setNote={setNote}
            note={note}

          />
        })
      }
      <Footer />

    </>
  )
}

export default App;
