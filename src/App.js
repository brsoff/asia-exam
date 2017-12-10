import React, {Component} from 'react';
import Body from './body.js';
import ScoreModal from './score-modal.js';
import scoreSheet from './score-sheet.js';
import ExamCategorySelect from './exam-category-select.js';
import ExamDetails from './exam-details.js';
import {fromJS} from 'immutable';
import './app.css';

const VALID_MOTOR_IDS = {
  C5: 'UPPER',
  C6: 'UPPER',
  C7: 'UPPER',
  C8: 'UPPER',
  T1: 'UPPER',
  L2: 'LOWER',
  L3: 'LOWER',
  L4: 'LOWER',
  L5: 'LOWER',
  S1: 'LOWER',
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scoreModalOpen: false,
      selectedId: '',
      scoreSheet: fromJS(scoreSheet).toOrderedMap(),
      activeCategory: 'SENSORY',
      activeTest: 'LIGHT_TOUCH',
      hoveringId: ''
    }
  }

  render() {
    const {scoreModalOpen, selectedId, activeCategory, activeTest} = this.state;
    const scoreSheet = this.state.scoreSheet.sortBy(s => s.get('position'));
    let filteredScoreSheet = scoreSheet;

    if (activeCategory === 'MOTOR') {
      filteredScoreSheet = scoreSheet.filter((v, k) => Object.keys(VALID_MOTOR_IDS).indexOf(k) > -1)
    }

    const bodyPartId = selectedId.replace(/-.+$/, '');
    const selectedBodyPart = filteredScoreSheet.get(bodyPartId);
    const bodyPartIndex = filteredScoreSheet.keySeq().findIndex(k => k === bodyPartId);
    let previousBodyPartIndex, nextBodyPartIndex, previousBodyPart, nextBodyPart;

    if (bodyPartIndex === 0) {
      previousBodyPartIndex = filteredScoreSheet.size - 1;
    } else if (bodyPartIndex > 0) {
      previousBodyPartIndex = bodyPartIndex - 1;
    }

    previousBodyPart = filteredScoreSheet.keySeq().get(previousBodyPartIndex);

    if (bodyPartIndex === filteredScoreSheet.size - 1) {
      nextBodyPartIndex = 0;
    } else if (bodyPartIndex < filteredScoreSheet.size - 1) {
      nextBodyPartIndex = bodyPartIndex + 1;
    }

    nextBodyPart = filteredScoreSheet.keySeq().get(nextBodyPartIndex);

    return (
      <div className="app-container">
        <ExamDetails
          activeCategory={activeCategory}
          activeTest={activeTest}
          scoreSheet={scoreSheet}
          openModal={this.openModalFromScoreSheet}
          validMotorIds={VALID_MOTOR_IDS} />

        <section className="exam-body">
          <ExamCategorySelect
            activeCategory={activeCategory}
            activeTest={activeTest}
            onCategorySelect={this.onCategorySelect}
            onTestSelect={this.onTestSelect} />

          <Body
            activeCategory={activeCategory}
            activeTest={activeTest}
            openModal={this.openScoreModal}
            scoreSheet={scoreSheet} />
        </section>

        {
          scoreModalOpen &&
          <ScoreModal
            activeCategory={activeCategory}
            activeTest={activeTest}
            bodyPartId={bodyPartId}
            close={this.closeModal}
            nextBodyPart={nextBodyPart}
            openModal={this.openScoreModal}
            previousBodyPart={previousBodyPart}
            selectedBodyPart={selectedBodyPart}
            updateScore={this.updateScore} />
        }
      </div>
    );
  }

  openScoreModal = (id) => {
    this.setState({
      scoreModalOpen: true,
      selectedId: id
    })
  }

  closeModal = () => {
    this.setState({
      scoreModalOpen: false,
      selectedId: ''
    })
  }

  updateScore = (bodyPartId, side, score) => {
    const {activeCategory, activeTest} = this.state;
    let scoreSheet = this.state.scoreSheet;

    scoreSheet = scoreSheet.setIn([bodyPartId, activeCategory, activeTest, side], score);

    this.setState({scoreSheet: scoreSheet});
  }

  openModalFromScoreSheet = (id, category, test) => {
    this.setState({
      selectedId: id,
      scoreModalOpen: true,
      activeCategory: category,
      activeTest: test
    })
  }

  onCategorySelect = (category, e) => {
    e.preventDefault();

    this.setState({
      activeCategory: category,
      activeTest: category === 'SENSORY' ? 'LIGHT_TOUCH' : 'UPPER'
    })
  }

  onTestSelect = (test, category, e) => {
    e.preventDefault();

    this.setState({
      activeCategory: category,
      activeTest: test
    })
  }
}
