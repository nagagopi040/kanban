const listsById = (state = {}, action) => {
  switch (action.type) {
    case "ADD_CARD": {
      const { listTitle, cardId } = action.payload;
      return {
        ...state,
        [listTitle]: { ...state[listTitle], cards: [...state[listTitle].cards, cardId] }
      };
    }
    case "CHANGE_CARD_CONTENT": {
      const { newContent, listTitle, category, cardId } = action.payload;      
      let keys = Object.keys(newContent);
      if(category === keys[0]){
        const destListTitle = newContent[category];
        const sourceIndex = (state[listTitle].cards).indexOf(cardId);
        const sourceCards = Array.from(state[listTitle].cards);
        const [removedCard] = sourceCards.splice(sourceIndex, 1);
        const destinationCards = Array.from(state[destListTitle].cards);
        destinationCards.splice(0, 0, removedCard);
        return {
          ...state,
          [listTitle]: { ...state[listTitle], cards: sourceCards },
          [destListTitle]: { ...state[destListTitle], cards: destinationCards }
        };
      }
      else 
        return {
          ...state
        }
    }
    case "MOVE_CARD": {
      const {
        oldCardIndex,
        newCardIndex,
        sourceListTitle,
        destListTitle
      } = action.payload;
      // Move within the same list
      if (sourceListTitle === destListTitle) {
        const newCards = Array.from(state[sourceListTitle].cards);
        const [removedCard] = newCards.splice(oldCardIndex, 1);
        newCards.splice(newCardIndex, 0, removedCard);
        return {
          ...state,
          [sourceListTitle]: { ...state[sourceListTitle], cards: newCards }
        };
      }
      // Move card from one list to another
      const sourceCards = Array.from(state[sourceListTitle].cards);
      const [removedCard] = sourceCards.splice(oldCardIndex, 1);
      const destinationCards = Array.from(state[destListTitle].cards);
      destinationCards.splice(newCardIndex, 0, removedCard);
      return {
        ...state,
        [sourceListTitle]: { ...state[sourceListTitle], cards: sourceCards },
        [destListTitle]: { ...state[destListTitle], cards: destinationCards }
      };
    }
    case "DELETE_CARD": {
      const { cardId: newCardId, listTitle } = action.payload;
      return {
        ...state,
        [listTitle]: {
          ...state[listTitle],
          cards: state[listTitle].cards.filter(cardId => cardId !== newCardId)
        }
      };
    }
    case "ADD_LIST": {
      const { listId, listTitle } = action.payload;
      return {
        ...state,
        [listTitle]: { _id: listId, title: listTitle, cards: [] }
      };
    }
    case "CHANGE_LIST_TITLE": {
      const { listTitle, newTitle } = action.payload;
      var newListTitle = { ...state[listTitle], title: newTitle };
      state[newTitle] = newListTitle;
      delete state[listTitle];
      return {
        ...state,
        [listTitle]: { ...state[listTitle], title: newTitle }
      };
    }
    case "DELETE_LIST": {
      const { listTitle } = action.payload;
      const { [listTitle]: deletedList, ...restOfLists } = state;
      return restOfLists;
    }
    default:
      return state;
  }
};

export default listsById;
