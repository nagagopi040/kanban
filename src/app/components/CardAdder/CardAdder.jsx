import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import shortid from "shortid";
import "./CardAdder.scss";
import CardModal from "../CardModal/CardModal";

class CardAdder extends Component {
  static propTypes = {
    listTitle: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      card: { _id: ""},
      isOpen: false
    };
  }

  toggleCardEditor = () => {
    const { listTitle, category, dispatch } = this.props;
    const { card } = this.state;
    card._id = shortid.generate();
    this.setState({ isOpen: !this.state.isOpen, card });
    if(!this.state.isOpen){
      dispatch({
        type: "ADD_CARD",
        payload: {
          listTitle,
          category,
          cardId: card._id
        }
      });
    }
  };

  render() {
    const { listTitle, category } = this.props;
    return (
      <>
        <CardModal
          isOpen={this.state.isOpen}
          card={this.state.card}
          listTitle={listTitle}
          category={category}
          toggleCardEditor={this.toggleCardEditor}
        />
        <button onClick={this.toggleCardEditor} className="add-card-button">
          +
        </button>
      </>
    );
  }
}

export default connect()(CardAdder);
