const dropdownItems = [...document.querySelectorAll('.category-item')];
const dropdownTriggers = [...document.querySelectorAll('.dropdown-trigger')];
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const mobilePanel = document.querySelector('.mobile-category-panel');
const searchToggle = document.querySelector('.search-toggle');
const searchInput = document.querySelector('#toolSearch');
const cards = [...document.querySelectorAll('.tool-card')];
const resultCount = document.querySelector('#resultCount');
const emptyState = document.querySelector('#emptyState');

function closeDropdowns(except = null) {
  dropdownItems.forEach((item) => {
    if (item !== except) {
      item.classList.remove('open');
      item.querySelector('.dropdown-trigger')?.setAttribute('aria-expanded', 'false');
    }
  });
}

dropdownTriggers.forEach((trigger) => {
  trigger.addEventListener('click', (event) => {
    event.stopPropagation();
    const item = trigger.closest('.category-item');
    const willOpen = !item.classList.contains('open');
    closeDropdowns(item);
    item.classList.toggle('open', willOpen);
    trigger.setAttribute('aria-expanded', String(willOpen));
  });
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.category-item')) closeDropdowns();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeDropdowns();
});

mobileMenuButton?.addEventListener('click', () => {
  const isOpen = mobilePanel.classList.toggle('open');
  mobilePanel.setAttribute('aria-hidden', String(!isOpen));
  mobileMenuButton.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.mobile-category-title').forEach((button) => {
  button.addEventListener('click', () => {
    const target = document.getElementById(button.dataset.mobileTarget);
    const isOpen = target.classList.toggle('open');
    button.querySelector('span').textContent = isOpen ? '−' : '+';
  });
});

searchToggle?.addEventListener('click', () => {
  searchInput.focus();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

function filterTools() {
  const query = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  cards.forEach((card) => {
    const matches = card.dataset.name.toLowerCase().includes(query) || card.dataset.category.toLowerCase().includes(query);
    card.hidden = !matches;
    if (matches) visibleCount += 1;
  });

  resultCount.textContent = `${visibleCount}개 도구`;
  emptyState.hidden = visibleCount !== 0;
}

searchInput.addEventListener('input', filterTools);

document.querySelectorAll('a[href="#"]').forEach((link) => {
  link.addEventListener('click', (event) => event.preventDefault());
});

filterTools();
