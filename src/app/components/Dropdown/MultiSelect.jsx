import React, { Component } from 'react';
import PropTypes from "prop-types";

import ClickOutside from "../ClickOutside/ClickOutside";
import { CONSTANTS } from "../utils";
import "./MultiSelect.scss";

export default class MultiSelect extends Component {
    static propTypes = {
        values: PropTypes.arrayOf(PropTypes.string),
        onChange: PropTypes.func.isRequired
    };

    constructor(props){
        super(props);

        this.state = {
            dropdownOpen: false,
            values: props.values ? props.values : []
        }
    }

    toggle = () => {
        this.setState( prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }))
    }

    closeDropdown = () => {
        this.setState({
            dropdownOpen: false
        })
    }

    onChange = (event, newValue, index) => {
        const { checked } = event.target;
        var { values } = this.state;
        if(checked && !values.includes(newValue)){
            values[index] = newValue;
            this.setState({values});
            this.props.onChange(values);
        } else {
            if (values.includes(newValue)) {
                values[index] = null;
                this.setState({values});
                this.props.onChange(values);
            }
        }
    }

    renderDefaultChecked = (option) => {
        const { values } = this.props;
        if(values && values.length && values.includes(option)) {
            return true
        }
        return false;
    }

    render() {
        const { dropdownOpen } = this.state;
        return (
            <ClickOutside handleClickOutside={this.closeDropdown}>
                <div className="dropdown show">
                    <button className="dropdown-button" onClick={this.toggle}><h4>Customize Cards</h4></button>
                    <div className={`dropdown-menu${dropdownOpen ? "-toggle": ""}`} aria-labelledby="dropdown-menu" >
                        {
                            CONSTANTS.options.map( (option, index) => (
                                <div className="dropdown-item" key={option}>
                                    <input
                                        type="checkbox" 
                                        defaultChecked={this.renderDefaultChecked(option)}
                                        name={option}
                                        id={option}
                                        onChange={(event) => this.onChange(event, option, index)}
                                    />
                                    <label htmlFor={option}>{option}</label>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </ClickOutside>
        )
    }
}
