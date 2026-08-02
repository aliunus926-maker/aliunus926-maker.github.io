$(document).ready(function () {

  $('#menu').click(function () {
    $(this).toggleClass('fa-times');
    $('.navbar').toggleClass('nav-toggle');
  });

  $('.navbar a').on('click', function () {
    $('#menu').removeClass('fa-times');
    $('.navbar').removeClass('nav-toggle');
  });

  $(window).on('scroll load', function () {
    if (window.scrollY > 60) {
      document.querySelector('#scroll-top').classList.add('active');
    } else {
      document.querySelector('#scroll-top').classList.remove('active');
    }
  });

  // ---- scrollspy: highlight the nav link for the section in view ----
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.navbar ul li a');
  $(window).on('scroll load', function () {
    var scrollPos = window.scrollY + 120;
    sections.forEach(function (sec) {
      if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sec.id) link.classList.add('active');
        });
      }
    });
  });
});

/* ===== SKILLS — rendered from skills.json ===== */
function getSkills() {
  return fetch('skills.json').then(function (r) { return r.json(); });
}
function showSkills(skills) {
  var container = document.getElementById('skillsContainer');
  if (!container) return;
  var groups = {};
  skills.forEach(function (s) {
    if (!groups[s.group]) groups[s.group] = [];
    groups[s.group].push(s);
  });
  var html = '';
  Object.keys(groups).forEach(function (groupName) {
    html += '<h3 class="group-title">' + groupName + '</h3><div class="row">';
    groups[groupName].forEach(function (s) {
      html += '<div class="bar"><div class="info"><i class="' + s.icon + '"></i><span>' + s.name + '</span></div></div>';
    });
    html += '</div>';
  });
  container.innerHTML = html;
}
getSkills().then(showSkills).catch(function (err) { console.error('Could not load skills.json', err); });

/* ===== WORK PREVIEW — rendered from projects.json (top items only; full list lives on /projects) ===== */
function getProjects() {
  return fetch('projects.json').then(function (r) { return r.json(); });
}
function showWorkPreview(projects) {
  var container = document.getElementById('workContainer');
  if (!container) return;
  var html = '';
  projects.forEach(function (p) {
    html += '' +
      '<div class="box tilt">' +
        '<img draggable="false" src="./assets/images/projects/' + p.image + '.svg" alt="' + p.name + '">' +
        '<div class="content">' +
          '<div class="tag"><h3>' + p.name + '</h3></div>' +
          '<div class="desc">' +
            '<p>' + p.desc + '</p>' +
          '</div>' +
        '</div>' +
      '</div>';
  });
  container.innerHTML = html;
  if (typeof VanillaTilt !== "undefined") {
    VanillaTilt.init(container.querySelectorAll('.tilt'), { max: 12, speed: 400, glare: false });
  }
}
getProjects().then(showWorkPreview).catch(function (err) { console.error('Could not load projects.json', err); });

/* ===== ANIMATED STAT COUNTERS ===== */
(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var done = false;
  function animate() {
    if (done) return;
    var strip = document.querySelector('.stats-strip');
    if (!strip) return;
    var rect = strip.getBoundingClientRect();
    if (rect.top > window.innerHeight * 0.85) return;
    done = true;
    document.querySelectorAll('.stat-card .num').forEach(function (el) {
      var target = parseInt(el.getAttribute('data-target'), 10) || 0;
      var suffix = el.getAttribute('data-suffix') || '';
      var range = el.getAttribute('data-range');
      if (reduceMotion) { el.textContent = (range || target) + suffix; return; }
      var start = null, duration = 1400;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (range && p > 0.97 ? range : Math.floor(eased * target)) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }
  window.addEventListener('scroll', animate, { passive: true });
  window.addEventListener('load', animate);
})();

/* ===== LANGUAGE BARS ===== */
(function () {
  var done = false;
  function fill() {
    if (done) return;
    var card = document.querySelector('.lang-card');
    if (!card) return;
    var rect = card.getBoundingClientRect();
    if (rect.top > window.innerHeight * 0.85) return;
    done = true;
    document.querySelectorAll('.lang-card .fill').forEach(function (f) {
      f.style.width = f.getAttribute('data-width');
    });
  }
  window.addEventListener('scroll', fill, { passive: true });
  window.addEventListener('load', fill);
})();

/* ===== CONTACT FORM — builds a mailto link (no backend/API keys required) ===== */
var contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = contactForm.querySelector('[name=name]').value.trim();
    var email = contactForm.querySelector('[name=email]').value.trim();
    var phone = contactForm.querySelector('[name=phone]').value.trim();
    var message = contactForm.querySelector('[name=message]').value.trim();

    var subject = encodeURIComponent('Portfolio contact from ' + name);
    var bodyLines = [message, '', '—', 'From: ' + name + ' (' + email + ')', phone ? 'Phone: ' + phone : ''].filter(Boolean);
    var body = encodeURIComponent(bodyLines.join('\n'));

    window.location.href = 'mailto:aliunus926@gmail.com?subject=' + subject + '&body=' + body;
  });
}

/* ===== visibility tab-title swap ===== */
document.addEventListener('visibilitychange', function () {
  if (document.visibilityState === 'visible') {
    document.title = 'Portfolio | Younus Ali';
    $('#favicon').attr('href', './assets/images/favicon.svg');
  } else {
    document.title = 'Come Back To Portfolio';
    $('#favicon').attr('href', './assets/images/favhand.svg');
  }
});

/* ===== disable common devtools shortcuts =====
   Included for template fidelity. This does not meaningfully block anyone —
   it's easily bypassed — so it's a cosmetic deterrent only, not a security measure. */
document.onkeydown = function (e) {
  if (e.keyCode == 123) return false;
  if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) return false;
  if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) return false;
  if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) return false;
  if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) return false;
};
