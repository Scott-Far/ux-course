// ─── COURSE NAVIGATION ────────────────────────────────────────
// Update this file whenever modules or lessons change.
// Every lesson page loads this file to build its sidebar.
// ─────────────────────────────────────────────────────────────

var COURSE_NAV = [
  {
    label: 'Navigation',
    items: [
      { type: 'link', href: 'index.html', label: '📊 My Dashboard' }
    ]
  },
  {
    label: 'Module 1 — The mindset',
    items: [
      { type: 'lesson', href: 'lesson-1-1.html', label: '1.1 The UX Mindset' },
      { type: 'lesson', href: 'lesson-1-2.html', label: '1.2 Listening vs. following' },
      { type: 'lesson', href: 'lesson-1-3.html', label: '1.3 Design Thinking' },
      { type: 'lesson', href: 'lesson-1-4.html', label: '1.4 The trim tab' },
      { type: 'project', href: 'project-1.html', label: '★ Module 1 Project' }
    ]
  },
  {
    label: 'Module 2 — Creative and good UX design',
    items: [
      { type: 'lesson', href: 'lesson-2-1.html', label: '2.1 Open and closed modes' },
      { type: 'lesson', href: 'lesson-2-2.html', label: '2.2 The conditions for creativity' },
      { type: 'lesson', href: 'lesson-2-3.html', label: '2.3 What good UX design looks like' },
      { type: 'project', href: 'project-2.html', label: '★ Module 2 Project' }
    ]
  },
  {
    label: 'Module 3 — Information Architecture',
    items: [
      { type: 'lesson', href: 'lesson-3-1.html', label: '3.1 What IA is and why it matters' },
      { type: 'lesson', href: 'lesson-3-2.html', label: '3.2 Mental models, taxonomy, and sitemaps' },
      { type: 'lesson', href: 'lesson-3-3.html', label: '3.3 Wayfinding and designing for change' },
      { type: 'lesson', href: 'lesson-3-4.html', label: '3.4 IA in practice' },
      { type: 'project', href: 'project-3.html', label: '★ Module 3 Project' }
    ]
  },
  {
    label: 'Modules 4–8',
    items: [
      { type: 'coming', label: 'Module 4 — Patterns and Properties' },
      { type: 'coming', label: 'Module 5 — Research Methods' },
      { type: 'coming', label: 'Module 6 — Interviewing and Synthesis' },
      { type: 'coming', label: 'Module 7 — Portfolio' },
      { type: 'coming', label: 'Module 8 — Capstone' }
    ]
  }
];

function buildNav(currentPage) {
  var sidebar = document.querySelector('.sidebar');
  if (!sidebar) return;

  var html = '';

  COURSE_NAV.forEach(function(section) {
    html += '<div class="sidebar-section">';
    html += '<div class="sidebar-label">' + section.label + '</div>';

    section.items.forEach(function(item) {
      if (item.type === 'link') {
        html += '<a class="module-item" href="' + item.href + '">';
        html += '<div class="module-name">' + item.label + '</div>';
        html += '</a>';
      } else if (item.type === 'lesson' || item.type === 'project') {
        var isActive = item.href === currentPage;
        html += '<a class="lesson-item' + (isActive ? ' active' : '') + '" href="' + item.href + '">';
        html += '<div class="lesson-dot' + (isActive ? ' active' : '') + '"></div>';
        html += '<div class="lesson-name">' + item.label + '</div>';
        html += '</a>';
      } else if (item.type === 'coming') {
        html += '<div class="module-item">';
        html += '<div class="module-name">' + item.label + '</div>';
        html += '<div class="module-meta">coming soon</div>';
        html += '</div>';
      }
    });

    html += '</div>';
  });

  sidebar.innerHTML = html;
}
