const FORM_IDS = {
  FORM: "registration-form",
  NAME: "name",
  EMAIL: "email",
  PHONE: "phone",
  NAME_ERROR: "name-error",
  EMAIL_ERROR: "email-error",
  PHONE_ERROR: "phone-error",
  FORM_CONTAINER: "form-container",
  SUCCESS_MESSAGE: "success-message",
  BACK_BUTTON: "back-button"
};

function validateNotEmpty(value) {
  return value.trim() !== "";
}

function validateEmailFormat(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validateField(field, errorElement, validationFn = validateNotEmpty) {
  const value = field.value.trim();
  const isValid = validationFn(value);
  
  errorElement.classList.toggle("hidden", isValid);
  field.classList.toggle("border-red-500", !isValid);
  
  return isValid;
}

function getFormData() {
  return {
    name: document.getElementById(FORM_IDS.NAME).value.trim(),
    email: document.getElementById(FORM_IDS.EMAIL).value.trim(),
    phone: document.getElementById(FORM_IDS.PHONE).value.trim()
  };
}

function resetForm() {
  document.getElementById(FORM_IDS.FORM).reset();
  document.querySelectorAll("[id$='-error']").forEach(p => p.classList.add("hidden"));
  document.querySelectorAll("input").forEach(input => input.classList.remove("border-red-500"));
}

function toggleElements(showId, hideId) {
  document.getElementById(showId).classList.remove("hidden");
  document.getElementById(hideId).classList.add("hidden");
}

document.getElementById(FORM_IDS.FORM).addEventListener("submit", function(e) {
  e.preventDefault();

  const isValidName = validateField(
    document.getElementById(FORM_IDS.NAME),
    document.getElementById(FORM_IDS.NAME_ERROR)
  );

  const isValidEmail = validateField(
    document.getElementById(FORM_IDS.EMAIL),
    document.getElementById(FORM_IDS.EMAIL_ERROR),
    validateEmailFormat
  );

  const isValidPhone = validateField(
    document.getElementById(FORM_IDS.PHONE),
    document.getElementById(FORM_IDS.PHONE_ERROR)
  );

  if (!isValidName || !isValidEmail || !isValidPhone) return;

  console.log("Cadastro Realizado:", getFormData());
  toggleElements(FORM_IDS.SUCCESS_MESSAGE, FORM_IDS.FORM_CONTAINER);
});

document.getElementById(FORM_IDS.BACK_BUTTON).addEventListener("click", () => {
  resetForm();
  toggleElements(FORM_IDS.FORM_CONTAINER, FORM_IDS.SUCCESS_MESSAGE);
});