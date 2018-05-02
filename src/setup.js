import React, {Component} from 'react';

export default class Setup extends Component {
  render() {
    return (
      <div className="app-container">
        <h1>Setup</h1>

        <fieldset>
          <button onClick={this.onClick.bind(this, 'guided')}>Begin Guided Exam</button>
          <button onClick={this.onClick.bind(this, 'manual')}>Manual Exam</button>
        </fieldset>
      </div>
    );
  }

  onClick = (type, e) => {
    e.preventDefault();
    this.props.setExamType(type);
  }
}
