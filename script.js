function scrollToContact() {
    document.getElementById("contact").scrollIntoView({
        behavior: "smooth"
    });
}

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        const status = document.getElementById("statusMessage");

        status.innerText = "";
        status.style.color = "white";

        if (!name || !email || !message) {

            status.style.color = "red";
            status.innerText = "Please fill all the fields.";

            return;
        }

        try {

            const response = await fetch("https://portfolio-backend-1-35bf.onrender.com/api/contact",{
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					name,
					email,
					message
				})
			}
			);

            const result = await response.json();

            if (response.ok) {
                status.style.color = "lightgreen";
                status.innerText = result.message;
                contactForm.reset();
            } else {
                status.style.color = "red";
                status.innerText = result.message || "Failed to send message.";
            }

        } catch (err) {
  console.error("ERROR:", err);

  res.status(500).json({
    success: false,
    message: err.message
  });
}

    });

}

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        if (window.scrollY >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});

const revealElements = document.querySelectorAll(".card,.skill,.about-container,.contact-container");

revealElements.forEach(element => {

    element.style.opacity = "0";
    element.style.transform = "translateY(40px)";
    element.style.transition = "0.8s";

});

function reveal() {

    revealElements.forEach(element => {

        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - 120) {

            element.style.opacity = "1";
            element.style.transform = "translateY(0)";

        }

    });

}

reveal();

window.addEventListener("scroll", reveal);

const roles = [
    "Full Stack Web Developer",
    "Java Developer",
    "Data Science Enthusiast",
    "Machine Learning Learner"
];

let roleIndex = 0;
let charIndex = 0;

const roleHeading = document.querySelector(".text h2");

function typeRole() {

    if (!roleHeading) return;

    if (charIndex < roles[roleIndex].length) {

        roleHeading.textContent += roles[roleIndex].charAt(charIndex);

        charIndex++;

        setTimeout(typeRole, 100);

    } else {

        setTimeout(deleteRole, 1500);

    }

}

function deleteRole() {

    if (charIndex > 0) {

        roleHeading.textContent = roles[roleIndex].substring(0, charIndex - 1);

        charIndex--;

        setTimeout(deleteRole, 50);

    } else {

        roleIndex++;

        if (roleIndex >= roles.length) {
            roleIndex = 0;
        }

        setTimeout(typeRole, 300);

    }

}

if (roleHeading) {

    roleHeading.textContent = "";
    typeRole();

}

const topButton = document.createElement("button");

topButton.innerHTML = "↑";
topButton.id = "topBtn";

document.body.appendChild(topButton);

topButton.style.position = "fixed";
topButton.style.right = "20px";
topButton.style.bottom = "20px";
topButton.style.width = "50px";
topButton.style.height = "50px";
topButton.style.border = "none";
topButton.style.borderRadius = "50%";
topButton.style.cursor = "pointer";
topButton.style.display = "none";
topButton.style.background = "#38bdf8";
topButton.style.color = "white";
topButton.style.fontSize = "22px";
topButton.style.boxShadow = "0 5px 15px rgba(0,0,0,.3)";
topButton.style.zIndex = "999";

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        topButton.style.display = "block";

    } else {

        topButton.style.display = "none";

    }

});

topButton.onclick = () => {

    window.scrollTo({

        top: 0,
        behavior: "smooth"

    });

};

const footer = document.querySelector("footer p:last-child");

if (footer) {

    footer.innerHTML = `© ${new Date().getFullYear()} Manoj Shanigaram. All Rights Reserved.`;

}

console.log("Portfolio Loaded Successfully!");