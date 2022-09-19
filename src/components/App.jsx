import { nanoid } from "nanoid";
import React, { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { SearchFilter } from "./SearchFilter/SearchFilter";
import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = contact => {
    if (this.isExisting(contact)) {
      Notify.failure('This contact is already existing in the phonebook!', {
        position: 'center-top',
        width: '380px',
      });
      return;
    }
    this.setState(prevState => {
      const newContact = {
        id: nanoid(),
        ...contact,
      }
      return {
        contacts: [...prevState.contacts, newContact],
      };
    });
  }

  deleteContact = id => {
    this.setState(prevState => {
      const newContacts = prevState.contacts.filter(contact => contact.id !== id);
      return {
        contacts: newContacts
      };
    });
  }

  isExisting({ name, number }) {
    const { contacts } = this.state;
    const check = contacts
      .find(contact => contact.name.toLowerCase() === name.toLowerCase() && contact.number === number);
    return check;
  }

  filterContacts() {
    const { contacts, filter } = this.state;
    if (!filter) {
      return contacts;
    }
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
  }

  handleSearchFilter = event => {
    this.setState({
      filter: event.currentTarget.value,
    });
}

  render() {
    return (
      <div className={css.container}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />

        <h2>Contacts</h2>
        <SearchFilter
          filter={this.state.filter}
          handleSearchFilter={this.handleSearchFilter} />
        {this.state.contacts.length > 0 ? (
          <ContactList
          contacts={this.filterContacts()}
          deleteContact={this.deleteContact} />
        ) : <p className={css.emptyList}>Your Contact List is empty.</p>}

      </div>
    );
  }
}