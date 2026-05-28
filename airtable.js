var FORM_ACTION = 'https://docs.google.com/forms/d/e/1FAIpQLSf_adIaBigbeW8C2lC5o-9txs2sCztxtdPFgLcr9hutBDEh0Q/formResponse';

var FIELD_IDS = {
  studentName: 'entry.2108948697',
  email:       'entry.1519332547',
  lesson:      'entry.845222426',
  activity:    'entry.1119830879',
  response:    'entry.751849130'
};

function requireStudent() {
  var name  = localStorage.getItem('ux_student_name');
  var email = localStorage.getItem('ux_student_email');
  if (!name || !email) {
    window.location.href = 'welcome.html';
  }
  return { name: name, email: email };
}

function submitToAirtable(lesson, activity, response) {
  var student = requireStudent();
  var body = new FormData();
  body.append(FIELD_IDS.studentName, student.name);
  body.append(FIELD_IDS.email,       student.email);
  body.append(FIELD_IDS.lesson,      lesson);
  body.append(FIELD_IDS.activity,    activity);
  body.append(FIELD_IDS.response,    response);

  return fetch(FORM_ACTION, {
    method: 'POST',
    mode:   'no-cors',
    body:   body
  });
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
