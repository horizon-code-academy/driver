// assign HTML tags to JS variables.
const form = document.querySelector("#form-driver");
// inputs
const firstnameInput = document.querySelector("#firstname");
const lastnameInput = document.querySelector("#lastname");
const ageInput = document.querySelector("#age");
const licenseInput = document.querySelector("#license");
// outputs
const fullnameDisplay = document.querySelector("#fullname-display");
const ageDisplay = document.querySelector("#age-display");
const licenseDisplay = document.querySelector("#license-display");
const infoDisplay = document.querySelector("#info-display");
// controls
const submit = document.querySelector('button[type="submit"]');

/**
 * @description this function is meant to validate our form.
 * @param {*} e evant dispatched by the form.
 */
function validate(e) {
  if (e) e.preventDefault();

  // set the info from inputs into a JS object.
  const person = {
    firstname: firstnameInput.value,
    lastname: lastnameInput.value,
    age: ageInput.value,
    license: licenseInput.value,
  };
  // destruct object's properties to separate variables.
  const { firstname, lastname, age, license } = person;

  fullnameDisplay.innerHTML = `${firstname} ${lastname}`;
  ageDisplay.innerHTML = `${age} year${parseInt(age) > 1 ? "s" : ""}`;
  licenseDisplay.innerHTML = `${license} year${
    parseInt(license) > 1 ? "s" : ""
  }`;
  infoDisplay.innerHTML =
    parseInt(age) >= 18
      ? `Permitted${parseInt(license) >= 2 ? ", Experienced" : ""}`
      : `Forbidden`;

  parseInt(age) >= 18
    ? parseInt(license) >= 2
      ? (infoDisplay.style.color = "blue")
      : (infoDisplay.style.color = "green")
    : (infoDisplay.style.color = "red");

  if (!license) licenseDisplay.style.display = "none";

  // save person object in localstorage
  localStorage.setItem("person", JSON.stringify(person));
}

/**
 * @description this function disable and enable the submit button depending on the inputs values.
 */
function enableDisableSubmit() {
  if (firstnameInput.value && lastnameInput.value && ageInput.value) {
    if (parseInt(ageInput.value) >= 18) {
      licenseInput.disabled = false;
      if (licenseInput.value) {
        submit.disabled = false;
      } else {
        submit.disabled = true;
      }
    } else if (parseInt(ageInput.value) < 18 && !licenseInput.value) {
      submit.disabled = false;
      licenseInput.disabled = true;
    } else {
      licenseInput.disabled = true;
      submit.disabled = true;
    }
  } else {
    submit.disabled = true;
  }
}

form.addEventListener("submit", validate, true);
firstnameInput.addEventListener("change", enableDisableSubmit);
lastnameInput.addEventListener("change", enableDisableSubmit);
ageInput.addEventListener("change", enableDisableSubmit);
licenseInput.addEventListener("change", enableDisableSubmit);

const localPerson = JSON.parse(localStorage.getItem("person"));

const { firstname, lastname, age, license } = localPerson;

firstnameInput.value = firstname;
lastnameInput.value = lastname;
ageInput.value = age;
licenseInput.value = license;

validate();
