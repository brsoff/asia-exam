import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {OrderedMap} from 'immutable';

export default class ExamDetails extends Component {
  static propTypes = {
    activeCategory: PropTypes.string,
    activeTest: PropTypes.string,
    scoreSheet: PropTypes.instanceOf(OrderedMap),
    openModal: PropTypes.func.isRequired,
    validMotorIds: PropTypes.object
  };

  render() {
    const {scoreSheet, validMotorIds} = this.props;

    return (
      <section className="exam-details">
        <table className="patient-details">
          <tbody>
            <tr>
              <td>Date/Time of Exam:</td>
              <td><input type="text" /></td>
            </tr>

            <tr>
              <td>Patient Name:</td>
              <td><input type="text" /></td>
            </tr>

            <tr>
              <td>Examiner Name:</td>
              <td><input type="text" /></td>
            </tr>
          </tbody>
        </table>

        <div className="scoresheet-tables">
          <table className="scoresheet sensory">
            <thead>
              <tr>
                <th></th>
                <th colSpan="2">LT</th>
                <th colSpan="2">PP</th>
              </tr>

              <tr>
                <th></th>
                <th>R</th>
                <th>L</th>
                <th>R</th>
                <th>L</th>
              </tr>
            </thead>

            <tbody>
              {scoreSheet.keySeq().map(k => {
                const LTR = scoreSheet.getIn([k, 'SENSORY', 'LIGHT_TOUCH', 'R']);
                const LTL = scoreSheet.getIn([k, 'SENSORY', 'LIGHT_TOUCH', 'L']);
                const PPR = scoreSheet.getIn([k, 'SENSORY', 'PIN_PRICK', 'R']);
                const PPL = scoreSheet.getIn([k, 'SENSORY', 'PIN_PRICK', 'L']);

                return (
                  <tr key={k}>
                    <td>{k}</td>

                    <td
                      className={`score value-${LTR}`}
                      onClick={this.openModal.bind(this, k, 'SENSORY', 'LIGHT_TOUCH')}>
                      {LTR}
                    </td>

                    <td
                      className={`score value-${LTL}`}
                      onClick={this.openModal.bind(this, k, 'SENSORY', 'LIGHT_TOUCH')}>
                      {LTL}
                    </td>

                    <td
                      className={`score value-${PPR}`}
                      onClick={this.openModal.bind(this, k, 'SENSORY', 'PIN_PRICK')}>
                      {PPR}
                    </td>

                    <td
                      className={`score value-${PPL}`}
                      onClick={this.openModal.bind(this, k, 'SENSORY', 'PIN_PRICK')}>
                      {PPL}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <table className="scoresheet motor">
            <thead>
              <tr>
                <th></th>
                <th colSpan="2">Motor</th>
              </tr>

              <tr>
                <th></th>
                <th>R</th>
                <th>L</th>
              </tr>
            </thead>

            <tbody>
              {scoreSheet
                  .keySeq()
                  .filter(k => {
                    return Object.keys(validMotorIds).indexOf(k) > -1
                  })
                  .map(k => {
                const hemisphere = validMotorIds[k];
                const VR = scoreSheet.getIn([k, 'MOTOR', hemisphere, 'R']);
                const VL = scoreSheet.getIn([k, 'MOTOR', hemisphere, 'L']);

                return (
                  <tr key={k}>
                    <td>{k}</td>

                    <td
                      className={`score value-${VR}`}
                      onClick={this.openModal.bind(this, k, 'MOTOR', hemisphere)}>
                      {VR}
                    </td>

                    <td
                      className={`score value-${VL}`}
                      onClick={this.openModal.bind(this, k, 'MOTOR', hemisphere)}>
                      {VL}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    );
  }

  openModal = (id, category, test) => {
    this.props.openModal(id, category, test);
  }
}
