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




