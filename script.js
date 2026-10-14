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

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

document.querySelectorAll(".waitlist-form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = form.querySelector("input[type='email']");
    const note = form.parentElement.querySelector(".form-note") || form.querySelector(".form-note");
    if (!input.checkValidity()) {
      input.reportValidity();
      return;
    }
    const button = form.querySelector("button");
    button.textContent = "You’re on the list ✓";
    button.disabled = true;
    input.disabled = true;
    if (note) note.textContent = "Thanks. We’ll keep you posted.";
  });
});

const approveButton = document.querySelector(".approve-demo");
approveButton?.addEventListener("click", () => {
  approveButton.closest(".approval-card").classList.add("approved");
  approveButton.textContent = "Approved ✓";
});
