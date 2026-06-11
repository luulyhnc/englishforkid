const quizzes = {
  "5-7": {
    title: "Super Kids Starter",
    description: "Bài test theo chủ đề chào hỏi, màu sắc, số đếm, đồ vật lớp học và gia đình.",
    questions: [
      { text: "A: Hello! B: ___", options: ["Hello!", "Red", "Seven", "Chair"], answer: "Hello!" },
      { text: "Which one is a color?", options: ["Yellow", "Pencil", "Mother", "Jump"], answer: "Yellow" },
      { text: "Count: one, two, ___.", options: ["three", "blue", "book", "hello"], answer: "three" },
      { text: "What is this? It is used to write.", options: ["A pencil", "A dog", "A banana", "A hat"], answer: "A pencil" },
      { text: "Choose the family word.", options: ["Father", "Window", "Green", "Run"], answer: "Father" },
      { text: "I ___ a student.", options: ["am", "is", "are", "be"], answer: "am" },
      { text: "What color is grass?", options: ["Green", "Pink", "Black", "Orange"], answer: "Green" },
      { text: "Choose the correct answer: How old are you?", options: ["I am six.", "I am book.", "It is red.", "This is mom."], answer: "I am six." },
      { text: "Which word is an animal?", options: ["Cat", "Desk", "Bag", "Ten"], answer: "Cat" },
      { text: "A: Goodbye! B: ___", options: ["Goodbye!", "I am fine.", "It is blue.", "Open book."], answer: "Goodbye!" }
    ]
  },
  "8-10": {
    title: "Super Kids Junior",
    description: "Bài test về lớp học, đồ chơi, hoạt động hằng ngày, câu hỏi ngắn và mẫu câu giao tiếp.",
    questions: [
      { text: "Choose the correct sentence.", options: ["This is my ruler.", "This my is ruler.", "Ruler this my is.", "My this ruler is."], answer: "This is my ruler." },
      { text: "A: What's your name? B: ___", options: ["My name is Anna.", "I am nine years.", "It is a desk.", "Yes, I do."], answer: "My name is Anna." },
      { text: "He ___ a red ball.", options: ["has", "have", "am", "are"], answer: "has" },
      { text: "Which one is a toy?", options: ["Kite", "Teacher", "Kitchen", "Morning"], answer: "Kite" },
      { text: "A: Can you swim? B: ___", options: ["Yes, I can.", "Yes, I am.", "Yes, it is.", "Yes, he does."], answer: "Yes, I can." },
      { text: "My sister ___ apples.", options: ["likes", "like", "liking", "to like"], answer: "likes" },
      { text: "Choose the school place.", options: ["Classroom", "Beach", "Zoo", "Farm"], answer: "Classroom" },
      { text: "A: Where is the book? B: It is ___ the bag.", options: ["in", "happy", "seven", "drink"], answer: "in" },
      { text: "What do you do in the morning?", options: ["I brush my teeth.", "I am a pencil.", "It is purple.", "She are tall."], answer: "I brush my teeth." },
      { text: "Choose the opposite of 'hot'.", options: ["Cold", "Big", "Fast", "Young"], answer: "Cold" }
    ]
  },
  "11-13": {
    title: "Super Kids Challenge",
    description: "Bài test nâng cao hơn về thì hiện tại đơn, khả năng, miêu tả người-vật và đọc hiểu ngắn.",
    questions: [
      { text: "She ___ English every Monday.", options: ["studies", "study", "studying", "is study"], answer: "studies" },
      { text: "Choose the correct question.", options: ["Where do you live?", "Where you do live?", "Where live do you?", "Where does you live?"], answer: "Where do you live?" },
      { text: "A: What is he doing? B: He ___ a picture.", options: ["is drawing", "draw", "draws yesterday", "are drawing"], answer: "is drawing" },
      { text: "Which sentence describes ability?", options: ["I can ride a bike.", "I have a bike.", "This is a bike.", "The bike is red."], answer: "I can ride a bike." },
      { text: "Choose the best answer: There ___ two books on the table.", options: ["are", "is", "am", "be"], answer: "are" },
      { text: "Read: 'Tom has a small dog. The dog likes milk.' What does the dog like?", options: ["Milk", "Rice", "Juice", "Bread"], answer: "Milk" },
      { text: "Choose the word for a job.", options: ["Doctor", "Cloudy", "Behind", "Purple"], answer: "Doctor" },
      { text: "A: Why do you like music? B: Because it is ___.", options: ["fun", "under", "five", "teacher"], answer: "fun" },
      { text: "Choose the correct sentence.", options: ["They are playing soccer.", "They is playing soccer.", "They playing soccer are.", "They plays soccer now."], answer: "They are playing soccer." },
      { text: "Which answer matches: What does your mother do?", options: ["She is a nurse.", "She is in the bag.", "She is seven.", "She is blue."], answer: "She is a nurse." }
    ]
  }
};
const AFFILIATE_LINK = "";
const ADMIN_EMAIL = "lethuhien211094@gmail.com";
const ADMIN_PASSWORD = "123456";
const GUEST_LIMIT = 1;
const MEMBER_LIMIT = 8;
const STORAGE_KEY = "englishWebState";

const tabs = document.querySelectorAll(".age-tab");
const formTabs = document.querySelectorAll(".form-tab");
const form = document.querySelector("#quiz-form");
const authForm = document.querySelector("#auth-form");
const questionsEl = document.querySelector("#questions");
const titleEl = document.querySelector("#quiz-title");
const descriptionEl = document.querySelector("#quiz-description");
const countEl = document.querySelector("#question-count");
const resultEl = document.querySelector("#result");
const restartButton = document.querySelector("#restart");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const authSubmit = document.querySelector("#auth-submit");
const authMessage = document.querySelector("#auth-message");
const accountTitle = document.querySelector("#account-title");
const accountDetail = document.querySelector("#account-detail");
const attemptsLeft = document.querySelector("#attempts-left");
const logoutButton = document.querySelector("#logout");
const adminPanel = document.querySelector("#admin-panel");
const userList = document.querySelector("#user-list");

let activeAge = "5-7";
let authMode = "login";
let state = loadState();

function loadState() {
  const fallback = { currentUser: null, guestSubmissions: 0, users: [] };
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return saved && Array.isArray(saved.users) ? { ...fallback, ...saved } : fallback;
  } catch (error) {
    return fallback;
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getCurrentUser() {
  if (!state.currentUser) return null;
  if (state.currentUser === ADMIN_EMAIL) {
    return { email: ADMIN_EMAIL, role: "admin", submissions: 0 };
  }
  return state.users.find((user) => user.email === state.currentUser) || null;
}

function getAttemptInfo() {
  const user = getCurrentUser();
  if (!user) return { role: "guest", used: state.guestSubmissions, limit: GUEST_LIMIT, left: Math.max(GUEST_LIMIT - state.guestSubmissions, 0) };
  if (user.role === "admin") return { role: "admin", used: 0, limit: Infinity, left: "Không giới hạn" };
  return { role: "member", used: user.submissions || 0, limit: MEMBER_LIMIT, left: Math.max(MEMBER_LIMIT - (user.submissions || 0), 0) };
}

function updateAccountUI() {
  const user = getCurrentUser();
  const attemptInfo = getAttemptInfo();

  if (!user) {
    accountTitle.textContent = "Bạn đang là khách";
    accountDetail.textContent = "Đăng ký hoặc đăng nhập để mở thêm lượt nộp bài.";
    logoutButton.hidden = true;
  } else if (user.role === "admin") {
    accountTitle.textContent = "Admin đang đăng nhập";
    accountDetail.textContent = `${user.email} có quyền nộp bài không giới hạn và xem tài khoản demo.`;
    logoutButton.hidden = false;
  } else {
    accountTitle.textContent = "Tài khoản đã đăng nhập";
    accountDetail.textContent = `${user.email} được nộp nhiều bài hơn khách.`;
    logoutButton.hidden = false;
  }

  attemptsLeft.textContent = attemptInfo.left;
  adminPanel.hidden = !(user && user.role === "admin");
  renderUserList();
}

function renderUserList() {
  if (!userList) return;
  if (!state.users.length) {
    userList.innerHTML = `<div class="user-row"><strong>Chưa có tài khoản đăng ký</strong><span>0 lượt</span></div>`;
    return;
  }

  userList.innerHTML = state.users.map((user) => `
    <div class="user-row">
      <strong>${user.email}</strong>
      <span>${user.submissions || 0}/${MEMBER_LIMIT} lượt đã dùng</span>
    </div>
  `).join("");
}

function setAuthMode(mode) {
  authMode = mode;
  formTabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.mode === mode));
  authSubmit.textContent = mode === "login" ? "Đăng nhập" : "Đăng ký";
  authMessage.textContent = "";
}

function handleAuth(event) {
  event.preventDefault();
  const email = emailInput.value.trim().toLowerCase();
  const password = passwordInput.value;

  if (authMode === "login" && email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    state.currentUser = ADMIN_EMAIL;
    saveState();
    authMessage.textContent = "Đã đăng nhập admin.";
    authForm.reset();
    updateAccountUI();
    return;
  }

  const existingUser = state.users.find((user) => user.email === email);

  if (authMode === "register") {
    if (email === ADMIN_EMAIL || existingUser) {
      authMessage.textContent = "Email này đã được sử dụng.";
      return;
    }

    state.users.push({ email, password, role: "member", submissions: 0, createdAt: new Date().toISOString() });
    state.currentUser = email;
    saveState();
    authMessage.textContent = "Đăng ký thành công. Bạn đã được mở thêm lượt nộp bài.";
    authForm.reset();
    updateAccountUI();
    return;
  }

  if (!existingUser || existingUser.password !== password) {
    authMessage.textContent = "Email hoặc mật khẩu chưa đúng.";
    return;
  }

  state.currentUser = email;
  saveState();
  authMessage.textContent = "Đã đăng nhập.";
  authForm.reset();
  updateAccountUI();
}

function canSubmitQuiz() {
  const attemptInfo = getAttemptInfo();
  return attemptInfo.limit === Infinity || attemptInfo.left > 0;
}

function recordSubmission() {
  const user = getCurrentUser();
  if (!user) {
    state.guestSubmissions += 1;
  } else if (user.role !== "admin") {
    user.submissions = (user.submissions || 0) + 1;
  }
  saveState();
  updateAccountUI();
}

function renderQuiz(age) {
  activeAge = age;
  const quiz = quizzes[age];
  titleEl.textContent = quiz.title;
  descriptionEl.textContent = quiz.description;
  countEl.textContent = quiz.questions.length;
  resultEl.textContent = "";

  questionsEl.innerHTML = quiz.questions.map((question, index) => {
    const answers = question.options.map((option) => `
      <label class="answer">
        <input type="radio" name="q${index}" value="${option}" required>
        <span>${option}</span>
      </label>
    `).join("");

    return `
      <fieldset class="question">
        <legend>${index + 1}. ${question.text}</legend>
        <div class="answers">${answers}</div>
      </fieldset>
    `;
  }).join("");
}

function runAffiliateLink() {
  if (!AFFILIATE_LINK) return;
  window.open(AFFILIATE_LINK, "_blank", "noopener,noreferrer");
}

function scoreQuiz() {
  const quiz = quizzes[activeAge];
  let score = 0;

  quiz.questions.forEach((question, index) => {
    const selected = form.querySelector(`input[name="q${index}"]:checked`);
    if (selected && selected.value === question.answer) score += 1;
  });

  const percent = Math.round((score / quiz.questions.length) * 100);
  const message = percent >= 80 ? "Rất tốt" : percent >= 60 ? "Khá tốt" : "Cần luyện thêm";
  resultEl.textContent = `${message}: ${score}/${quiz.questions.length} câu đúng (${percent}%).`;
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");
    renderQuiz(tab.dataset.age);
  });
});

formTabs.forEach((tab) => {
  tab.addEventListener("click", () => setAuthMode(tab.dataset.mode));
});

authForm.addEventListener("submit", handleAuth);

logoutButton.addEventListener("click", () => {
  state.currentUser = null;
  saveState();
  authMessage.textContent = "Đã đăng xuất.";
  updateAccountUI();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!canSubmitQuiz()) {
    resultEl.textContent = "Bạn đã hết lượt nộp bài. Hãy đăng ký hoặc đăng nhập để làm nhiều bài hơn.";
    document.querySelector("#account").scrollIntoView({ behavior: "smooth" });
    return;
  }

  scoreQuiz();
  recordSubmission();
  runAffiliateLink();
});

restartButton.addEventListener("click", () => renderQuiz(activeAge));

renderQuiz(activeAge);
updateAccountUI();


