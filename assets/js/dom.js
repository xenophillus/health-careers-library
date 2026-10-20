export const $ = id => document.getElementById(id);

export function esc(value) {
  const entities = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };
  return String(value).replace(/[&<>"']/g, character => entities[character]);
}

export function money(value) {
  return '$' + Number(value).toLocaleString('en-US');
}
