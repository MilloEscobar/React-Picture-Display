import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import Button from "./components/Button";
import Input from "./components/Input";
import Item from "./components/Item";
import ImageModal from "./components/ImageModal";

import "./App.css";

library.add(faTimes);
class App extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      data: null,
      windowSize: null,
      resultsName: null,
      itemToRender:null,
    }
  }
  APIKEY = '70f61f20135023633c1c4f91912dc99e4cce0d7cf998640d9281ae2c6bfe976b';
  componentDidMount() {
    if (!localStorage.getItem('pictures')) {
      fetch('https://api.unsplash.com/photos/?client_id=' + this.APIKEY)
        .then(response => response.json())
        .then(data => {
          localStorage.setItem('pictures', JSON.stringify(data));
          this.setState({ data })
        })
        .catch(error => console.log(error));
    } else {
      this.setState({ data: JSON.parse(localStorage.getItem('pictures')) })
    }
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }

  updateDimensions = () => {
    this.setState((prevState) => ({ data: prevState.data, windowSize: window.innerWidth }));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  searchImages = () => {
    fetch('https://api.unsplash.com/search/photos?page=1&query=' + this.state.value + '&client_id=' + this.APIKEY)
      .then(response => response.json())
      .then(data => {
        this.setState({ data: data.results, value: '' })
      });
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value || '' });
  }

  renderImageModal = (index) => {
    index !== null ? this.setState({ itemToRender: this.state.data[index] }) : this.setState({ itemToRender: null });
  }

  renderPictures = () => {
    if (this.state.data) {
      let column1 = [];
      let column2 = [];
      this.state.data.map((item, index, array) => {
        if (index < array.length / 2) {
          column1.push(<Item item={item} key={item.id} onClick={() => this.renderImageModal(index)}/>);
        } else {
          column2.push(<Item item={item} key={item.id} onClick={() => this.renderImageModal(index)}/>);
        }
      })
      return (
        <>
          <div className="col-sm-12 col-md-6 no-padding-sides">
            {column1}
          </div>
          <div className="col-sm-12 col-md-6 no-padding-sides">
            {column2}
          </div>
        </>
      )
    } else {
      return (<h1>Loading...</h1>)
    }
  }

  render() {
    return (
      <div className="container"
      >
        <section className="row search-container">
          <div className="input-group mb-3">
            <Input type="text" className="form-control" placeholder="Search" value={this.state.value} handleChange={this.handleChange} />
            <div className="input-group-append">
              <Button text="Search" className="btn-success" onClick={this.searchImages}></Button>
            </div>
          </div>
        </section>
        <section className="container img-container">
          <div className="row">
            {this.renderPictures()}
          </div>
        </section>
        {this.state.itemToRender &&
          <ImageModal item={this.state.itemToRender} onClick={() => this.renderImageModal(null)}/>
        }
      </div>
    );
  }
}

export default App;
