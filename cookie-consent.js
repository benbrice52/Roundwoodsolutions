/* Roundwood Solutions cookie consent.
   Google tags (via GTM) start with consent denied (see the inline snippet before GTM in each page's <head>).
   This file shows the banner, stores the visitor's choice and updates Google consent mode. */
(function () {
  var KEY = 'rw_consent';

  function getChoice() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function saveChoice(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  function gtag() { window.dataLayer = window.dataLayer || []; window.dataLayer.push(arguments); }
  function applyChoice(v) {
    var s = v === 'granted' ? 'granted' : 'denied';
    gtag('consent', 'update', { ad_storage: s, ad_user_data: s, ad_personalization: s, analytics_storage: s });
  }

  var css = '' +
    '#rw-cookie{position:fixed;left:0;right:0;bottom:0;z-index:9999;background:#1A2E12;color:#F9F7F2;' +
    'font-family:sans-serif;font-size:14px;line-height:1.5;box-shadow:0 -2px 12px rgba(0,0,0,.25);}' +
    '#rw-cookie .rw-in{max-width:1100px;margin:0 auto;padding:16px 20px;display:flex;align-items:center;gap:20px;}' +
    '#rw-cookie p{margin:0;flex:1;}' +
    '#rw-cookie a{color:#D4EDBE;text-decoration:underline;}' +
    '#rw-cookie .rw-btns{display:flex;gap:10px;flex-shrink:0;}' +
    '#rw-cookie button{font:inherit;font-weight:600;cursor:pointer;border:2px solid #F9F7F2;background:#F9F7F2;' +
    'color:#1A2E12;border-radius:6px;padding:9px 22px;min-width:96px;}' +
    '#rw-cookie button:hover,#rw-cookie button:focus{background:#D4EDBE;border-color:#D4EDBE;outline:none;}' +
    '@media(max-width:640px){#rw-cookie .rw-in{flex-direction:column;align-items:stretch;gap:12px;padding:14px 16px;}' +
    '#rw-cookie .rw-btns button{flex:1;}}' +
    '.rw-cookie-link{cursor:pointer;}';

  function show() {
    if (document.getElementById('rw-cookie')) return;
    if (!document.getElementById('rw-cookie-css')) {
      var st = document.createElement('style'); st.id = 'rw-cookie-css'; st.textContent = css;
      document.head.appendChild(st);
    }
    var bar = document.createElement('div');
    bar.id = 'rw-cookie';
    bar.setAttribute('role', 'region');
    bar.setAttribute('aria-label', 'Cookie choice');
    bar.innerHTML = '<div class="rw-in">' +
      '<p>We’d like to use cookies to measure how well our Google ads work. They’re only set if you accept. ' +
      '<a href="/privacy-policy">Privacy policy</a></p>' +
      '<div class="rw-btns"><button type="button" data-choice="denied">Reject</button>' +
      '<button type="button" data-choice="granted">Accept</button></div></div>';
    bar.addEventListener('click', function (e) {
      var c = e.target && e.target.getAttribute && e.target.getAttribute('data-choice');
      if (!c) return;
      saveChoice(c);
      applyChoice(c);
      bar.parentNode.removeChild(bar);
    });
    document.body.appendChild(bar);
  }

  function addSettingsLink() {
    var target = document.querySelector('.footer-links') || document.querySelector('.footer-bottom');
    if (!target || target.querySelector('.rw-cookie-link')) return;
    var a = document.createElement('a');
    a.href = '#';
    a.className = 'rw-cookie-link';
    a.textContent = 'Cookie settings';
    a.addEventListener('click', function (e) { e.preventDefault(); show(); });
    target.appendChild(a);
  }

  function init() {
    addSettingsLink();
    if (!getChoice()) show();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
