import React, {Component} from 'react';
import Body from './body.js';
import ExamCategorySelect from './exam-category-select.js';
import ExamDetails from './exam-details.js';
import ScoreModal from './score-modal.js';
import {VALID_MOTOR_IDS} from './constants.js';
import {getPreviousBodyPart, getNextBodyPart} from './helpers.js';
import PropTypes from 'prop-types';

export default class Exam extends Component {
  static propTypes = {
    openScoreModal: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    updateScore: PropTypes.func.isRequired,
    openModalFromScoreSheet: PropTypes.func.isRequired,
    onCategorySelect: PropTypes.func.isRequired,
    onTestSelect: PropTypes.func.isRequired
  };

  render() {
    const {
      activeCategory,
      activeTest,
      closeModal,
      onCategorySelect,
      onTestSelect,
      openModalFromScoreSheet,
      openScoreModal,
      scoreModalOpen,
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
        <ExamDetails
          activeCategory={activeCategory}
          activeTest={activeTest}
          scoreSheet={scoreSheet}
          openModal={openModalFromScoreSheet}
          validMotorIds={VALID_MOTOR_IDS} />

        <section className="exam-body">
          <ExamCategorySelect
            activeCategory={activeCategory}
            activeTest={activeTest}
            onCategorySelect={onCategorySelect}
            onTestSelect={onTestSelect} />

          <Body
            activeCategory={activeCategory}
            activeTest={activeTest}
            openModal={openScoreModal}
            scoreSheet={scoreSheet} />
        </section>

        {
          scoreModalOpen &&
          <ScoreModal
            activeCategory={activeCategory}
            activeTest={activeTest}
            bodyPartId={bodyPartId}
            close={closeModal}
            nextBodyPart={nextBodyPart}
            openModal={openScoreModal}
            previousBodyPart={previousBodyPart}
            selectedBodyPart={selectedBodyPart}
            updateScore={updateScore} />
        }
      </div>
    );
  }
}
