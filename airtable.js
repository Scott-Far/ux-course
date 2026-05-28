// ─── SUBMISSION ENDPOINT ──────────────────────────────────────
const SUBMIT_URL = 'https://script.google.com/macros/s/AKfycbxCE8NeQCKFThpxwmhzUvFUGjLOjRmDUMwiTc92vQE5tK8JzT15QoCgQOlEy_bpD_hQ/exec';
// ───────────────────────────────────────────────────────────────

function requireStudent() {
  const name  = localStorage.getItem('ux_student_name');
  const email = localStorage.getItem('ux_student_email');
  if (!name || !email) {
    window.location.href = 'welcome.html';
  }
  return { name, email };
}

async function submitToAirtable(lesson, activity, response) {
  const student = requireStudent();

  const payload = {
    studentName: student.name,
    email:       student.email,
    lesson:      lesson,
    activity:    activity,
    response:    response
  };

  const res = await fetch(SUBMIT_URL, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(payload),
    mode:    'no-cors'
  });

  return true;
}

async function saveActivity(btn, lesson, activity, textareaId) {
  const textarea = document.getElementById(textareaId);
  const response = textarea ? textarea.value.trim() : '';

  if (!response) {
    const orig = btn.textContent;
    btn.textContent = 'Please write something first';
    btn.style.background = '#b06820';
    setTimeout(() => {
      btn.textContent = orig;
      btn.style.background = '';
    }, 2000);
    return;
  }

  btn.textContent = 'Saving...';
  btn.disabled = true;

  try {
    await submitToAirtable(lesson, activity, response);
    btn.textContent = 'Saved ✓';
    btn.style.background = '#2a6642';
    if (textarea) textarea.style.opacity = '0.6';
  } catch(e) {
    btn.textContent = 'Error — try again';
    btn.style.background = '#9c2f2f';
    btn.disabled = false;
    setTimeout(() => {
      btn.textContent = 'Save response';
      btn.style.background = '';
    }, 3000);
  }
}
