import React, {Component} from 'react';
import Setup from './setup.js';
import Exam from './exam.js';
import GuidedExam from './guided-exam.js';
import scoreSheet from './score-sheet.js';
import {fromJS} from 'immutable';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSetup: true,
      examType: 'manual',
      scoreModalOpen: false,
      selectedId: '',
      scoreSheet: fromJS(scoreSheet).sortBy(s => s.get('position')),
      activeCategory: 'SENSORY',
      activeTest: 'LIGHT_TOUCH',
      hoveringId: ''
    }
  }

  render() {
    const showSetup = this.state.showSetup;

    if (showSetup) {
      return <Setup setExamType={this.setExamType} />;
    }

    const examType = this.state.examType;

    if (examType === 'guided') {
      return (
        <GuidedExam
          {...this.state}
          openScoreModal={this.openScoreModal}
          closeModal={this.closeModal}
          updateScore={this.updateScore}
          openModalFromScoreSheet={this.openModalFromScoreSheet}
          onCategorySelect={this.onCategorySelect}
          onTestSelect={this.onTestSelect} />
      );
    }

    return (
      <Exam
        {...this.state}
        openScoreModal={this.openScoreModal}
        closeModal={this.closeModal}
        updateScore={this.updateScore}
        openModalFromScoreSheet={this.openModalFromScoreSheet}
        onCategorySelect={this.onCategorySelect}
        onTestSelect={this.onTestSelect} />
    );
  }

  setExamType = (type) => {
    let state = {
      examType: type,
      showSetup: false
    }

    if (type === 'guided') {
      state.selectedId = 'C2';
    }

    this.setState(state)
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
