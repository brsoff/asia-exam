import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class ExamCategorySelect extends Component {
  static propTypes = {
    activeCategory: PropTypes.string,
    activeTest: PropTypes.string,
    onCategorySelect: PropTypes.func.isRequired,
    onTestSelect: PropTypes.func.isRequired
  };

  render() {
    const {
      activeCategory,
      activeTest,
      onCategorySelect,
      onTestSelect
    } = this.props;

    return (
      <div className="exam-category-select-wrapper">
        <div className="exam-category-select">
          <button
            className={`category ${activeClass(activeCategory, 'SENSORY')}`}
            onClick={onCategorySelect.bind(this, 'SENSORY')}>
            Sensory
          </button>

          <div className="test-types">
            <button
              className={activeClass(activeTest, 'LIGHT_TOUCH')}
              onClick={onTestSelect.bind(this, 'LIGHT_TOUCH', 'SENSORY')}>
              Light Touch
            </button>

            <button
              className={activeClass(activeTest, 'PIN_PRICK')}
              onClick={onTestSelect.bind(this, 'PIN_PRICK', 'SENSORY')}>
              Pin Prick
            </button>
          </div>
        </div>

        <div className="exam-category-select">
          <button
            className={`category ${activeClass(activeCategory, 'MOTOR')}`}
            onClick={onCategorySelect.bind(this, 'MOTOR')}>
            Motor
          </button>

          <div className="test-types">
            <button
              className={activeClass(activeTest, 'UPPER')}
              onClick={onTestSelect.bind(this, 'UPPER', 'MOTOR')}>
              Upper
            </button>

            <button
              className={activeClass(activeTest, 'LOWER')}
              onClick={onTestSelect.bind(this, 'LOWER', 'MOTOR')}>
              Lower
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function activeClass(selection, name) {
  if (selection === name) {
    return 'active';
  }
}
