function submitVolunteer() {
  const name = document.getElementById("volName").value.trim();
  const email = document.getElementById("volEmail").value.trim();
  const skills = document.getElementById("volSkills").value.trim();
  const reason = document.getElementById("volReason").value.trim();
  const message = document.getElementById("volunteerMessage");

  // Basic validation
  if (!name || !email || !skills || !reason) {
    message.style.color = "#f87171"; // red
    message.textContent = "Please complete all fields before submitting.";
    return;
  }

  // Email format check
  if (!email.includes("@") || !email.includes(".")) {
    message.style.color = "#f87171";
    message.textContent = "Please enter a valid email address.";
    return;
  }

  // Get existing volunteers from localStorage
  let volunteers = JSON.parse(localStorage.getItem("volunteers")) || [];

  // Create volunteer object
  const volunteer = {
    name: name,
    email: email,
    skills: skills,
    reason: reason,
    dateApplied: new Date().toISOString(),
    status: "Pending"
  };

  // Save
  volunteers.push(volunteer);
  localStorage.setItem("volunteers", JSON.stringify(volunteers));

  // Success message
  message.style.color = "#22c55e"; // green
  message.textContent =
    "Thank you for applying! Our team will contact you soon.";

  // Clear form
  document.getElementById("volName").value = "";
  document.getElementById("volEmail").value = "";
  document.getElementById("volSkills").value = "";
  document.getElementById("volReason").value = "";
}