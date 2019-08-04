import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Textarea from "react-textarea-autosize";
import Modal from "react-modal";
import Dropdown from "../Dropdown/Dropdown";

import { CONSTANTS } from "./../utils";
import "./CardModal.scss";

class CardModal extends Component {
  static propTypes = {
    card: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string,
      description: PropTypes.string,
      created_by: PropTypes.string,
      opened_at: PropTypes.string,
      status: PropTypes.string,
      priority: PropTypes.string,
      color: PropTypes.string
    }).isRequired,
    listId: PropTypes.string.isRequired,
    cardElement: PropTypes.shape({
      getBoundingClientRect: PropTypes.func.isRequired
    }),
    isOpen: PropTypes.bool.isRequired,
    toggleCardEditor: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      newCard: props.card
    };
    if (typeof document !== "undefined") {
      Modal.setAppElement("#app");
    }
  }

  componentWillReceiveProps = nextProps => {
    this.setState({ newCard : nextProps.card });
  };

  handleKeyDown = (event, key) => {
    if (event.keyCode === 13 && event.shiftKey === false) {
      event.preventDefault();
      this.submitCard(key);
    }
  };

  submitCard = (key) => {
    const { newCard } = this.state;
    const { card, listId, dispatch } = this.props;
    if (newCard[key] === "") {
      this.deleteCard();
    } else if (newCard[key] !== card[key]) {
      dispatch({
        type: "CHANGE_CARD_CONTENT",
        payload: {
          ...newCard,
          cardId: card._id,
          listId,
          newContent: {[key]: newCard[key]}
        }
      });
    }
  };

  handleChange = (event, key) => {
    const { value } = event.target;
    this.setState((prevState) => ({
      newCard: {
        ...prevState.newCard,
        [key]: value
      }
    }));
  };

  handleRequestClose = () => {
    const { isColorPickerOpen } = this.state;
    const { toggleCardEditor } = this.props;
    if (!isColorPickerOpen) {
      toggleCardEditor();
    }
  };

  onChange = (value, key) => {
    const { newCard } = this.state;
    const { card, listId, dispatch } = this.props;
    if(value !== newCard[key]){
      dispatch({
        type: "CHANGE_CARD_CONTENT",
        payload: {
          ...newCard,
          cardId: card._id,
          listId,
          newContent: {[key]: value}
        }
      });
    }
  }

  render() {
    const { newCard } = this.state;
    const { cardElement, isOpen } = this.props;
    if (!cardElement) {
      return null;
    }

    return (
      <Modal
        closeTimeoutMS={150}
        isOpen={isOpen}
        onRequestClose={this.handleRequestClose}
        contentLabel="Card editor"
        overlayClassName="modal-underlay"
        className="modal"
        includeDefaultStyles={false}
        onClick={this.handleRequestClose}
      >
        <div className="close-button" >
            <button onClick={this.handleRequestClose}>&times;</button>
        </div>
        <div className="modal-box">
          <form className="modal-from" >
            <div>
              <label className="form-label">Name</label>
              <input
                autoFocus
                value={newCard.name}
                onChange={(event) => this.handleChange(event, "name")}
                onKeyDown={(event) => this.handleKeyDown(event, "name")}
                className="modal-input"
                spellCheck={false}
              />
            </div>

            <div>
              <label className="form-label">Description</label>
              <Textarea
                autoFocus
                value={newCard.description}
                onChange={(event) => this.handleChange(event, "description")}
                onKeyDown={(event) => this.handleKeyDown(event, "description")}
                className="modal-textarea"
                spellCheck={false}
              />
            </div>

            <div>
              <label className="form-label">Priority</label>
              <Dropdown
                value={newCard.priority}
                options={CONSTANTS.priority}
                onChange={(value) => this.onChange(value, "priority")}
              />
            </div>

            <div>
              <label className="form-label">Status</label>
              <Dropdown
                style={{ width: "50%"}}
                value={newCard.status}
                options={CONSTANTS.status}
                onChange={(values) => this.onChange(values, "status")}
              />
            </div>

            <div>
              <label className="form-label">Assigned To</label>
              <Dropdown
                style={{ width: "50%"}}
                value={newCard.assigned_to}
                options={CONSTANTS.users}
                onChange={(value) => this.onChange(value, "assigned_to")}
              />
            </div>

            <div>
              <label className="form-label">Created By</label>
              <Dropdown
                style={{ width: "50%"}}
                value={newCard.created_by}
                options={CONSTANTS.users}
                onChange={(value) => this.onChange(value, "created_by")}
              />
            </div>

            <div>
              <label className="form-label">Created Date</label>
              <p>{new Date(newCard.opened_at).toDateString()}</p>
            </div>
          </form>
        </div>
      </Modal>
    );
  }
}

export default connect()(CardModal);
