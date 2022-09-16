export default (email) => {
  const emailInput = document.createElement('input');
  emailInput.type = 'email';
  emailInput.value = email;
  return emailInput.validity.valid;
};
