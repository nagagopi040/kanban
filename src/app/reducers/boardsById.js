const boardsById = (state = {}, action) => {
  switch (action.type) {
    case "ADD_LIST": {
      const { boardId, listId } = action.payload;
      return {
        ...state,
        [boardId]: {
          ...state[boardId],
          lists: [...state[boardId].lists, listId]
        }
      };
    }
    case "MOVE_LIST": {
      const { oldListIndex, newListIndex, boardId } = action.payload;
      const newLists = Array.from(state[boardId].lists);
      const [removedList] = newLists.splice(oldListIndex, 1);
      newLists.splice(newListIndex, 0, removedList);
      return {
        ...state,
        [boardId]: { ...state[boardId], lists: newLists }
      };
    }
    case "DELETE_LIST": {
      const { listId: newListId, boardId } = action.payload;
      return {
        ...state,
        [boardId]: {
          ...state[boardId],
          lists: state[boardId].lists.filter(listId => listId !== newListId)
        }
      };
    }
    case "ADD_BOARD": {
      const { boardTitle, boardId, userId } = action.payload;
      return {
        ...state,
        [boardId]: {
          _id: boardId,
          title: boardTitle,
          lists: [],
          users: [userId],
          color: "blue",
          options: []
        }
      };
    }
    case "CHANGE_BOARD_TITLE": {
      const { boardTitle, boardId } = action.payload;
      return {
        ...state,
        [boardId]: {
          ...state[boardId],
          title: boardTitle
        }
      };
    }
    case "CHANGE_BOARD_COLOR": {
      const { boardId, color } = action.payload;
      return {
        ...state,
        [boardId]: {
          ...state[boardId],
          color
        }
      };
    }
    case "DELETE_BOARD": {
      const { boardId } = action.payload;
      const { [boardId]: deletedBoard, ...restOfBoards } = state;
      return restOfBoards;
    }
    case "PUT_BOARD_OPTIONS": {
      const { boardId, options } = action.payload;
      return {
        ...state,
        [boardId]: {
          ...state[boardId],
          options
        }
      };
    }
    case "CHANGE_LIST_TITLE": {
      const { newTitle, listTitle, boardId } = action.payload;
      let lists = state[boardId].lists;
      let index = lists.indexOf(listTitle);
      lists.splice(index, 1, newTitle)
      return {
        ...state
      };
    }
    default:
      return state;
  }
};

export default boardsById;
