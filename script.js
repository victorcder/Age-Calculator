document.addEventListener("DOMContentLoaded", function () {
  // --- Age Calculator ---
  const ageForm = document.getElementById("age-form");

  ageForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    // Clear previous errors
    clearErrors("age-form");

    const day = parseInt(document.getElementById("day").value);
    const month = parseInt(document.getElementById("month").value);
    const year = parseInt(document.getElementById("year").value);

    if (validateAgeForm(day, month, year)) {
      calculateAge(day, month, year);
    }
  });

  function validateAgeForm(day, month, year) {
    let isValid = true;

    if (isNaN(day) || day < 1 || day > 31) {
      showError("age-form", "day", "Must be a valid day");
      isValid = false;
    }

    if (isNaN(month) || month < 1 || month > 12) {
      showError("age-form", "month", "Must be a valid month");
      isValid = false;
    }

    if (isNaN(year) || year < 1900 || year > new Date().getFullYear()) {
      showError("age-form", "year", "Must be a valid year");
      isValid = false;
    }

    if (!isValidDate(day, month, year)) {
      showError("age-form", "day", "Must be a valid date"); // Generic date error
      showError("age-form", "month", "Must be a valid date");
      showError("age-form", "year", "Must be a valid date");
      isValid = false;
    }

    return isValid;
  }

  function isValidDate(day, month, year) {
    if (month < 1 || month > 12) return false;
    if (day < 1 || day > 31) return false;

    if (month === 2) {
      const isLeapYear =
        (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
      if (isLeapYear && day > 29) return false;
      if (!isLeapYear && day > 28) return false;
    }

    if ((month === 4 || month === 6 || month === 9 || month === 11) && day > 30)
      return false;

    return true;
  }

  function calculateAge(day, month, year) {
    const today = new Date();
    const birthDate = new Date(year, month - 1, day);

    if (birthDate > today) {
      showError("age-form", "year", "Date must be in the past");
      return;
    }

    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    if (ageMonths < 0 || (ageMonths === 0 && ageDays < 0)) {
      ageYears--;
      ageMonths += 12;
    }

    if (ageDays < 0) {
      const prevMonthLastDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        0
      ).getDate();
      ageDays += prevMonthLastDay;
      ageMonths--;

      if (ageMonths < 0) {
        ageMonths = 11;
        ageYears--;
      }
    }

    // Display Results
    document.getElementById("years").textContent = ageYears;
    document.getElementById("months").textContent = ageMonths;
    document.getElementById("days").textContent = ageDays;
  }

  // --- Date Difference Calculator ---
  const dateDifferenceForm = document.getElementById("date-difference-form");

  dateDifferenceForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const startDate = document.getElementById("start-date").value;
    const endDate = document.getElementById("end-date").value;

    if (validateDateDifferenceForm(startDate, endDate)) {
      calculateDateDifference(startDate, endDate);
    }
  });

  function validateDateDifferenceForm(startDate, endDate) {
    clearErrors("date-difference-form");
    let isValid = true;

    if (!startDate) {
      showError("date-difference-form", "start-date", "Start date is required");
      isValid = false;
    }

    if (!endDate) {
      showError("date-difference-form", "end-date", "End date is required");
      isValid = false;
    }

    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      showError(
        "date-difference-form",
        "end-date",
        "End date must be after start date"
      );
      isValid = false;
    }

    return isValid;
  }

  function calculateDateDifference(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const timeDiff = end.getTime() - start.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert milliseconds to days

    document.getElementById("days-between").textContent = daysDiff;
  }

  // --- Countdown Timer ---
  const countdownForm = document.getElementById("countdown-form");
  const countdownDateInput = document.getElementById("countdown-date");
  const countdownDisplay = document.getElementById("countdown");

  countdownForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const targetDate = new Date(countdownDateInput.value);
    startCountdown(targetDate);
  });

  function startCountdown(targetDate) {
    const interval = setInterval(() => {
      const now = new Date();
      const timeDifference = targetDate - now;

      if (timeDifference <= 0) {
        clearInterval(interval);
        countdownDisplay.innerHTML = "<p>Countdown Complete!</p>";
        return;
      }

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      document.getElementById("countdown-days").textContent = days;
      document.getElementById("countdown-hours").textContent = hours;
      document.getElementById("countdown-minutes").textContent = minutes;
      document.getElementById("countdown-seconds").textContent = seconds;
    }, 1000);
  }

  // --- Helper Functions (Shared) ---

  function showError(formId, fieldId, message) {
    const form = document.getElementById(formId);
    const inputGroup = form
      .querySelector(`#${fieldId}`)
      .closest(".input-group");
    inputGroup.classList.add("error");
    inputGroup.querySelector(".error-message").textContent = message;
  }

  function clearErrors(formId) {
    const form = document.getElementById(formId);
    const inputGroups = form.querySelectorAll(".input-group");
    inputGroups.forEach((group) => {
      group.classList.remove("error");
      group.querySelector(".error-message").textContent = "";
    });
  }

  // --- Color Picker ---
  const colorPicker = document.getElementById("color-picker");

  colorPicker.addEventListener("input", (event) => {
    document.body.style.backgroundColor = event.target.value;
  });

  let lastScrollTop = 0;
  const footer = document.querySelector(".footer");

  window.addEventListener("scroll", () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
      // Scroll down
      footer.classList.add("hidden");
    } else {
      // Scroll up
      footer.classList.remove("hidden");
    }

    lastScrollTop = scrollTop;
  });
});

document
  .getElementById("day-of-week-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const dateInput = document.getElementById("dow-date").value;
    const date = new Date(dateInput);
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const dayOfWeek = daysOfWeek[date.getDay()];

    document.getElementById("day-of-week-result").textContent = dayOfWeek;
  });
