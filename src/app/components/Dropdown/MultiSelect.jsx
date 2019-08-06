import React, { Component } from 'react';
import PropTypes from "prop-types";
import Caret from "react-icons/lib/fa/caret-down";

import ClickOutside from "../ClickOutside/ClickOutside";
import "./MultiSelect.scss";

export default class MultiSelect extends Component {
    static propTypes = {
        allOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
        selectedOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
        onChange: PropTypes.func.isRequired
    };

    constructor(props){
        super(props);

        this.state = {
            dropdownOpen: false,
            selectedOptions: props.selectedOptions ? props.selectedOptions : []
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

    onChange = (event, newValue) => {
        const { checked } = event.target;
        var { selectedOptions } = this.state;
        if(checked && !selectedOptions.includes(newValue)){
            selectedOptions.push(newValue);
            this.setState({selectedOptions});
            this.props.onChange(selectedOptions);
        } else {
            let index = selectedOptions.indexOf(newValue);
            if (index > -1) {
                selectedOptions.splice(index, 1);
                this.setState({selectedOptions});
                this.props.onChange(selectedOptions);
            }
        }
    }

    renderDefaultChecked = (option) => {
        const { selectedOptions } = this.props;
        if(selectedOptions.length && selectedOptions.includes(option)) {
            return true
        }
        return false;
    }

    render() {
        const { dropdownOpen } = this.state;
        const { allOptions } = this.props;
        return (
            <ClickOutside handleClickOutside={this.closeDropdown}>
                <div className="dropdown show">
                    <button className="dropdown-button" onClick={this.toggle}><h4>Customize Cards <Caret /></h4></button>
                    <div className={`dropdown-menu${dropdownOpen ? "-toggle": ""}`} aria-labelledby="dropdown-menu" >
                        {
                            allOptions.map( (option, index) => (
                                <div className="dropdown-item" key={option}>
                                    <input
                                        type="checkbox" 
                                        defaultChecked={this.renderDefaultChecked(option)}
                                        name={option}
                                        id={option}
                                        onChange={(event) => this.onChange(event, option)}
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
