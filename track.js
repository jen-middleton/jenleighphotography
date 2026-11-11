// Google Analytics click tracking (Jen 2026-11-10). Named events so she can mark them as key events in GA4.
(function () {
  function send(name, params) { if (window.gtag) gtag('event', name, params); }
  if (/^\/thanks(\.html)?\/?$/.test(location.pathname)) send('generate_lead', { form: 'inquiry' });
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a, button');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    var p = { button_text: (a.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 80), link_url: href,
              where: a.closest('nav, header') ? 'menu' : a.closest('footer') ? 'footer' : 'page' };
    if (/square\.site|squareup\.com/.test(href)) send('book_click', p);
    else if (/instagram\.com/.test(href)) send('instagram_click', p);
    else if (/^\/?inquire/.test(href) || /jenleighphotography\.com\/inquire/.test(href)) send('inquire_click', p);
    else if (/^mailto:/.test(href)) send('email_click', p);
    else if (/^tel:/.test(href)) send('phone_click', p);
    else if (a.matches('.btn, button')) send('button_click', p);
  }, true);
})();
