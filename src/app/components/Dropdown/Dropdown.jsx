import React, { Component } from 'react';
import PropTypes from "prop-types";

import "./Dropdown.scss";

export default class Dropdown extends Component {
    static propTypes = {
        options: PropTypes.arrayOf(PropTypes.string).isRequired,
        value: PropTypes.string,
        onChange: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            value: props.value ? props.value : ""
        }
    }

    onChange = (event) => {
        const { value } = event.target;
        this.setState({ value });
        this.props.onChange(value);
    }

    render() {
        const { options } = this.props
        return (
            <div className="single-dropdown">
                <select value={this.state.value} onChange={this.onChange} >
                    <option defaultChecked>Select</option>
                    {
                        options.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))
                    }
                </select>
            </div>
        )
    }
}
