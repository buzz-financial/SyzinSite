// Main JS Code
import "./header.js";
import "./footer.js";
import { loadHeader } from "./header.js";
import { loadFooter } from "./footer.js"; 

//Makes header change color when scrolling
window.addEventListener("scroll", ()=> {
    const header = document.getElementById("baseheader");
    if (window.scrollY > 0){
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

//Background changing on homepage
const images = [
    "../Images/MainBackground1.webp",
    "../Images/MainBackground2.webp"
];
let i = 0;
function nextBg() {
    const bg = document.getElementById("AffordableContent");
    if(bg) {
        bg.style.backgroundImage = `url(${images[i]})`;
        i=(i+1)%images.length;
    }
}
nextBg();
setInterval(nextBg, 5000);


//Different page navigation and rendering
let homepage = null;
let homepagePromise = null;
let contactus = null;
let contactusPromise = null;
let submission = null;
let submissionPromise = null;
function loadHomepage() {
  if (!homepagePromise) {
    homepagePromise = fetch('/Pages/AffordableCredit.html')
      .then(r => r.text())
      .then(html => {
        homepage = html;
        return html;
      });
  }
  return homepagePromise;
}
function loadSubmission() {
  if (!submissionPromise) {
    submissionPromise = fetch('/Pages/Submission.html')
      .then(r => r.text())
      .then(html => (submission = html));
  }
  return submissionPromise;
}
function loadContactUs() {
  if (!contactusPromise) {
    contactusPromise = fetch('/Pages/ContactUs.html')
      .then(r => r.text())
      .then(html => (contactus = html));
  }
  return contactusPromise;
}
async function render(page) {
  const app = document.getElementById('app');
  console.log(app);
  if (page === 'contactus') {
    await loadContactUs();
    app.innerHTML = contactus;
    loadHeader();
    loadFooter();
    return;
  } if(page === 'home') {
    await loadHomepage();
    app.innerHTML = homepage;
    loadHeader();
    loadFooter();
    return;
  } if(page === 'submission') {
    await loadSubmission();
    app.innerHTML = submission;
    loadHeader();
    loadFooter();
    const form = document.getElementById("testForm");
    if (!form) return;
    form.addEventListener("submit", submitForm);
    return;
  }
  await loadHomepage();
  app.innerHTML = homepage;
  loadHeader();
  loadFooter();
}
function getPageFromPath() {
  const p = location.hash.replace('#/', '');
  return p === '' || p === 'home' ? 'home' : p;
}
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[data-page]');
  if (!link) return;
  e.preventDefault();
  const page = link.dataset.page;
  const url = page === 'home' ? '#/' : `#/${page}`;
  location.hash = url;
});
window.addEventListener('hashchange', () => {
  render(getPageFromPath());
});
if (!location.hash) location.hash = '#/';
render(getPageFromPath());
window.onpopstate = () => {
  render(getPageFromPath());
};
render(getPageFromPath());



//Collects form information for the email submission
async function submitForm(e) {
  const button = document.querySelector("button[type='submit']");
  button.disabled = true;
  e.preventDefault();
  const body = {
    name: document.querySelector("#name").value,
    email: document.querySelector("#email").value,
    message: document.querySelector("#message").value,
    phone: document.querySelector("#phone").value,
    company: document.querySelector("#company").value,
    partnership: document.querySelector("#partnership").value,
    ref: document.querySelector("#ref").value,
    industry: document.querySelector("#industry").value
  };
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (res.ok){
    const page2 = "home";
    const url2 = page2 === 'home' ? '#/' : `#/${page2}`;
    location.hash=url2;
    render(getPageFromPath());
    alert("Sent");
  } else {
    alert("Failed to send");
    button.disabled = false;
  }
}