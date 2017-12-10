import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Map} from 'immutable';

export default class ScoreModal extends Component {
  static propTypes = {
    activeCategory: PropTypes.string,
    activeTest: PropTypes.string,
    bodyPartId: PropTypes.string,
    close: PropTypes.func.isRequired,
    nextBodyPart: PropTypes.oneOfType([PropTypes.instanceOf(Map), PropTypes.string]),
    openModal: PropTypes.func.isRequired,
    previousBodyPart: PropTypes.oneOfType([PropTypes.instanceOf(Map), PropTypes.string]),
    selectedBodyPart: PropTypes.oneOfType([PropTypes.instanceOf(Map), PropTypes.string]),
    updateScore: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {focusIndex: 1};
  }

  componentDidMount() {
    document.body.classList.add('no-scroll');
    document.body.addEventListener('keydown', this.handleKeyDown, false);
  }

  componentWillUnmount() {
    document.body.classList.remove('no-scroll');
    document.body.removeEventListener('keydown', this.handleKeyDown, false);
  }

  render() {
    const {
      bodyPartId,
      selectedBodyPart,
      previousBodyPart,
      nextBodyPart,
      activeCategory,
      activeTest
    } = this.props;

    const focusIndex = this.state.focusIndex;

    return (
      <div id="modal-overlay" onClick={this.onOverlayClick}>
        <div id="point-modal">
          <button className="close-modal" onClick={this.close}>×</button>

          <h3>{bodyPartId}</h3>

          <h4>{activeTest}</h4>

          <div className="side-panel-wrapper">
            {['R', 'L'].map(side => {
              const selection = selectedBodyPart.getIn([activeCategory, activeTest, side]);
              const index = side === 'R' ? 1 : 2;

              return (
                <div
                  className={`side-panel ${side} ${focusedClass(focusIndex, index)}`}
                  key={side}
                  data-focus-index={index}>
                  <h3>{side}</h3>

                  <div>
                    <h4>Score: {selection}</h4>

                    <div className="scores">
                      <button
                        onClick={this.onClick.bind(this, side, 'NT')}
                        className={`${classFor(selection, 'NT')} value-NT`}>
                        NT
                      </button>

                      <button
                        onClick={this.onClick.bind(this, side, 2)}
                        className={`${classFor(selection, 2)} value-2`}>
                        2
                      </button>

                      <button
                        onClick={this.onClick.bind(this, side, 1)}
                        className={`${classFor(selection, 1)} value-1`}>
                        1
                      </button>

                      <button
                        onClick={this.onClick.bind(this, side, 0)}
                        className={`${classFor(selection, 0)} value-0`}>
                        0
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="score-navigation">
            {
              previousBodyPart &&
              <button
                data-focus-index="3"
                className={focusedClass(focusIndex, 3)}
                onClick={this.onDirectionClick.bind(this, previousBodyPart)}>
                ← {previousBodyPart}
              </button>
            }

            {
              nextBodyPart &&
              <button
                data-focus-index="4"
                className={focusedClass(focusIndex, 4)}
                onClick={this.onDirectionClick.bind(this, nextBodyPart)}>
                {nextBodyPart} →
              </button>
            }
          </div>
        </div>
      </div>
    );
  }

  close = (e) => {
    e.preventDefault();
    this.props.close();
  }

  onOverlayClick = (e) => {
    e.preventDefault();

    if (e.target.id === "modal-overlay") {
      this.props.close();
    }
  }

  onClick = (side, score, e) => {
    e.preventDefault();
    const {updateScore, bodyPartId} = this.props;
    updateScore(bodyPartId, side, score);
  }

  onDirectionClick(bodyPart, e) {
    e.preventDefault();
    this.props.openModal(bodyPart);
  }

  handleKeyDown = (e) => {
    e = e || window.event;

    const focusIndex = this.state.focusIndex;
    const {
      bodyPartId,
      close,
      openModal,
      nextBodyPart,
      previousBodyPart,
      updateScore
    } = this.props;

    switch (e.keyCode) {
      case 65:
        if (focusIndex === 1 || focusIndex === 2) {
          updateScore(bodyPartId, focusIndex === 1 ? 'R' : 'L', 'NT');
        }

        break;

      case 83:
        if (focusIndex === 1 || focusIndex === 2) {
          updateScore(bodyPartId, focusIndex === 1 ? 'R' : 'L', 2);
        }

        break;

      case 68:
        if (focusIndex === 1 || focusIndex === 2) {
          updateScore(bodyPartId, focusIndex === 1 ? 'R' : 'L', 1);
        }

        break;

      case 70:
        if (focusIndex === 1 || focusIndex === 2) {
          updateScore(bodyPartId, focusIndex === 1 ? 'R' : 'L', 0);
        }

        break;

      case 27:
        close();
        break;

      case 13:
        switch (focusIndex) {
          case 3:
            this.setState({
              focusIndex: 1
            }, () => {
              openModal(previousBodyPart);
            })

            break;

          case 4:
            this.setState({
              focusIndex: 1
            }, () => {
              openModal(nextBodyPart);
            })
            break;

          default:
        }

        break;

        case 38:
          if (focusIndex === 3 || focusIndex === 4) {
            this.setState({focusIndex: focusIndex - 2});
          }

          break;

        case 40:
          if (focusIndex === 1 || focusIndex === 2) {
            this.setState({focusIndex: focusIndex + 2});
          }

          break;

        case 37:
          if (focusIndex === 1) {
            this.setState({focusIndex: 4});
          } else {
            this.setState({focusIndex: focusIndex - 1});
          }

          break;

        case 39:
          if (focusIndex === 4) {
            this.setState({focusIndex: 1});
          } else {
            this.setState({focusIndex: focusIndex + 1});
          }

          break;

        default:
          //
    }
  }
}

function classFor(selection, name) {
  if (selection === name) {
    return 'selected';
  }
}

function focusedClass(focusIndex, currentIndex) {
  if (focusIndex === currentIndex) {
    return 'focused';
  }
}
