import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./BoardTitle.scss";
import BoardTitleModifier from "./BoardTitleModifier";

class BoardTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      newTitle: props.boardTitle
    };
  }

  handleClick = () => {
    this.setState({ isOpen: true });
  };

  onOutsideClick = () => {
    this.setState({ isOpen: false });
  }
  
  render() {
    const { isOpen } = this.state;
    const { boardTitle } = this.props;
    return (
      <div className="board-title">
        {
          isOpen ?
          <BoardTitleModifier onOutsideClick={this.onOutsideClick} />
        :
          <button className="board-title-button" onClick={this.handleClick}>
            <h1 className="board-title-text">{boardTitle}</h1>
          </button>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { boardId } = ownProps.match.params;
  return {
    boardTitle: state.boardsById[boardId].title,
    boardId
  };
};

export default withRouter(connect(mapStateToProps)(BoardTitle));
