import React, {Component} from 'react';

export default class ScoreModal extends Component {
  render() {
    const {id, close} = this.props;

    return (
      <div id="modal-overlay">
        <div id="point-modal">
          <button className="close-modal" onClick={close}>Close</button>

          <h3>Score for {id}</h3>

          <div className="scores">
            <button>1</button>
            <button>2</button>
            <button>3</button>
            <button>4</button>
            <button>5</button>
          </div>
        </div>
      </div>
    );
  }
}
