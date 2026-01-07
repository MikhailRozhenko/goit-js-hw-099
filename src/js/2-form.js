let formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');

form.addEventListener('input', event => {
  const email = event.currentTarget.elements.email.value.trim();
  const message = event.currentTarget.elements.message.value.trim();
  formData.email = email;
  formData.message = message;
  saveToLS('feedback-form-state', formData);
});

document.addEventListener('DOMContentLoaded', () => {
  const lsData = getFromLS('feedback-form-state');
  if (lsData !== null && lsData !== undefined) {
    formData = lsData;
    form.elements.email.value = lsData.email;
    form.elements.message.value = lsData.message;
  }
});

form.addEventListener('submit', event => {
  event.preventDefault();
  if (formData.email === '' || formData.message === '') {
    alert('Fill please all fields');
    return;
  } else {
    console.log(formData);
    formData.email = '';
    formData.message = '';
    localStorage.removeItem('feedback-form-state');
    form.reset();
  }
});

function saveToLS(key, value) {
  const jsonData = JSON.stringify(value);
  localStorage.setItem(key, jsonData);
}

function getFromLS(key, defaultValue) {
  const jsonData = localStorage.getItem(key);

  try {
    const data = JSON.parse(jsonData);
    return data;
  } catch {
    return defaultValue || jsonData;
  }
}
