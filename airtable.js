// ─── AIRTABLE CONFIG ───────────────────────────────────────────
const AIRTABLE_TOKEN = 'patPgcs5jcjDBUNj.67a562103cc6d12fce3a5552a70d2f2b9e97151e592e14369cfe9c9aa263436f';
const AIRTABLE_BASE  = 'appmdfNF7XX9tFy7A';
const AIRTABLE_TABLE = 'Submissions';
// ───────────────────────────────────────────────────────────────

// Redirect to welcome page if student not registered
function requireStudent() {
  const name  = localStorage.getItem('ux_student_name');
  const email = localStorage.getItem('ux_student_email');
  if (!name || !email) {
    window.location.href = 'welcome.html';
  }
  return { name, email };
}

// Submit a student activity response to Airtable
async function submitToAirtable(lesson, activity, response) {
  const student = requireStudent();

  const record = {
    fields: {
      'Submission Name': `${student.name} — ${lesson} — ${activity}`,
      'Student Name':    student.name,
      'Student Email':   student.email,
      'Lesson':          lesson,
      'Activity':        activity,
      'Response':        response,
      'Status':          'New',
      'Submission Date': new Date().toISOString().split('T')[0]
    }
  };

  const res = await fetch(
    `https://api.airtable.com/v0/${AIRTABLE_BASE}/${encodeURIComponent(AIRTABLE_TABLE)}`,
    {
      method:  'POST',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_TOKEN}`,
        'Content-Type':  'application/json'
      },
      body: JSON.stringify(record)
    }
  );

  if (!res.ok) {
    const err = await res.json();
    console.error('Airtable error:', err);
    throw new Error('Submission failed');
  }

  return await res.json();
}

// Handle Save button click
// Usage: saveActivity(buttonEl, 'Lesson 1.1', 'Activity 1', 'textarea-id')
async function saveActivity(btn, lesson, activity, textareaId) {
  const textarea = document.getElementById(textareaId);
  const response = textarea ? textarea.value.trim() : '';

  if (!response) {
    btn.textContent = 'Please write something first';
    btn.style.background = '#b06820';
    setTimeout(() => {
      btn.textContent = 'Save response';
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
    textarea.style.opacity = '0.6';
  } catch (e) {
    btn.textContent = 'Error — try again';
    btn.style.background = '#9c2f2f';
    btn.disabled = false;
    setTimeout(() => {
      btn.textContent = 'Save response';
      btn.style.background = '';
    }, 3000);
  }
}
