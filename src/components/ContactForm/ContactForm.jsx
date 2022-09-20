import React, { Component } from 'react';
import { nanoid } from "nanoid";
import PropTypes from 'prop-types';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import css from './ContactForm.module.css';

export class ContactForm extends Component {
    state = {
        name: '',
        number: '',
    }

    nameInputId = nanoid();
    numberInputId = nanoid();

    handleSubmit = event => {
        event.preventDefault();
        this.props.onSubmit({
            name: this.state.name,
            number: this.state.number,
        });
        this.setState({
            name: '',
            number: ''
        });
    };

    handleChange = event => {
        const { name, value } = event.currentTarget;
        this.setState({
            [name]: value,
        });
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit} className={css.form}>
                <div className={css.wrapper}>
                    <div className={css.nameBlock}>
                    <input
                        value={this.state.name}
                        onChange={this.handleChange}
                        id={this.nameInputId}
                        type="text"
                        name="name"
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                        required
                        className={css.input}
                    />
                    <label htmlFor="name" className={css.label}>Name</label>
                </div>
                <div className={css.numberBlock}>
                    <input
                        value={this.state.number}
                        onChange={this.handleChange}
                        id={this.numberInputId}
                        type="tel"
                        name="number"
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                        required
                        className={css.input}
                    />
                    <label htmlFor="number" className={css.label}>Number</label>
                </div> 
                </div>

            <button type='submit' className={css.addBtn}> <AiOutlinePlusCircle size={30} /> </button>
            </form>
        )
    }
}

ContactForm.propTypes = {
    onSubmit: PropTypes.func,
};