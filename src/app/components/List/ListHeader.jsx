import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Textarea from "react-textarea-autosize";
import { Button, Wrapper, Menu, MenuItem } from "react-aria-menubutton";
import Trash from "react-icons/lib/fa/trash";
import Edit from "react-icons/lib/fa/edit";
import Caret from "react-icons/lib/fa/caret-down";

import "./ListHeader.scss";

class ListTitle extends Component {
  static propTypes = {
    listTitle: PropTypes.string.isRequired,
    boardId: PropTypes.string.isRequired,
    cards: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isModalOpen: false,
      newTitle: props.listTitle === "Uncategorized" ? "" : props.listTitle
    };
  }

  toggleCardEditor = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  };

  handleChange = event => {
    this.setState({ newTitle: event.target.value });
  };

  handleKeyDown = event => {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.handleSubmit();
    } else if (event.keyCode === 27) {
      this.revertTitle();
    }
  };

  handleSubmit = () => {
    const { newTitle } = this.state;
    const { listTitle, cards, category, boardId, dispatch } = this.props;
    if (newTitle === "") return;
    if (newTitle !== listTitle) {
      dispatch({
        type: "CHANGE_LIST_TITLE",
        payload: {
          listTitle,
          cards,
          category,
          newTitle: newTitle,
          boardId
        }
      });
    }
    this.setState({ isOpen: false });
  };

  revertTitle = () => {
    this.setState({ newTitle: this.props.listTitle, isOpen: false });
  };

  deleteList = () => {
    const { listTitle, cards, boardId, dispatch } = this.props;
    dispatch({
      type: "DELETE_LIST",
      payload: { cards, listTitle, boardId }
    });
  };

  openTitleEditor = () => {
    this.setState({ isOpen: true });
  };

  handleButtonKeyDown = event => {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.openTitleEditor();
    }
  };

  render() {
    const { isOpen, newTitle } = this.state;
    const { listTitle } = this.props;
    return (
      <div className="list-header">
        {isOpen ? (
          <div className="list-title-textarea-wrapper">
            <Textarea
              autoFocus
              useCacheForDOMMeasurements
              value={newTitle}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
              className="list-title-textarea"
              onBlur={this.handleSubmit}
              spellCheck={false}
            />
          </div>
        ) : (
          <div className="list-title-button">
            {listTitle}
          </div>
        )}
        <Wrapper className="toggle-wrapper">
          <Button className="toggle-button">
            <Caret />
          </Button>
          <Menu className="toggle-menu">
            <div className="toggle-body">
              <MenuItem className="toggle-item" onClick={this.openTitleEditor}>
                <Edit /> Rename Stack
              </MenuItem>
              <MenuItem className="toggle-item" onClick={this.deleteList}>
                <Trash /> Delete Stack
              </MenuItem>
            </div>
          </Menu>
        </Wrapper>
      </div>
    );
  }
}

export default connect()(ListTitle);
