import React, { useState, useEffect } from "react";
import "./App.css";
import { API } from "aws-amplify";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { listTodos } from "./graphql/queries";
import {
  createTodo as createNoteMutation,
  deleteTodo as deleteNoteMutation,
} from "./graphql/mutations";

const initialFormState = { name: "", description: "" };

function App() {
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    const apiData = await API.graphql({ query: listTodos });
    setNotes(apiData.data.listTodos.items);
  }

  async function createNote() {
    if (!formData.name || !formData.description) return;
    await API.graphql({
      query: createNoteMutation,
      variables: { input: formData },
    });
    setNotes([...notes, formData]);
    setFormData(initialFormState);
  }

  async function deleteNote({ id }) {
    const newNotesArray = notes.filter((note) => note.id !== id);
    setNotes(newNotesArray);
    await API.graphql({
      query: deleteNoteMutation,
      variables: { input: { id } },
    });
  }

  return (
    <div className="App">
      <h1>My Notes App</h1>
      <input
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Note name"
        value={formData.name}
      />
      <input
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        placeholder="Note description"
        value={formData.description}
      />
      <button onClick={createNote}>Create Note</button>
      <div style={{ marginBottom: 30 }}>
        {notes.map((note) => (
          <div key={note.id || note.name}>
            <h2>{note.name}</h2>
            <p>{note.description}</p>
            <button onClick={() => deleteNote(note)}>Delete note</button>
          </div>
        ))}
      </div>
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);

// import React, { Component } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { faTimes } from '@fortawesome/free-solid-svg-icons'

// import Button from "./components/Button";
// import Input from "./components/Input";
// import ItemList from "./components/ItemList";
// import ImageModal from "./components/ImageModal";

// import "./App.css";

// import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'

// library.add(faTimes);
// const API_KEY = '70f61f20135023633c1c4f91912dc99e4cce0d7cf998640d9281ae2c6bfe976b';
// const URL_BASE = 'https://api.unsplash.com/';
// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       value: '',
//       data: null,
//       windowSize: null,
//       resultsName: null,
//       itemToRender: null,
//     }
//   }
//   componentDidMount() {
//     if (!localStorage.getItem('pictures')) {
//       fetch(URL_BASE + 'photos/?client_id=' + API_KEY)
//         .then(response => response.json())
//         .then(data => {
//           localStorage.setItem('pictures', JSON.stringify(data));
//           this.setState({ data })
//         })
//         .catch(error => console.log(error));
//     } else {
//       this.setState({ data: JSON.parse(localStorage.getItem('pictures')) })
//     }
//     this.updateDimensions();
//     window.addEventListener("resize", this.updateDimensions);
//   }

//   updateDimensions = () => {
//     this.setState((prevState) => ({ data: prevState.data, windowSize: window.innerWidth }));
//   }

//   componentWillUnmount() {
//     window.removeEventListener("resize", this.updateDimensions);
//   }

//   searchImages = () => {
//     fetch(URL_BASE + '/search/photos?page=1&query=' + this.state.value + '&client_id=' + API_KEY)
//       .then(response => response.json())
//       .then(data => {
//         this.setState({ data: data.results, value: '' })
//       });
//   }

//   handleChange = (event) => {
//     this.setState({ value: event.target.value || '' });
//   }

//   renderImageModal = (index) => {
//     index !== null ? this.setState({ itemToRender: this.state.data[index] }) : this.setState({ itemToRender: null });
//   }

//   render() {
//     return (
//       <div className="container-fluid"
//       >
//         <section className="jumbotron search-header">
//           <div className="container search-container">
//             <div className="input-group mb-3">
//               <Input type="text" className="form-control" placeholder="Search for Images" value={this.state.value} handleChange={this.handleChange} />
//               <div className="input-group-append">
//                 <Button text="Search" className="btn-success" onClick={this.searchImages}></Button>
//               </div>
//             </div>
//           </div>
//         </section>
//         <section className="container img-container">
//           <div className="row">
//             <ItemList items={this.state.data} renderImageModal={this.renderImageModal} />
//           </div>
//         </section>
//         {this.state.itemToRender &&
//           <ImageModal item={this.state.itemToRender} onClick={() => this.renderImageModal(null)} />
//         }
//         <AmplifySignOut />
//       </div>
//     );
//   }
// }

// export default withAuthenticator(App);
