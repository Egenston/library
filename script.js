let myLibrary = [];
function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}
const books = document.getElementById('books');
function addBookToLibrary(book) {
    myLibrary.push(book);
    //creating book card
    let bookCard = document.createElement('div');
    bookCard.className = "book-card";
    bookCard.setAttribute("data-card-index", myLibrary.length-1);
    bookCard.setAttribute("onclick", "");
    //creating book title
    let bookTitle = document.createElement('p');
    bookTitle.className = "book-caption";
    bookTitle.innerText = book.title;
    bookCard.appendChild(bookTitle);
    //by word
    let byWord = document.createElement('p');
    byWord.setAttribute("id", "by-word");
    byWord.innerText = "by";
    bookCard.appendChild(byWord);
    //creating book author
    let bookAuthor = document.createElement('p');
    bookAuthor.className = "book-author"
    bookAuthor.innerText = book.author;
    bookCard.appendChild(bookAuthor);
    //creating page amount
    let pageAmount = document.createElement('p');
    pageAmount.className = "page-amount";
    pageAmount.innerText = book.pages;
    bookCard.appendChild(pageAmount);
    //creating delete button
    let deleteButton = document.createElement('i');
    deleteButton.className = "fas fa-trash-alt";
    bookCard.appendChild(deleteButton);
    //creating "unread" circle
    let unread = document.createElement('i');
    unread.className = "fas fa-circle";
    if(book.status) unread.style.visibility = "hidden";
    bookCard.appendChild(unread);
    //creating read status buttons
    let unreadButton = document.createElement('i');
    unreadButton.className = "far fa-circle";
    if(book.status) unreadButton.style.visibility = "hidden"
    bookCard.appendChild(unreadButton);
    let readButton = document.createElement('i');
    readButton.className = "fas fa-check-circle";
    if(!book.status) readButton.style.visibility = "hidden";
    bookCard.appendChild(readButton);
    //adding book card to the page
    const children = bookCard.children;
    for (let i = 0; i < children.length; i++) {
        children[i].setAttribute("data-index", myLibrary.length-1);
    }
    books.appendChild(bookCard);
    console.log("amount:" + books.children.length);
    refreshDeleteButtons();
    refreshReadButtons();
    refreshUnreadButtons();
}
const addButton = document.getElementById('add-book-button');
const addForm = document.querySelector('.add-form');
const form = document.getElementById('form');

//form won't refresh the page after being submitted 
function handleForm(event) { event.preventDefault(); }
form.addEventListener('submit', handleForm);

//Add book form popup window
addButton.addEventListener("click", () => {
    addForm.classList.toggle('active');
    form.style.cssText = "transform: translateY(0px);"
});
//form elements
const titleInput = document.getElementById('title-input');
const authorInput = document.getElementById('author-input');
const pagesInput = document.getElementById('pages-input');
const statusInput = document.getElementById('read-status-input');

//close book form button
const closeFormButton = document.querySelector('.fas.fa-times');
function resetForm() {
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    statusInput.checked = false;
}
function closeForm() {
    addForm.classList.toggle('active');
    form.style.cssText = "transform: translateY(-50px);"
}
closeFormButton.addEventListener("click", () => {
    closeForm();
    setTimeout(resetForm, 300); 
})

//Add book form button
const addBookButton = document.getElementById('form-add-book-button');
addBookButton.addEventListener("click", () => {
    if(titleInput.value.length > 0 && authorInput.value.length > 0 && pagesInput.value > 0){
        let newBook = new Book(titleInput.value, authorInput.value, pagesInput.value, statusInput.checked);
        addBookToLibrary(newBook);
        closeForm();
        setTimeout(resetForm, 300);
    }
});

//deleting books
function refreshDeleteButtons() {
    let deleteButtons = document.querySelectorAll('.fas.fa-trash-alt');
    deleteButtons.forEach(button => {
        let clone = button.cloneNode(true);
        button.parentNode.replaceChild(clone, button);
    })
    deleteButtons = document.querySelectorAll('.fas.fa-trash-alt');
    deleteButtons.forEach(button => {
        button.addEventListener("click", () => {
            let currentIndex = button.dataset.index;
            const bookToRemove = document.querySelector(`[data-card-index="${+currentIndex}"]`);
            myLibrary.splice(+currentIndex, 1);
            books.removeChild(bookToRemove);
            refreshIndexes();
        });
    })
}
function refreshIndexes() {
    for (let i = 0; i < books.children.length; i++) {
        books.children[i].dataset.cardIndex = i;
        for (let j = 0; j < books.children[i].children.length; j++) {
            books.children[i].children[j].setAttribute("data-index", i);
        }
    }
}

//mark as read
function refreshReadButtons() {
    let readButtons = document.querySelectorAll('.far.fa-circle');
    readButtons.forEach(button => {
        let clone = button.cloneNode(true);
        button.parentNode.replaceChild(clone, button);
    })
    readButtons = document.querySelectorAll('.far.fa-circle');
    readButtons.forEach(button => {
        button.addEventListener("click", () => {
            let currentIndex = button.dataset.index;
            const currentBook = document.querySelector(`[data-card-index="${+currentIndex}"]`);
            myLibrary[currentIndex].status = true;
            currentBook.children[5].style.visibility = "hidden";
            currentBook.children[6].style.visibility = "hidden";
            currentBook.children[7].style.visibility = "visible";
        })
    })
}

//mark as unread
function refreshUnreadButtons() {
    let unreadButtons = document.querySelectorAll('.fas.fa-check-circle');
    unreadButtons.forEach(button => {
        let clone = button.cloneNode(true);
        button.parentNode.replaceChild(clone, button);
    })
    unreadButtons = document.querySelectorAll('.fas.fa-check-circle');
    unreadButtons.forEach(button => {
        button.addEventListener("click", () => {
            let currentIndex = button.dataset.index;
            const currentBook = document.querySelector(`[data-card-index="${+currentIndex}"]`);
            myLibrary[currentIndex].status = false;
            currentBook.children[5].style.visibility = "visible";
            currentBook.children[6].style.visibility = "visible";
            currentBook.children[7].style.visibility = "hidden";
        })
    })
}