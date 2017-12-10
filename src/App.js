import React, { Component } from 'react';
import Body from './body.js';
import ScoreModal from './score-modal.js';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scoreModalOpen: false,
      selectedBodyPart: ''
    }
  }

  render() {
    const {
      scoreModalOpen,
      selectedBodyPart
    } = this.state;

    return (
      <div className="app-container">
        <header>
          <h1>asia exam</h1>
        </header>

        <Body openModal={this.openModal} />

        {
          scoreModalOpen &&
          <ScoreModal
            close={this.closeModal}
            id={selectedBodyPart} />
        }
      </div>
    );
  }

  openModal = (id) => {
    this.setState({
      scoreModalOpen: true,
      selectedBodyPart: id
    })
  }

  closeModal = (e) => {
    e.preventDefault();

    this.setState({
      scoreModalOpen: false,
      selectedBodyPart: ''
    })
  }
}
