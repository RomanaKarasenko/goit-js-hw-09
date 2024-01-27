const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageTextarea = form.querySelector('textarea');
const submitButton = form.querySelector('button[type="submit"]');

form.addEventListener('input', onFormInput);
form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  const emailValue = emailInput.value.trim();
  const messageValue = messageTextarea.value.trim();

  // Перевірка, чи заповнені обидва поля форми перед сабмітом
  if (emailValue && messageValue) {
    // Виведення у консоль об'єкта з поточними значеннями
    console.log({
      email: emailValue,
      message: messageValue,
    });

    // Очищення сховища, полів форми і об'єкта для збереження значень
    localStorage.removeItem(STORAGE_KEY);
    form.reset();
    clearFormValues();
  } else if (emailValue || messageValue) {
    // Якщо тільки одне поле заповнене, вивести алерт
    alert('Please fill in both email and message fields before submitting.');
  }
}

function onFormInput() {
  const emailValue = emailInput.value.trim();
  const messageValue = messageTextarea.value.trim();

  // Збереження поточного стану форми у локальне сховище
  saveToLS(STORAGE_KEY, { email: emailValue, message: messageValue });
}

function saveToLS(key, value) {
  const zip = JSON.stringify(value);
  localStorage.setItem(key, zip);
}

function loadFromLS(key) {
  const zip = localStorage.getItem(key);
  try {
    return JSON.parse(zip);
  } catch {
    return null;
  }
}

function clearFormValues() {
  emailInput.value = '';
  messageTextarea.value = '';
}

function init() {
  const data = loadFromLS(STORAGE_KEY) || {};
  emailInput.value = data.email || '';
  messageTextarea.value = data.message || '';
}

init();
