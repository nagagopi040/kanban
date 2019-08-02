import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
import classnames from "classnames";

import CardModal from "../CardModal/CardModal";
import formatMarkdown from "./formatMarkdown";
import "./Card.scss";

class Card extends Component {
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
    isDraggingOver: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      isModalOpen: false
    };
  }

  toggleCardEditor = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  };

  handleClick = event => {
    const { tagName, checked, id } = event.target;
    if (tagName.toLowerCase() === "input") {
      // The id is a string that describes which number in the order of checkboxes this particular checkbox has
      this.toggleCheckbox(checked, parseInt(id, 10));
    } else if (tagName.toLowerCase() !== "a") {
      this.toggleCardEditor(event);
    }
  };

  // identify the clicked checkbox by its index and give it a new checked attribute
  toggleCheckbox = (checked, i) => {
    const { card, dispatch } = this.props;

    let j = 0;
    const newText = card.name.replace(/\[(\s|x)\]/g, match => {
      let newString;
      if (i === j) {
        newString = checked ? "[x]" : "[ ]";
      } else {
        newString = match;
      }
      j += 1;
      return newString;
    });

    dispatch({
      type: "CHANGE_CARD_TEXT",
      payload: { cardId: card._id, cardText: newText }
    });
  };

  render() {
    const { card, index, listId, isDraggingOver } = this.props;
    const { isModalOpen } = this.state;
    return (
      <>
        <Draggable draggableId={card._id} index={index}>
          {(provided, snapshot) => (
            <div className="card">
              {/* eslint-disable */}
              <div
                className={classnames("card-title", {
                  "card-title--drag": snapshot.isDragging
                })}
                ref={ref => {
                  provided.innerRef(ref);
                  this.ref = ref;
                }}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                onClick={event => {
                  provided.dragHandleProps.onClick(event);
                  this.handleClick(event);
                }}
                onKeyDown={event => {
                  provided.dragHandleProps.onKeyDown(event);
                  this.handleKeyDown(event);
                }}
                style={{
                  ...provided.draggableProps.style,
                  background: card.color
                }}
              >
                <div
                  className="card-title-html"
                  dangerouslySetInnerHTML={{
                    __html: formatMarkdown(card.name)
                  }}
                />
              </div>
              {/* Remove placeholder when not dragging over to reduce snapping */}
              {isDraggingOver && provided.placeholder}
            </div>
          )}
        </Draggable>
        <CardModal
          isOpen={isModalOpen}
          cardElement={this.ref}
          card={card}
          listId={listId}
          toggleCardEditor={this.toggleCardEditor}
        />
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  card: state.cardsById[ownProps.cardId]
});

export default connect(mapStateToProps)(Card);
