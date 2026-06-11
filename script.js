const quizzes = {
  "5-7": {
    title: "Starter Words",
    description: "Từ vựng cơ bản qua hình ảnh, màu sắc và đồ vật quen thuộc.",
    questions: [
      { text: "Which word means 'màu đỏ'?", options: ["Red", "Blue", "Green", "White"], answer: "Red" },
      { text: "Choose the animal: cat", options: ["Con mèo", "Cái bàn", "Quả táo", "Cây bút"], answer: "Con mèo" },
      { text: "How many apples are there: one apple?", options: ["1", "2", "3", "4"], answer: "1" },
      { text: "What do you say when you meet a friend?", options: ["Hello", "Good night", "Goodbye", "Thank you"], answer: "Hello" },
      { text: "Which one is a school thing?", options: ["Pencil", "Lion", "Cake", "Shoe"], answer: "Pencil" }
    ]
  },
  "8-10": {
    title: "Young Learners",
    description: "Câu hỏi về từ vựng, câu ngắn và tình huống giao tiếp trong lớp học.",
    questions: [
      { text: "She ___ a new book.", options: ["has", "have", "is", "are"], answer: "has" },
      { text: "What is the opposite of 'big'?", options: ["Small", "Tall", "Fast", "Clean"], answer: "Small" },
      { text: "Choose the correct sentence.", options: ["I like bananas.", "I likes bananas.", "I liking bananas.", "I am like bananas."], answer: "I like bananas." },
      { text: "Where do students learn?", options: ["At school", "In the sky", "Under water", "On a bus stop"], answer: "At school" },
      { text: "A person who teaches is a ___.", options: ["teacher", "doctor", "driver", "farmer"], answer: "teacher" }
    ]
  },
  "11-13": {
    title: "Pre-Teen Challenge",
    description: "Ngữ pháp và đọc hiểu ngắn cho học sinh lớn hơn.",
    questions: [
      { text: "If it rains tomorrow, we ___ at home.", options: ["will stay", "stayed", "staying", "stay yesterday"], answer: "will stay" },
      { text: "Choose the synonym of 'happy'.", options: ["Glad", "Angry", "Tired", "Empty"], answer: "Glad" },
      { text: "My brother plays football every Sunday. The sentence is in ___.", options: ["present simple", "past simple", "future simple", "present perfect"], answer: "present simple" },
      { text: "Which question is correct?", options: ["What time does class start?", "What time class does start?", "Does what time class start?", "What class time start does?"], answer: "What time does class start?" },
      { text: "Read: 'Linh is saving money to buy a dictionary.' What does Linh want to buy?", options: ["A dictionary", "A bicycle", "A ticket", "A notebook"], answer: "A dictionary" }
    ]
  }
};

const AFFILIATE_LINK = "";
const ADMIN_EMAIL = "admin@englishweb.local";
const ADMIN_PASSWORD = "admin123";
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
