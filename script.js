document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;
  const status = document.getElementById("statusMessage");

  const response = await fetch("https://portfolio-backend-ay54.onrender.com/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, message }),
  });

  const data = await response.json();

  // ✅ SUCCESS MESSAGE
  status.style.color = "green";
  status.innerText = "✅ Message sent successfully!";

  // clear form
  document.getElementById("contactForm").reset();
});
