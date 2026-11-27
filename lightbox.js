// Vergrößert Screenshots beim Anklicken (Taste Esc oder Klick schließt).
(function () {
  var imgs = document.querySelectorAll('.shots img, .feature img');
  if (!imgs.length) return;
  var box = document.createElement('div');
  box.className = 'lb';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.setAttribute('aria-label', 'Vergrößertes Bild');
  box.hidden = true;
  box.innerHTML = '<button type="button" class="lb-x" aria-label="Schließen">×</button><img alt="">';
  document.body.appendChild(box);
  var big = box.querySelector('img');
  var last = null;
  function open(el) {
    last = el;
    big.src = el.currentSrc || el.src;
    big.alt = el.alt || '';
    box.hidden = false;
    document.body.style.overflow = 'hidden';
    box.querySelector('button').focus();
  }
  function close() {
    box.hidden = true;
    big.removeAttribute('src');
    document.body.style.overflow = '';
    if (last) last.focus();
  }
  imgs.forEach(function (el) {
    el.classList.add('zoomable');
    el.tabIndex = 0;
    el.setAttribute('role', 'button');
    el.title = 'Zum Vergrößern anklicken';
    el.addEventListener('click', function () { open(el); });
    el.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(el); } });
  });
  box.addEventListener('click', close);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !box.hidden) close(); });
})();
