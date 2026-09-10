/* Musterprint – small progressive-enhancement script.
   Handles: service detail modals (with hash routing), mobile nav toggle. */

(function () {
	'use strict';

	var body = document.body;

	/* ---------------- service modals ---------------- */

	function openModal(id, pushHash) {
		var modal = document.getElementById('modal-' + id);
		if (!modal) return;
		modal.setAttribute('aria-hidden', 'false');
		body.classList.add('modal-open');
		if (pushHash && location.hash !== '#' + id) {
			history.pushState({ modal: id }, '', '#' + id);
		}
		var close = modal.querySelector('.modal__close');
		if (close) close.focus();
	}

	function closeModals(restoreHash) {
		var open = document.querySelectorAll('.modal[aria-hidden="false"]');
		if (!open.length) return;
		open.forEach(function (m) { m.setAttribute('aria-hidden', 'true'); });
		body.classList.remove('modal-open');
		if (restoreHash && location.hash) {
			history.replaceState(null, '', location.pathname);
		}
	}

	document.querySelectorAll('[data-modal-open]').forEach(function (trigger) {
		trigger.addEventListener('click', function (e) {
			e.preventDefault();
			openModal(trigger.getAttribute('data-modal-open'), true);
		});
	});

	document.querySelectorAll('.modal [data-modal-close]').forEach(function (btn) {
		btn.addEventListener('click', function () { closeModals(true); });
	});

	document.addEventListener('keydown', function (e) {
		if (e.key === 'Escape') closeModals(true);
	});

	window.addEventListener('popstate', function () {
		var slug = location.hash.replace('#', '');
		if (slug && document.getElementById('modal-' + slug)) {
			openModal(slug, false);
		} else {
			closeModals(false);
		}
	});

	// deep link on load
	(function () {
		var slug = location.hash.replace('#', '');
		if (slug && document.getElementById('modal-' + slug)) {
			openModal(slug, false);
		}
	})();

	/* ---------------- mobile nav ---------------- */

	var nav = document.getElementById('main-nav');
	var toggle = document.querySelector('.nav-toggle');
	var navClose = document.querySelector('.nav-close');

	function setNav(open) {
		if (!nav) return;
		nav.setAttribute('data-open', open ? 'true' : 'false');
		if (navClose) navClose.setAttribute('data-show', open ? 'true' : 'false');
	}

	if (toggle) toggle.addEventListener('click', function () { setNav(true); });
	if (navClose) navClose.addEventListener('click', function () { setNav(false); });
	if (nav) {
		nav.querySelectorAll('a').forEach(function (link) {
			link.addEventListener('click', function () { setNav(false); });
		});
	}
})();
