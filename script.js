// Problem 6 -- Loading comments
const f = "http://127.0.0.1:8080/comments.json"
const commentsContainer = document.querySelector(".comments-container");
let currentComments = [];

window.onload = () => {
  fetch(f)
  .then(res => res.json())
  .then(data => {
    currentComments = data;
    currentComments.forEach(addComment);
  })
  .catch(e => console.error(e))
}

function addComment(cmt) {
  let newComment = document.createElement("div");
  newComment.classList.add("comment");
  newComment.id = cmt.id;
  newComment.innerHTML =  `
    <div>
      <svg height="80" width="80"><circle cx="30" cy="30" r="30" fill=${cmt.color}></svg>
    </div>
    <div>
      <h5 class="comment-email">${cmt.email}</h5>
      <p class="comment-text">${cmt.comment}</p>
    </div>`;

  commentsContainer.appendChild(newComment);
}

// Problem 4 -- Submit comments
// Problem 5 -- Form validation
// Problem 6 -- Saving comments
const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!form.checkValidity()) {
    e.stopPropagation();
    form.classList.add('was-validated');
  } 
  else {
    const lastComment = commentsContainer.lastElementChild;
    const cmt = {
      color:    form.querySelector('input[name="comment-color"]:checked').value,
      email:    form.querySelector('#new-email').value,
      comment:  form.querySelector('#new-comment').value,
      id:       lastComment ? 'c' + (Number(lastComment.id.substring(1)) + 1) : 'c1001'
    };
 
    addComment(cmt);
    saveComment(cmt);
    form.reset();
    form.classList.remove('was-validated');
  }
})

function saveComment(cmt) {
  currentComments.push({
    "id": cmt.id,
    "color": cmt.color,
    "email": cmt.email,
    "comment": cmt.comment
  });

  fetch(f, {
    method: "PUT",
    body: JSON.stringify(currentComments)
  });
}

// Problem 3 -- Task 0: Hide/show button +
// Additional feature: transparent navbar to solid color on scroll
const navbar = document.querySelector('.navbar');
const taskbar = document.querySelector('.taskbar');
const taskbarToggleBtn = document.querySelector('.taskbarToggleBtn');

function toggleTaskbar(){
  if (window.getComputedStyle(taskbar).display === "none") {
    taskbar.style.display = "block";
    taskbarToggleBtn.textContent = "Hide";
    navbar.classList.add('scrolled');
  } else {
    taskbar.style.display = "none";
    taskbarToggleBtn.textContent = "Show";
  }
}

window.addEventListener('scroll', () => {
  if (window.scrollY >= 55) {
    navbar.classList.add('scrolled');
  } else if (taskbarToggleBtn.textContent == "Show") {
    navbar.classList.remove('scrolled');
  }
})

// Problem 3 -- Task 1: Align
let counter = 0;
const alignmentArray = ["center", "right", "left"];

function alignColumnText(){
  const texts = document.querySelectorAll(".row h5, .row p, th, td");
  texts.forEach((text) => {
    text.style.textAlign = alignmentArray[counter % 3];
  })
  counter += 1;
}

// Problem 3 -- Task 2: Spotlight
function toSpotlight(){
  const spotlight = prompt("Enter a spotlight of Vistá:");
  if (spotlight) {
      const listItem = document.createElement('li');
      listItem.textContent = spotlight;
      document.querySelector('.spotlightList').appendChild(listItem);
  }
}

// Problem 3 -- Task 3: Bootstrap Toast
function bootstrapToast() {
  const d = new Date();
  const toastLive = document.getElementById('liveToast');
  const toastLiveText = document.getElementById('liveToastText');

  toastLiveText.textContent = `Current Time: ${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;

  const toast = new bootstrap.Toast(toastLive);
  toast.show();
}
