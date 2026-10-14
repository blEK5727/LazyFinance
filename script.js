const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

document
  .querySelectorAll(".reveal")
  .forEach((element) => revealObserver.observe(element));


document.querySelectorAll(".waitlist-form").forEach((form) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const input = form.querySelector("input[type='email']");
    const button = form.querySelector("button[type='submit']");

    const note =
      form.querySelector(".form-note") ||
      form.parentElement.querySelector(".form-note");

    if (!input.checkValidity()) {
      input.reportValidity();
      return;
    }

    const originalButtonText = button.textContent;

    button.textContent = "Joining…";
    button.disabled = true;

    if (note) {
      note.textContent = "Adding you to the list…";
      note.classList.remove("error");
    }

    try {
      const formData = new FormData(form);

      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok) {
        const errorMessage =
          result.errors?.map((error) => error.message).join(", ") ||
          "We couldn’t add you. Please try again.";

        throw new Error(errorMessage);
      }

      button.textContent = "You’re on the list ✓";
      input.disabled = true;

      if (note) {
        note.textContent = "Thanks! We’ll keep you posted.";
      }
    } catch (error) {
      button.textContent = originalButtonText;
      button.disabled = false;

      if (note) {
        note.textContent =
          error.message || "Something went wrong. Please try again.";

        note.classList.add("error");
      }
    }
  });
});


const approveButton = document.querySelector(".approve-demo");

approveButton?.addEventListener("click", () => {
  approveButton
    .closest(".approval-card")
    .classList.add("approved");

  approveButton.textContent = "Approved ✓";
});
