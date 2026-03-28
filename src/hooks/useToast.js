export function showToast(msg, emoji = '✅') {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>${emoji}</span>${msg}`;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('out');
    setTimeout(() => toast.remove(), 350);
  }, 3200);
}

export function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const menu = document.getElementById('mobile-menu');
  const ham  = document.getElementById('hamburger');
  if (menu?.classList.contains('open')) {
    menu.classList.remove('open');
    ham?.classList.remove('open');
  }
}
