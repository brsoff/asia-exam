import React, {Component} from 'react';
import Body from './body.js';
import GuidedExamPanel from './guided-exam-panel.js';
import {VALID_MOTOR_IDS} from './constants.js';
import {getPreviousBodyPart, getNextBodyPart} from './helpers.js';
import PropTypes from 'prop-types';

export default class GuidedExam extends Component {
  static propTypes = {
    openScoreModal: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    updateScore: PropTypes.func.isRequired,
    openModalFromScoreSheet: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {height: 'auto'};
  }

  componentDidMount() {
    document.body.addEventListener('resize', this.handleResize, false);
    this.handleResize();
  }

  render() {
    const {
      activeCategory,
      activeTest,
      closeModal,
      openScoreModal,
      scoreSheet,
      selectedId,
      updateScore
    } = this.props;

    let filteredScoreSheet = scoreSheet;

    if (activeCategory === 'MOTOR') {
      filteredScoreSheet = scoreSheet.filter((v, k) => Object.keys(VALID_MOTOR_IDS).indexOf(k) > -1)
    }

    const bodyPartId = selectedId.replace(/-.+$/, '');
    const selectedBodyPart = filteredScoreSheet.get(bodyPartId);
    const bodyPartIndex = filteredScoreSheet.keySeq().findIndex(k => k === bodyPartId);
    const previousBodyPart = getPreviousBodyPart(bodyPartIndex, filteredScoreSheet);
    const nextBodyPart = getNextBodyPart(bodyPartIndex, filteredScoreSheet);

    return (
      <div className="app-container">
        <GuidedExamPanel
          activeCategory={activeCategory}
          activeTest={activeTest}
          bodyPartId={bodyPartId}
          close={closeModal}
          nextBodyPart={nextBodyPart}
          openModal={openScoreModal}
          previousBodyPart={previousBodyPart}
          selectedBodyPart={selectedBodyPart}
          updateScore={updateScore} />

        <section className="exam-body" style={{height: this.state.height}}>
          <Body
            activeCategory={activeCategory}
            activeTest={activeTest}
            openModal={openScoreModal}
            scoreSheet={scoreSheet}
            selectedId={selectedId} />
        </section>
      </div>
    );
  }

  handleResize = () => {
    this.setState({
      height: window.innerHeight
    });
  }
}
