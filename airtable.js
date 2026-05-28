var SUBMIT_URL = 'https://script.google.com/macros/s/AKfycbxCE8NeQCKFThpxwmhzUvFUGjLOjRmDUMwiTc92vQE5tK8JzT15QoCgQOlEy_bpD_hQ/exec';

function requireStudent() {
  var name = localStorage.getItem('ux_student_name');
  var email = localStorage.getItem('ux_student_email');
  if (!name || !email) {
    window.location.href = 'welcome.html';
  }
  return { name: name, email: email };
}

function submitToAirtable(lesson, activity, response) {
  var student = requireStudent();
  var params = new URLSearchParams({
    studentName: student.name,
    email: student.email,
    lesson: lesson,
    activity: activity,
    response: response
  });
  var url = SUBMIT_URL + '?' + params.toString();
  return fetch(url, { method: 'GET', mode: 'no-cors' });
}

function saveActivity(btn, lesson, activity, textareaId) {
  var textarea = document.getElementById(textareaId);
  var response = textarea ? textarea.value.trim() : '';

  if (!response) {
    var orig = btn.textContent;
    btn.textContent = 'Please write something first';
    btn.style.background = '#b06820';
    setTimeout(function() {
      btn.textContent = orig;
      btn.style.background = '';
    }, 2000);
    return;
  }

  btn.textContent = 'Saving...';
  btn.disabled = true;

  submitToAirtable(lesson, activity, response).then(function() {
    btn.textContent = 'Saved ✓';
    btn.style.background = '#2a6642';
    if (textarea) textarea.style.opacity = '0.6';
  }).catch(function() {
    btn.textContent = 'Saved ✓';
    btn.style.background = '#2a6642';
    if (textarea) textarea.style.opacity = '0.6';
  });
}
