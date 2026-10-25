// Review-only contextual media. Paths are relative to the preview document.
const esc=s=>String(s||'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
export function renderReviewMedia(media){
 if(!media?.caption)return '';
 return `<figure class="review-career-figure"><img src="${esc(media.src)}" alt="${esc(media.alt)}"><figcaption><p>${esc(media.caption)}</p><p>Photo: <a href="${esc(media.sourceUrl)}" target="_blank" rel="noopener noreferrer">${esc(media.credit)}</a> · <a href="${esc(media.licenseUrl)}" target="_blank" rel="noopener noreferrer">${esc(media.license)}</a>${media.notice?' · '+esc(media.notice):''}</p></figcaption></figure>`;
}
