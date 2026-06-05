(function () {
  'use strict';

  var ANCHOR = 'list-split-accordion';
  var built  = false;

  /* ── Helpers ──────────────────────────────────────────────── */

  function getText(el) {
    return el ? el.textContent.trim() : '';
  }

  function getAttr(el, attr) {
    return (el && el.getAttribute(attr)) || '';
  }

  function getImgSrc(imgEl) {
    if (!imgEl) return '';
    var src = imgEl.getAttribute('src') || imgEl.getAttribute('data-src') || '';
    return src ? src.split('?')[0] + '?format=1000w' : '';
  }

  /* ── Alternating-layer crossfade ──────────────────────────── */

  var activeLayer = 'a';
  var activeImage = '';

  function swapImage(newSrc) {
    if (!newSrc) return;
    var cleanSrc = newSrc.split('?')[0];
    if (activeImage === cleanSrc) return;
    activeImage = cleanSrc;

    var a = document.getElementById('wga-bg-a');
    var b = document.getElementById('wga-bg-b');
    if (!a || !b) return;

    var incoming = activeLayer === 'a' ? b : a;
    var outgoing = activeLayer === 'a' ? a : b;

    incoming.style.backgroundImage = 'url(' + newSrc + ')';
    requestAnimationFrame(function () {
      incoming.style.opacity = '1';
      outgoing.style.opacity = '0';
      activeLayer = activeLayer === 'a' ? 'b' : 'a';
    });
  }

  /* ── Image overlay text — brief fade on update ────────────── */

  var _flickerTimers = {};

  function flickerText(el, newText) {
    if (!el || el.textContent === newText) return;
    var id = el.id || el.className;
    clearTimeout(_flickerTimers[id]);
    el.style.opacity = '0';
    _flickerTimers[id] = setTimeout(function () {
      el.textContent  = newText;
      el.style.opacity = '';
    }, 150);
  }

  function updateImage(item) {
    swapImage(item.imgSrc);
    flickerText(document.getElementById('wga-image-prehead'), item.numStr);
    flickerText(document.getElementById('wga-image-title'),   item.title);
    flickerText(document.getElementById('wga-image-bg-num'),  item.numStr);
  }

  /* ── Read Squarespace layout values ───────────────────────── */

  function readSquarespaceLayout(section, ul) {
    var result = {};

    var listDiv      = section.querySelector('.user-items-list');
    result.padTop    = (listDiv && listDiv.style.paddingTop)    || '6.6vmax';
    result.padBottom = (listDiv && listDiv.style.paddingBottom) || '6.6vmax';

    var cs  = window.getComputedStyle(ul);
    var padL = cs.paddingLeft;
    var padR = cs.paddingRight;
    var maxW = cs.maxWidth;

    result.padLeft  = (padL && padL !== '0px') ? padL : null;
    result.padRight = (padR && padR !== '0px') ? padR : null;
    result.maxWidth = (maxW && maxW !== 'none' && maxW !== '0px') ? maxW : null;

    var titleProp = cs.getPropertyValue('--title-font-size-value').trim();
    var descProp  = cs.getPropertyValue('--body-font-size-value').trim();

    if (titleProp) {
      result.titleFont = titleProp + 'rem';
    } else {
      var titleEl = ul.querySelector('.list-item-content__title');
      if (titleEl) result.titleFont = window.getComputedStyle(titleEl).fontSize;
    }

    if (descProp) {
      result.descFont = descProp + 'rem';
    } else {
      var descEl = ul.querySelector('.list-item-content__description p') ||
                   ul.querySelector('.list-item-content__description');
      if (descEl) result.descFont = window.getComputedStyle(descEl).fontSize;
    }

    return result;
  }

  /* ── Build ────────────────────────────────────────────────── */

  function buildLayout() {
    if (built) return;

    var section = document.querySelector('#' + ANCHOR);
    if (!section) return;
    if (section.querySelector('.wga-wrapper')) { built = true; return; }

    var ul = section.querySelector('.user-items-list-item-container');
    if (!ul) return;

    var lis = ul.querySelectorAll('.list-item');
    if (!lis.length) return;

    var layout = readSquarespaceLayout(section, ul);
    built = true;

    /* Extract item data */
    var items = Array.prototype.map.call(lis, function (li, i) {
      var titleEl = li.querySelector('.list-item-content__title');
      var descEl  = li.querySelector('.list-item-content__description');
      var btnEl   = li.querySelector('.list-item-content__button');
      var imgEl   = li.querySelector('img');
      var link    = getAttr(btnEl, 'href');
      var btnText = getText(btnEl);

      return {
        numStr:      i < 9 ? '0' + (i + 1) : String(i + 1),
        title:       getText(titleEl),
        desc:        getText(descEl),
        link:        link,
        hasRealLink: link !== '' && link !== '#' && link !== '/',
        imgSrc:      getImgSrc(imgEl),
        btnChar:     btnText || '\u2192'
      };
    });

    /* Image column */
    var imgCol = document.createElement('div');
    imgCol.className = 'wga-image';

    var bgA = document.createElement('div');
    bgA.className = 'wga-bg-layer wga-bg-a';
    bgA.id        = 'wga-bg-a';
    if (items[0].imgSrc) {
      bgA.style.backgroundImage = 'url(' + items[0].imgSrc + ')';
      activeImage = items[0].imgSrc.split('?')[0];
    }

    var bgB = document.createElement('div');
    bgB.className = 'wga-bg-layer wga-bg-b';
    bgB.id        = 'wga-bg-b';

    var overlay = document.createElement('div');
    overlay.className = 'wga-image-overlay';

    var bgNum = document.createElement('div');
    bgNum.className   = 'wga-image-bg-num';
    bgNum.id          = 'wga-image-bg-num';
    bgNum.textContent = items[0].numStr;

    var meta = document.createElement('div');
    meta.className = 'wga-image-meta';

    var prehead = document.createElement('div');
    prehead.className   = 'wga-image-prehead';
    prehead.id          = 'wga-image-prehead';
    prehead.textContent = items[0].numStr;

    var imgTitle = document.createElement('div');
    imgTitle.className   = 'wga-image-title';
    imgTitle.id          = 'wga-image-title';
    imgTitle.textContent = items[0].title;

    meta.appendChild(prehead);
    meta.appendChild(imgTitle);
    imgCol.appendChild(bgA);
    imgCol.appendChild(bgB);
    imgCol.appendChild(overlay);
    imgCol.appendChild(bgNum);
    imgCol.appendChild(meta);

    /* List column */
    var list = document.createElement('div');
    list.className = 'wga-list';

    items.forEach(function (item) {
      var row = document.createElement('a');
      row.className = 'wga-item';
      row.href      = item.hasRealLink ? item.link : '#';

      if (!item.hasRealLink) {
        row.addEventListener('click', function (e) { e.preventDefault(); });
      }

      row.innerHTML =
        '<div class="wga-item-num">'  + item.numStr + '</div>' +
        '<div class="wga-item-body">' +
          '<div class="wga-item-title">' + item.title + '</div>' +
          '<div class="wga-item-desc">'  + item.desc  + '</div>' +
        '</div>' +
        '<div class="wga-item-btn" aria-hidden="true">' + item.btnChar + '</div>';

      row.addEventListener('mouseenter', function () {
        updateImage(item);
      });

      row.addEventListener('touchstart', function () {
        if (item.hasRealLink) return;
        var isActive = this.classList.contains('wga-active');
        list.querySelectorAll('.wga-item.wga-active').forEach(function (r) {
          r.classList.remove('wga-active');
        });
        if (!isActive) {
          this.classList.add('wga-active');
          updateImage(item);
        }
      }, { passive: true });

      list.appendChild(row);
    });

    /* Wrapper */
    var wrapper = document.createElement('div');
    wrapper.className = 'wga-wrapper';

    if (layout.titleFont) wrapper.style.setProperty('--lsa-title-font', layout.titleFont);
    if (layout.descFont)  wrapper.style.setProperty('--lsa-desc-font',  layout.descFont);

    wrapper.style.paddingTop    = layout.padTop;
    wrapper.style.paddingBottom = layout.padBottom;
    if (layout.padLeft)  wrapper.style.paddingLeft  = layout.padLeft;
    if (layout.padRight) wrapper.style.paddingRight = layout.padRight;
    if (layout.maxWidth) {
      wrapper.style.maxWidth   = layout.maxWidth;
      wrapper.style.marginLeft = wrapper.style.marginRight = 'auto';
    }

    wrapper.appendChild(imgCol);
    wrapper.appendChild(list);

    var container = section.querySelector('.content-wrapper .content') ||
                    section.querySelector('.content')                   ||
                    section.querySelector('.user-items-list');

    if (!container) { built = false; return; }
    container.appendChild(wrapper);

    /* ── Open first item if --lsa-open-first is 1 ── */
    var openFirst = getComputedStyle(document.documentElement)
                      .getPropertyValue('--lsa-open-first').trim();

    if (openFirst === '1') {
      var firstRow = list.querySelector('.wga-item');
      if (firstRow) {
        firstRow.classList.add('wga-active');
        updateImage(items[0]);
      }
    }
  }

  /* ── Init ─────────────────────────────────────────────────── */

  function tryBuild() { if (!built) buildLayout(); }

  tryBuild();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tryBuild);
  }

  if (!built && typeof MutationObserver !== 'undefined') {
    var observer = new MutationObserver(function (mutations, obs) {
      var section = document.querySelector('#' + ANCHOR);
      if (section && section.querySelector('.list-item')) {
        obs.disconnect();
        tryBuild();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    setTimeout(function () { observer.disconnect(); }, 15000);
  }

})();
