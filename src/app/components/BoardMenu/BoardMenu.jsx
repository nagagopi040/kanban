import React, { Component } from 'react';
import Select from "react-dropdown-select";

import { CONSTANTS } from "./../utils";
import "./BoardMenu.scss"

export default class BoardMenu extends Component {
    constructor(props){
        super(props);

        this.state = {
            isOpen: false
        }
    }

    onChange = (value) => {

    }

    toggleMenu = () => {
        this.setState((prevState) => ({ isOpen: !prevState.isOpen }))
    }

    render() {
        const { isOpen } = this.state;
        return(
            <div className="board-menu">
                <h3>Bug Pipeline(Kanban View)</h3>
                <div>
                    <h4 className="stack">Stacked by Priority</h4>
                </div>
                <div className="custom-menu">
                    <button className="custom-menu--title" onClick ={this.toggleMenu}>Customize Cards</button>
                    <Select
                        multi
                        keepOpen={isOpen}
                        className="custom-menu--select"
                        options={CONSTANTS.options}
                        onChange={(values) => this.onChange(values)}
                    />
                </div>
            </div>
        )
    }
}
