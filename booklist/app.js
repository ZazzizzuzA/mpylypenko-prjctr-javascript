"use strict";

const form = document.querySelector('.book-form');
const bookList = document.querySelector('.book-list');

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  constructor(form) {
    this.form = form;
    this.tableBody = document.querySelector('.book-list');
  }

  addBook(book) {
    const row = document.createElement('tr');
    console.log(this);
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><button class="delete-book">x</button></td>
    `;

    this.tableBody.appendChild(row);
  }

  removeBook(target) {
    if (target.classList.contains('delete-book')) {
      target.closest('tr').remove();
      this.showAlert('You\'re successful removed a book', 'success')
    }
  }

  showAlert(message, className) {
    const div = document.createElement('div');
    div.classList = className;
    div.innerHTML = message;

    this.form.before(div);

    setTimeout(() => {
      div.remove();
    }, 2000); 
  }

  resetForm() {
    this.form.reset();
  }

}

form.addEventListener('submit', event => {
  event.preventDefault();
  const ui = new UI(event.target);
  const titleValue = event.target.title.value;
  const authorValue = event.target.author.value;
  const isbnValue = event.target.isbn.value;

  if ([titleValue, authorValue, isbnValue].includes("")) {
    ui.showAlert("Need to fill all fields", 'error')
    return;
  }

  const book = new Book(titleValue, authorValue, isbnValue);

  ui.addBook(book);
  ui.resetForm(event.target);
  ui.showAlert('You\'re successful added a book', 'success');
})

bookList.addEventListener('click', (event) => {
  const ui = new UI(form);
  ui.removeBook(event.target);
})