import React, { Component } from 'react';

class CardProperties extends Component {
    render() {
        return (
            <div> textInComponent </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { board } = ownProps;
    return {
        lists: board.lists.map(listId => state.listsById[listId]),
    };
  };
  
  export default connect(mapStateToProps)(CardProperties);