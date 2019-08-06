import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import MultiSelect from "../Dropdown/MultiSelect";

import "./BoardMenu.scss"

class BoardMenu extends Component {
    static propTypes = {
        selectedOptions: PropTypes.arrayOf(
            PropTypes.string
        ),
        boardId: PropTypes.string.isRequired,
        dispatch: PropTypes.func.isRequired
    };    

    onChange = (values) => {
        const { boardId , dispatch } = this.props;
        this.setState({values});
        dispatch({
            type: "PUT_BOARD_OPTIONS",
            payload: { boardId, selectedOptions: values }
        });
    }

    render() {
        return (
            <div className="board-menu">
                <h3>Bug Pipeline(Kanban View)</h3>
                <div>
                    <h4 className="stack">Stacked by Priority</h4>
                </div>
                <div className="custom-menu">
                    <MultiSelect
                        allOptions={this.props.allOptions}
                        selectedOptions={this.props.selectedOptions}
                        onChange={this.onChange}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const { boardId } = ownProps.match.params;
    return {
        boardId,
        allOptions: state.boardsById[boardId].allOptions,
        selectedOptions: state.boardsById[boardId].selectedOptions
    };
};

export default withRouter(connect(mapStateToProps)(BoardMenu));