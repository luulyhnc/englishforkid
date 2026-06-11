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
const SUPABASE_URL = "https://iqmmaotdkvdkikupsclw.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_ohckBpXEPMrP2lcrhjCDuw_q2efbRZ3";
const ADMIN_EMAIL = "lethuhien211094@gmail.com";
const GUEST_LIMIT = 1;
const MEMBER_LIMIT = 8;
const GUEST_STORAGE_KEY = "englishWebGuestSubmissions";
const SITE_CONTENT_KEY = "english_web_site_content";
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const tabs = document.querySelectorAll(".age-tab");
const formTabs = document.querySelectorAll(".form-tab");
const form = document.querySelector("#quiz-form");
const testsSection = document.querySelector("#tests");
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
const learningSection = document.querySelector("#learning");
const learningWelcome = document.querySelector("#learning-welcome");
const learningAccount = document.querySelector("#learning-account");
const learningQuota = document.querySelector("#learning-quota");
const learningStart = document.querySelector("#learning-start");
const levelCards = document.querySelectorAll(".level-card");
const heroEyebrow = document.querySelector("#hero-eyebrow");
const heroTitle = document.querySelector("#hero-title");
const heroSubtitle = document.querySelector("#hero-subtitle");
const introVideo = document.querySelector("#intro-video");
const statYears = document.querySelector("#stat-years");
const statCountries = document.querySelector("#stat-countries");
const statTeachers = document.querySelector("#stat-teachers");
const siteEditor = document.querySelector("#site-editor");
const siteEditorMessage = document.querySelector("#site-editor-message");
const resetSiteContentButton = document.querySelector("#reset-site-content");
const editEyebrow = document.querySelector("#edit-eyebrow");
const editTitle = document.querySelector("#edit-title");
const editSubtitle = document.querySelector("#edit-subtitle");
const editVideo = document.querySelector("#edit-video");
const editStatYears = document.querySelector("#edit-stat-years");
const editStatCountries = document.querySelector("#edit-stat-countries");
const editStatTeachers = document.querySelector("#edit-stat-teachers");

let activeAge = "5-7";
let authMode = "login";
let currentSession = null;
let currentProfile = null;
let selectedLearningAge = "5-7";
let siteContent = getDefaultSiteContent();


function getDefaultSiteContent() {
  return {
    eyebrow: "Học tiếng Anh online cho bé",
    title: "Tự tin giao tiếp với thế giới",
    subtitle: "English Web giúp bé luyện Super Kids qua video giới thiệu, vòng tự luyện, bài thi thử và báo cáo kết quả sau mỗi lần nộp bài.",
    videoUrl: "",
    statYears: "3",
    statCountries: "30+",
    statTeachers: "8"
  };
}

function getStoredSiteContent() {
  try {
    const saved = JSON.parse(localStorage.getItem(SITE_CONTENT_KEY));
    return saved ? { ...getDefaultSiteContent(), ...saved } : getDefaultSiteContent();
  } catch (error) {
    return getDefaultSiteContent();
  }
}

function normalizeVideoUrl(url) {
  const value = url.trim();
  if (!value) return "";
  if (value.includes("youtube.com/watch")) {
    const parsed = new URL(value);
    const id = parsed.searchParams.get("v");
    return id ? `https://www.youtube.com/embed/${id}` : value;
  }
  if (value.includes("youtu.be/")) {
    const id = value.split("youtu.be/")[1]?.split(/[?&]/)[0];
    return id ? `https://www.youtube.com/embed/${id}` : value;
  }
  return value;
}

function renderIntroVideo(url) {
  const videoUrl = normalizeVideoUrl(url || "");
  if (!videoUrl) {
    introVideo.innerHTML = `<img src="assets/learning-room.svg" alt="Video giới thiệu English Web">`;
    return;
  }

  if (videoUrl.includes("youtube.com/embed") || videoUrl.includes("player.vimeo.com")) {
    introVideo.innerHTML = `<iframe src="${videoUrl}" title="Video giới thiệu English Web" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    return;
  }

  introVideo.innerHTML = `<video src="${videoUrl}" controls playsinline poster="assets/learning-room.svg"></video>`;
}

function applySiteContent(content) {
  siteContent = { ...getDefaultSiteContent(), ...content };
  heroEyebrow.textContent = siteContent.eyebrow;
  heroTitle.textContent = siteContent.title;
  heroSubtitle.textContent = siteContent.subtitle;
  statYears.textContent = siteContent.statYears;
  statCountries.textContent = siteContent.statCountries;
  statTeachers.textContent = siteContent.statTeachers;
  renderIntroVideo(siteContent.videoUrl);
  fillSiteEditor();
}

function fillSiteEditor() {
  if (!siteEditor) return;
  editEyebrow.value = siteContent.eyebrow;
  editTitle.value = siteContent.title;
  editSubtitle.value = siteContent.subtitle;
  editVideo.value = siteContent.videoUrl;
  editStatYears.value = siteContent.statYears;
  editStatCountries.value = siteContent.statCountries;
  editStatTeachers.value = siteContent.statTeachers;
}

async function loadSiteContent() {
  applySiteContent(getStoredSiteContent());

  const { data } = await supabaseClient
    .from("app_settings")
    .select("value")
    .eq("key", SITE_CONTENT_KEY)
    .maybeSingle();

  if (data?.value) {
    try {
      const remoteContent = JSON.parse(data.value);
      localStorage.setItem(SITE_CONTENT_KEY, JSON.stringify(remoteContent));
      applySiteContent(remoteContent);
    } catch (error) {
      applySiteContent(getStoredSiteContent());
    }
  }
}

async function saveSiteContent(content) {
  localStorage.setItem(SITE_CONTENT_KEY, JSON.stringify(content));
  applySiteContent(content);

  if (!isAdminUser()) return { savedRemote: false };

  const { error } = await supabaseClient
    .from("app_settings")
    .upsert({ key: SITE_CONTENT_KEY, value: JSON.stringify(content) });

  return { savedRemote: !error, error };
}
function getGuestSubmissions() {
  return Number(localStorage.getItem(GUEST_STORAGE_KEY) || 0);
}

function setGuestSubmissions(value) {
  localStorage.setItem(GUEST_STORAGE_KEY, String(value));
}

function getCurrentUser() {
  return currentSession?.user || null;
}

function isAdminUser(user = getCurrentUser()) {
  return user?.email?.toLowerCase() === ADMIN_EMAIL;
}

function getMemberSubmissions(user = getCurrentUser()) {
  return Number(user?.user_metadata?.english_web_submissions || 0);
}

function getAttemptInfo() {
  const user = getCurrentUser();
  if (!user) {
    const used = getGuestSubmissions();
    return { left: Math.max(GUEST_LIMIT - used, 0), limit: GUEST_LIMIT };
  }
  if (isAdminUser(user)) return { left: "Không giới hạn", limit: Infinity };
  const used = getMemberSubmissions(user);
  return { left: Math.max(MEMBER_LIMIT - used, 0), limit: MEMBER_LIMIT };
}

async function loadProfile() {
  const user = getCurrentUser();
  currentProfile = null;
  if (!user) return;

  const { data } = await supabaseClient
    .from("profiles")
    .select("id,email,full_name,role,created_at")
    .eq("id", user.id)
    .maybeSingle();

  currentProfile = data || null;
}

async function refreshSession() {
  const { data } = await supabaseClient.auth.getSession();
  currentSession = data.session;
  await loadProfile();
  updateAccountUI();
}

function updateAccountUI() {
  const user = getCurrentUser();
  const attemptInfo = getAttemptInfo();

  if (!user) {
    accountTitle.textContent = "Bạn đang là khách";
    accountDetail.textContent = "Đăng ký hoặc đăng nhập để mở thêm lượt nộp bài.";
    logoutButton.hidden = true;
  } else if (isAdminUser(user)) {
    accountTitle.textContent = "Admin đang đăng nhập";
    accountDetail.textContent = `${user.email} có quyền nộp bài không giới hạn. Tài khoản được lưu bằng Supabase Auth.`;
    logoutButton.hidden = false;
  } else {
    accountTitle.textContent = "Tài khoản đã đăng nhập";
    accountDetail.textContent = `${user.email} được nộp nhiều bài hơn khách. Lượt nộp được lưu trên Supabase.`;
    logoutButton.hidden = false;
  }

  attemptsLeft.textContent = attemptInfo.left;
  adminPanel.hidden = !isAdminUser(user);
  renderUserList();
  updateLearningUI();
  loadSiteContent();
}

function updateLearningUI() {
  const user = getCurrentUser();
  if (!learningSection) return;

  learningSection.hidden = !user;
  if (!user) return;

  const attemptInfo = getAttemptInfo();
  const accountType = isAdminUser(user) ? "Admin" : "Tài khoản học tập";
  learningWelcome.textContent = "Chọn cuộc thi hoặc vòng tự luyện phù hợp rồi bấm vào làm bài.";
  learningAccount.textContent = `${accountType}: ${user.email}`;
  learningQuota.textContent = `Lượt nộp còn lại: ${attemptInfo.left}`;
}

function openLearningDashboard() {
  updateLearningUI();
  window.location.hash = "learning";
  document.querySelector("#learning").scrollIntoView({ behavior: "smooth" });
}

function renderUserList() {
  if (!userList) return;
  if (!isAdminUser()) {
    userList.innerHTML = "";
    return;
  }

  userList.innerHTML = `
    <div class="user-row">
      <strong>${currentProfile?.email || ADMIN_EMAIL}</strong>
      <span>${currentProfile?.role || "admin"}</span>
    </div>
  `;
}

function clearAuthFields() {
  if (!emailInput || !passwordInput) return;
  emailInput.value = "";
  passwordInput.value = "";
}

function forceClearSavedLoginFields() {
  clearAuthFields();
  setTimeout(clearAuthFields, 50);
  setTimeout(clearAuthFields, 300);
}

function setAuthMode(mode) {
  authMode = mode;
  formTabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.mode === mode));
  authSubmit.textContent = mode === "login" ? "Đăng nhập" : "Đăng ký";
  authMessage.textContent = "";
  forceClearSavedLoginFields();
}

async function handleAuth(event) {
  event.preventDefault();
  const email = emailInput.value.trim().toLowerCase();
  const password = passwordInput.value;
  authSubmit.disabled = true;
  authMessage.textContent = "Đang xử lý...";

  const { data, error } = authMode === "login"
    ? await supabaseClient.auth.signInWithPassword({ email, password })
    : await supabaseClient.auth.signUp({ email, password });

  if (error) {
    authMessage.textContent = error.message;
    authSubmit.disabled = false;
    return;
  }

  if (authMode === "register") {
    await supabaseClient.auth.signOut();
    currentSession = null;
    authMessage.textContent = "Tài khoản đã được tạo. Nếu hệ thống yêu cầu xác nhận email, hãy xác nhận trước khi đăng nhập.";
    setAuthMode("login");
  } else {
    currentSession = data.session;
    authMessage.textContent = "Đã đăng nhập.";
    setTimeout(openLearningDashboard, 100);
  }

  authForm.reset();
  forceClearSavedLoginFields();
  authSubmit.disabled = false;
  await refreshSession();
}

function canSubmitQuiz() {
  const attemptInfo = getAttemptInfo();
  return attemptInfo.limit === Infinity || attemptInfo.left > 0;
}

async function recordSubmission() {
  const user = getCurrentUser();
  if (!user) {
    setGuestSubmissions(getGuestSubmissions() + 1);
  } else if (!isAdminUser(user)) {
    const nextSubmissions = getMemberSubmissions(user) + 1;
    const { data, error } = await supabaseClient.auth.updateUser({
      data: { ...user.user_metadata, english_web_submissions: nextSubmissions }
    });

    if (!error && data.user) {
      currentSession = { ...currentSession, user: data.user };
    }
  }
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

function selectQuizLevel(age) {
  selectedLearningAge = age;
  tabs.forEach((item) => item.classList.toggle("active", item.dataset.age === age));
  levelCards.forEach((item) => item.classList.toggle("active", item.dataset.age === age));
  renderQuiz(age);
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => selectQuizLevel(tab.dataset.age));
});

levelCards.forEach((card) => {
  card.addEventListener("click", () => selectQuizLevel(card.dataset.age));
});

learningStart.addEventListener("click", () => {
  selectQuizLevel(selectedLearningAge);
  testsSection.hidden = false;
  window.location.hash = "tests";
  testsSection.scrollIntoView({ behavior: "smooth" });
});

formTabs.forEach((tab) => {
  tab.addEventListener("click", () => setAuthMode(tab.dataset.mode));
});

authForm.addEventListener("submit", handleAuth);

siteEditor.addEventListener("submit", async (event) => {
  event.preventDefault();
  const nextContent = {
    eyebrow: editEyebrow.value.trim(),
    title: editTitle.value.trim(),
    subtitle: editSubtitle.value.trim(),
    videoUrl: editVideo.value.trim(),
    statYears: editStatYears.value.trim(),
    statCountries: editStatCountries.value.trim(),
    statTeachers: editStatTeachers.value.trim()
  };

  siteEditorMessage.textContent = "Đang lưu...";
  const result = await saveSiteContent(nextContent);
  siteEditorMessage.textContent = result.savedRemote
    ? "Đã lưu online."
    : "Đã áp dụng trên trình duyệt. Nếu muốn lưu online, kiểm tra quyền owner trong Supabase.";
});

resetSiteContentButton.addEventListener("click", async () => {
  siteEditorMessage.textContent = "Đang khôi phục...";
  const result = await saveSiteContent(getDefaultSiteContent());
  siteEditorMessage.textContent = result.savedRemote ? "Đã khôi phục mặc định online." : "Đã khôi phục mặc định trên trình duyệt.";
});

logoutButton.addEventListener("click", async () => {
  await supabaseClient.auth.signOut();
  currentSession = null;
  currentProfile = null;
  authMessage.textContent = "Đã đăng xuất.";
  forceClearSavedLoginFields();
  window.location.hash = "account";
  testsSection.hidden = true;
  updateAccountUI();
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!canSubmitQuiz()) {
    resultEl.textContent = "Bạn đã hết lượt nộp bài. Hãy đăng ký hoặc đăng nhập để làm nhiều bài hơn.";
    document.querySelector("#account").scrollIntoView({ behavior: "smooth" });
    return;
  }

  scoreQuiz();
  await recordSubmission();
  runAffiliateLink();
});

restartButton.addEventListener("click", () => renderQuiz(activeAge));

supabaseClient.auth.onAuthStateChange(async (_event, session) => {
  currentSession = session;
  await loadProfile();
  updateAccountUI();
});

applySiteContent(getStoredSiteContent());
forceClearSavedLoginFields();
renderQuiz(activeAge);
refreshSession();

