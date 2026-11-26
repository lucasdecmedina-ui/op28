(() => {
  'use strict';
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  const header = document.querySelector('.header');
  const closeMenu = () => { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Abrir menu'); };
  menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; nav.classList.toggle('open', open); menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu'); });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); menu.focus(); } });
  document.addEventListener('click', event => { if (!header.contains(event.target)) closeMenu(); });
  matchMedia('(min-width: 801px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
  const updateHeader = () => header.classList.toggle('scrolled', scrollY > 20);
  addEventListener('scroll', updateHeader, {passive: true}); updateHeader();
  const revealItems = document.querySelectorAll('.reveal');
  if (!reducedMotion && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('js-motion');
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), {threshold: 0.08});
    revealItems.forEach((item, index) => { if (item.closest('.quotes, .modalities-grid')) item.style.transitionDelay = `${(index % 3) * 80}ms`; observer.observe(item); });
  }
  const whatsappUrl = interest => 'https://wa.me/5513988324334?text=' + encodeURIComponent(`Olá, equipe OP28! Vim pelo site e gostaria de saber mais sobre ${interest}. Podem me informar os horários, a disponibilidade e os valores?`);
  document.querySelectorAll('[data-contact]').forEach(link => { link.href = whatsappUrl(link.dataset.contact); });
  document.querySelector('#contact-form').addEventListener('submit', event => { event.preventDefault(); window.open(whatsappUrl(document.querySelector('#interest').value), '_blank', 'noopener,noreferrer'); });
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(tab => { const selected = tab === button; tab.classList.toggle('active', selected); tab.setAttribute('aria-pressed', String(selected)); });
    document.querySelectorAll('[data-category]').forEach(activity => { activity.hidden = filter !== 'all' && activity.dataset.category !== filter; if (!activity.hidden) activity.classList.add('visible'); });
    document.querySelector('.modalities-grid').classList.toggle('filtered', filter !== 'all');
  }));
  document.querySelector('#year').textContent = new Date().getFullYear();
})();
