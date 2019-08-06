const cardsById = (state = {}, action) => {
  switch (action.type) {
    case "ADD_CARD": {
      const { listTitle, category, cardId, opened_date } = action.payload;
      return { ...state, [cardId]: { _id: cardId, [category]:  listTitle, opened_date: new Date(opened_date).toISOString() }};
    }
    case "CHANGE_CARD_CONTENT": {
      const { newContent, cardId } = action.payload;
      return { ...state, [cardId]: { ...state[cardId], ...newContent } };
    }
    case "DELETE_CARD": {
      const { cardId } = action.payload;
      const { [cardId]: deletedCard, ...restOfCards } = state;
      return restOfCards;
    }
    // Find every card from the deleted list and remove it (actually unnecessary since they will be removed from db on next write anyway)
    case "DELETE_LIST": {
      const { cards: cardIds } = action.payload;
      return Object.keys(state)
        .filter(cardId => !cardIds.includes(cardId))
        .reduce(
          (newState, cardId) => ({ ...newState, [cardId]: state[cardId] }),
          {}
        );
    }
    case "CHANGE_LIST_TITLE": {
      var { category, cards, newTitle } = action.payload;
      cards.map( card => {
        state[card][category] = newTitle;
        return {
          ...state
        }
      })
    }
    default:
      return state;
  }
};

export default cardsById;
