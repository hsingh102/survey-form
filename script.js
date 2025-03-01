document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", function (event) {
        clearErrors(); // Clear previous errors
        let isValid = true;

        // Validate Name
        if (!isNotEmpty("name")) isValid = false;

        // Validate Email
        if (!isValidEmail("email")) isValid = false;

        // Validate Gender (Radio Buttons)
        if (!isChecked("gender")) isValid = false;

        // Validate Interests (Checkbox)
        if (!isChecked("interests")) isValid = false;

        // Validate Country Selection (Dropdown)
        if (!isSelected("country")) isValid = false;

        // Validate Username (Alphanumeric only)
        if (!isValidPattern("username", /^[a-zA-Z0-9]+$/, "Only alphanumeric characters allowed.")) isValid = false;

        // Validate Date of Birth (DD-MM-YYYY)
        if (!isValidPattern("dob", /^\d{2}-\d{2}-\d{4}$/, "Format: DD-MM-YYYY")) isValid = false;

        // Validate Custom ID (ABC-1234 format)
        if (!isValidPattern("custom-id", /^[A-Z]{3}-\d{4}$/, "Format: ABC-1234")) isValid = false;

        // Validate Age (18-99)
        if (!isValidAge("age", 18, 99)) isValid = false;

        if (!isValid) {
            event.preventDefault(); // Stop form submission if validation fails
        }
    });

    // Helper Functions
    function isNotEmpty(id) {
        const input = document.getElementById(id);
        if (input.value.trim() === "") {
            showError(id, "This field is required.");
            return false;
        }
        return true;
    }

    function isValidEmail(id) {
        const input = document.getElementById(id);
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!pattern.test(input.value)) {
            showError(id, "Enter a valid email address.");
            return false;
        }
        return true;
    }

    function isChecked(name) {
        const options = document.getElementsByName(name);
        for (let option of options) {
            if (option.checked) return true;
        }
        showError(name + "Error", "Please select an option.");
        return false;
    }

    function isSelected(id) {
        const select = document.getElementById(id);
        if (select.value === "") {
            showError(id, "Please make a selection.");
            return false;
        }
        return true;
    }

    function isValidPattern(id, pattern, message) {
        const input = document.getElementById(id);
        if (!pattern.test(input.value)) {
            showError(id, message);
            return false;
        }
        return true;
    }

    function isValidAge(id, min, max) {
        const input = document.getElementById(id);
        const age = parseInt(input.value);
        if (isNaN(age) || age < min || age > max) {
            showError(id, `Age must be between ${min} and ${max}.`);
            return false;
        }
        return true;
    }

    function showError(id, message) {
        const errorSpan = document.getElementById(id + "Error");
        if (errorSpan) {
            errorSpan.textContent = message;
            errorSpan.style.color = "red";
        }
    }

    function clearErrors() {
        const errorSpans = document.querySelectorAll(".error");
        errorSpans.forEach(span => (span.textContent = ""));
    }
});
