import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import FaCheck from "react-icons/lib/fa/check";
import "./BoardTitleModifier.scss";

class BoardTitleModifier extends Component {
  static propTypes = {
    boardTitle: PropTypes.string.isRequired,
    boardId: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      newTitle: props.boardTitle
    };

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  /**
   * Set the wrapper ref
   */
  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.submitTitle();
      this.props.onOutsideClick();
    }
  }

  handleClick = () => {
    this.setState({ isOpen: true });
  };

  handleChange = event => {
    this.setState({ newTitle: event.target.value });
  };

  submitTitle = () => {
    const { dispatch, boardId, boardTitle } = this.props;
    const { newTitle } = this.state;
    if (newTitle === "") return;
    if (boardTitle !== newTitle) {
      dispatch({
        type: "CHANGE_BOARD_TITLE",
        payload: {
          boardTitle: newTitle,
          boardId
        }
      });
    }
    this.setState({ isOpen: false });
  };

  revertTitle = () => {
    const { boardTitle } = this.props;
    this.setState({ newTitle: boardTitle, isOpen: false });
  };

  handleFocus = event => {
    event.target.select();
  };

  handleSelection = color => {
    const { dispatch, boardId, boardColor } = this.props;
    // Dispatch update only if selected color is not the same as current board color.
    if (color !== boardColor) {
      dispatch({ type: "CHANGE_BOARD_COLOR", payload: { boardId, color } });
    }
  };

  render() {
    const { boardColor } = this.props;
    const { newTitle } = this.state;
    const colors = ["blue", "green", "red", "pink", "yellow"];
    return (
      <div className="board-title-editor" ref={this.setWrapperRef}>
        <input
          autoFocus
          value={newTitle}
          type="text"
          onKeyDown={this.handleKeyDown}
          onChange={this.handleChange}
          onBlur={this.revertTitle}
          onFocus={this.handleFocus}
          className="board-title-input"
          spellCheck={false}
        />
        <div className="color-picker-menu">
          {colors.map(color => (
            <div
              value={color}
              className={classnames("color-picker-item", color)}
              key={color}
              onClick={() =>this.handleSelection(color)}
            >
              {color === boardColor && <FaCheck />}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { boardId } = ownProps.match.params;
  return {
    boardTitle: state.boardsById[boardId].title,
    boardColor: state.boardsById[boardId].color,
    boardId
  };
};

export default withRouter(connect(mapStateToProps)(BoardTitleModifier));
