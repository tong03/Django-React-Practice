import React, { useState, useEffect } from "react";
import api from "../api";
import "../styles/Home.css";
import Note from "../components/Note";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    getNotes();
  }, []);

  // getNotes
  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  // deleteNote
  const deleteNote = (id) => {
    // TODO: do you need the last / next to id?
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          console.log("Note deleted!");
        } else {
          console.log("Failed to delete note.");
        }
        getNotes();
      })
      .catch((err) => {
        alert(err);
      });
  };

  // createNote
  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) {
          console.log("Note created!");
          setTitle("");
          setContent("");
        } else {
          console.log("Failed to create note.");
        }
        getNotes();
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div>
      <div>
        <h2>Notes:</h2>
        {notes.map((note) => (
          <Note note={note} onDelete={deleteNote} key={note.id} />
        ))}
      </div>
      <h2>Create a Note</h2>
      <form onSubmit={createNote}>
        <label htmlFor="title">Title:</label>
        <br />
        <input
          name="title"
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label htmlFor="content">Content:</label>
        <br />
        <textarea
          name="content"
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        <br />
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
};

export default Home;
