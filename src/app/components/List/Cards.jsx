import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Droppable } from "react-beautiful-dnd";
import Card from "../Card/Card";

class Cards extends Component {
  static propTypes = {
    listTitle: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(PropTypes.string).isRequired
  };

  componentDidUpdate = prevProps => {
    // Scroll to bottom of list if a new card has been added
    if (
      this.props.cards[this.props.cards.length - 2] ===
      prevProps.cards[prevProps.cards.length - 1]
    ) {
      this.scrollToBottom();
    }
  };

  scrollToBottom = () => {
    this.listEnd.scrollIntoView();
  };

  render() {
    const { cards, allOptions, selectedOptions, listTitle, category } = this.props;
    return (
      <Droppable droppableId={listTitle}>
        {(provided, { isDraggingOver }) => (
          <>
            <div className="cards" ref={provided.innerRef}>
              {cards.map((cardId, index) => (
                <Card
                  isDraggingOver={isDraggingOver}
                  key={cardId}
                  cardId={cardId}
                  index={index}
                  listTitle={listTitle}
                  category={category}
                  allOptions={allOptions}
                  selectedOptions={selectedOptions}
                />
              ))}
              {provided.placeholder}
              <div
                style={{ float: "left", clear: "both" }}
                ref={el => {
                  this.listEnd = el;
                }}
              />
            </div>
          </>
        )}
      </Droppable>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { boardId } = ownProps;
  const allOptions = state.boardsById[boardId].allOptions;
  const selectedOptions = state.boardsById[boardId].selectedOptions;
  const category = state.boardsById[boardId].category
  return {
    cards: state.listsById[ownProps.listTitle].cards,
    allOptions,
    selectedOptions,
    category
  }
};

export default connect(mapStateToProps)(Cards);
