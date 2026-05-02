function submitContact() {
  const name = document.getElementById("contactName").value.trim();
  const email = document.getElementById("contactEmail").value.trim();
  const message = document.getElementById("contactMessage").value.trim();
  const response = document.getElementById("contactResponse");

  // Reset response
  response.textContent = "";
  response.style.color = "";

  // Check required fields
  if (!name || !email || !message) {
    showContactMessage(
      "Please complete all fields before sending your message.",
      "error"
    );
    return;
  }

  // Validate email
  if (!isValidContactEmail(email)) {
    showContactMessage("Please enter a valid email address.", "error");
    return;
  }

  // Create message object
  const contactEntry = {
    name: name,
    email: email,
    message: message,
    receivedAt: new Date().toISOString(),
    status: "Unread"
  };

  // Get existing messages
  let messages = JSON.parse(
    localStorage.getItem("okuhlekonke_messages")
  );

  if (!Array.isArray(messages)) messages = [];

  // Save message
  messages.push(contactEntry);
  localStorage.setItem(
    "okuhlekonke_messages",
    JSON.stringify(messages)
  );

  // Show success message
  showContactMessage(
    "Thank you for contacting us. Your message has been sent successfully.",
    "success"
  );

  // Clear form
  document.getElementById("contactName").value = "";
  document.getElementById("contactEmail").value = "";
  document.getElementById("contactMessage").value = "";
}

/* ==============================
   Helper Functions
================================ */

function isValidContactEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showContactMessage(text, type) {
  const response = document.getElementById("contactResponse");

  if (type === "success") {
    response.style.color = "#22c55e"; // green
  } else {
    response.style.color = "#f87171"; // red
  }

  response.textContent = text;
}