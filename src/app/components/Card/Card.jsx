import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
import classnames from "classnames";
import slugify from "slugify";

import CardModal from "../CardModal/CardModal";
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
    listTitle: PropTypes.string.isRequired,
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

  convertDate = (date) => {
    return new Date(date).toDateString()
  }

  render() {
    const { card, index, listTitle, category, isDraggingOver, allOptions, selectedOptions } = this.props;
    const { isModalOpen } = this.state;
    return (
      <>
        <Draggable draggableId={card._id} index={index}>
          {(provided, snapshot) => (
            <div className="card">
              {/* eslint-disable */}
              <div
                className={classnames("cardbody", {
                  "cardbody--drag": snapshot.isDragging
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
                <div className="card-title">
                  <h4>{card.name ? card.name : "Undefined name"}</h4>
                </div>
                {
                  allOptions.length ? allOptions.map( option => {
                    var key = slugify(option, {replacement: '_', lower: true});
                    if(selectedOptions.includes(option) && card[key]) {
                      return (
                        <div className="card-item" key={key}>
                          <div className="card-item-title">{option}</div>
                          <p className="card-item-value">{ key === "opened_date" ? this.convertDate(card[key]) : card[key]}</p>
                        </div>
                      )
                    } else return null;
                  })
                  :
                  null
                }
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
          listTitle={listTitle}
          category={category}
          toggleCardEditor={this.toggleCardEditor}
        />
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  card: state.cardsById[ownProps.cardId]
})

export default connect(mapStateToProps)(Card);
