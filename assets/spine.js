/* =========================================================
   SPINE — shared behaviour for every page
   ========================================================= */

/* ---------- Progress hairline ---------- */
(function(){
  var bar = document.getElementById('progress');
  if (!bar) return;
  var ticking = false;

  function update(){
    var y   = window.scrollY || document.documentElement.scrollTop;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
    ticking = false;
  }

  window.addEventListener('scroll', function(){
    if (!ticking){ window.requestAnimationFrame(update); ticking = true; }
  }, { passive:true });

  update();
})();

/* ---------- Carousel (runs only when present) ---------- */
(function(){
  var elFolio    = document.getElementById('cFolio');
  var elName     = document.getElementById('cName');
  var elNext     = document.getElementById('cNext');
  var elNextName = document.getElementById('cNextName');
  if (!elFolio || !elName || !elNext || !elNextName) return;

  var panels = Array.prototype.slice.call(
    document.querySelectorAll('.project-panel')
  );
  if (!panels.length) return;

  var projects = panels.map(function(p){
    return {
      name: p.getAttribute('data-name') || 'Untitled',
      href: p.getAttribute('data-href') || '#'
    };
  });

  var current = 0;

  function pad(n){ return String(n).padStart(2, '0'); }

  function render(){
    var next = (current + 1) % projects.length;

    elFolio.textContent    = pad(current + 1) + ' / ' + pad(projects.length);
    elName.textContent     = projects[current].name;
    elName.href            = projects[current].href;   /* clickable title */
    elNextName.textContent = projects[next].name;

    panels.forEach(function(p, i){
      p.classList.toggle('is-active', i === current);
    });
  }

  function advance(step){
    current = (current + step + projects.length) % projects.length;
    render();
  }

  elNext.addEventListener('click', function(){ advance(1); });

  document.addEventListener('keydown', function(e){
    var tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea') return;
    if (e.key === 'ArrowRight'){ advance(1); }
    if (e.key === 'ArrowLeft'){  advance(-1); }
  });

  render();
})();