// Navigation helper — used by all lesson pages
function goTo(page) {
  window.location.href = page;
}

// Mark active sidebar link based on current page
document.addEventListener('DOMContentLoaded', function() {
  const current = window.location.pathname.split('/').pop();
  document.querySelectorAll('.lesson-item[data-page]').forEach(function(el) {
    if (el.getAttribute('data-page') === current) {
      el.classList.add('active');
      el.querySelector('.lesson-dot').classList.add('active');
    }
  });
});
