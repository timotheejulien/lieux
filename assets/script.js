/* SEARCH MODAL — WORKS ON ALL PAGES */
document.addEventListener('DOMContentLoaded', () => {
   const modal     = document.getElementById('search-modal');
   const backdrop  = document.getElementById('search-modal-backdrop');
   const input     = document.getElementById('search-input-modal');
   const clearBtn  = document.getElementById('search-modal-clear');
   const btnOpen   = document.getElementById('btn-open-search-modal');
   const btnCancel = document.getElementById('search-modal-cancel');

   if (!modal || !btnOpen) return;

   function esc(str) {
      return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
   }

   function renderSuggestions(val) {
      const list = document.getElementById('search-suggestions');
      if (!list) return;
      if (!val || !window.searchData) { list.innerHTML = ''; return; }

      const q       = val.toLowerCase();
      const places  = (window.searchData.places  || []).filter(p => p.title.toLowerCase().includes(q)).slice(0, 5);
      const voyages = (window.searchData.voyages || []).filter(v => v.title.toLowerCase().includes(q)).slice(0, 3);

      if (places.length === 0 && voyages.length === 0) { list.innerHTML = ''; return; }

      const both = places.length > 0 && voyages.length > 0;
      let html = '';

      if (places.length > 0) {
         if (both) html += `<li class="search-suggestion-label" role="presentation">Lieux</li>`;
         places.forEach(p => {
            html += `<li role="option"><a class="search-suggestion-item" href="${p.url}">${esc(p.title)}</a></li>`;
         });
      }
      if (voyages.length > 0) {
         if (both) html += `<li class="search-suggestion-label" role="presentation">Voyages</li>`;
         voyages.forEach(v => {
            html += `<li role="option"><a class="search-suggestion-item search-suggestion-item--voyage" href="${v.url}">${esc(v.title)}</a></li>`;
         });
      }
      list.innerHTML = html;
   }

   function openModal() {
      modal.classList.add('open');
      backdrop.classList.add('open');
      backdrop.removeAttribute('aria-hidden');
      document.body.classList.add('modal-open');
      setTimeout(() => {
         input.focus();
         renderSuggestions(input.value.trim());
      }, 100);
   }

   function closeModal() {
      modal.classList.remove('open');
      backdrop.classList.remove('open');
      backdrop.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
   }

   btnOpen.addEventListener('click', openModal);
   btnCancel.addEventListener('click', closeModal);
   backdrop.addEventListener('click', closeModal);

   document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
   });

   input.addEventListener('input', function () {
      const val = this.value.trim();
      clearBtn.style.display = val ? 'flex' : 'none';
      renderSuggestions(val);
      if (typeof window.onSearchModalInput === 'function') {
         window.onSearchModalInput(val);
      }
   });

   input.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
         const val = input.value.trim();
         if (document.getElementById('map')) {
            closeModal();
         } else {
            window.location.href = val ? `/?q=${encodeURIComponent(val)}` : '/';
         }
      }
   });

   clearBtn.addEventListener('click', () => {
      input.value = '';
      input.focus();
      clearBtn.style.display = 'none';
      renderSuggestions('');
      if (typeof window.onSearchModalInput === 'function') {
         window.onSearchModalInput('');
      }
   });
});

function mailTo() {
	var $mailToEmail = "email@timotheejulien.fr";
	var $mailToSubject = "Notes caséologiques : prise de contact";
	window.location.href='mailto:'+$mailToEmail+'?subject='+$mailToSubject;
}

// SORT BY ALPHABETICAL ANY UL LIST WITH "sort-by-alphabetical" CLASS
document.addEventListener("DOMContentLoaded", function() {
   document.querySelectorAll(".sort-by-alphabetical").forEach(container => {
       // On récupère uniquement les enfants directs
       let items = Array.from(container.children);

       // On trie en fonction du texte visible
       items.sort((a, b) => {
           let textA = a.textContent.trim();
           let textB = b.textContent.trim();
           return textA.localeCompare(textB, 'fr', { sensitivity: 'base' });
       });

       // On vide et on réinsère dans l'ordre
       container.innerHTML = "";
       items.forEach(item => container.appendChild(item));
   });

   // LAZY LOADING FUNCTIONALITY
   initLazyLoading();
});

// Lazy loading functionality
function initLazyLoading() {
   // Configuration de l'Intersection Observer
   const imageObserver = new IntersectionObserver((entries, observer) => {
       entries.forEach(entry => {
           if (entry.isIntersecting) {
               const element = entry.target;
               
               // Pour les images normales
               if (element.classList.contains('lazy-load')) {
                   const src = element.getAttribute('data-src');
                   if (src) {
                       element.src = src;
                       element.classList.add('loaded');
                       observer.unobserve(element);
                   }
               }
               
               // Pour les images de fond
               if (element.classList.contains('lazy-bg')) {
                   const bgImage = element.getAttribute('data-bg');
                   if (bgImage) {
                       element.style.backgroundImage = `url('${bgImage}')`;
                       element.classList.add('loaded');
                       observer.unobserve(element);
                   }
               }
           }
       });
   }, {
       root: null,
       rootMargin: '50px',
       threshold: 0.1
   });

   // Observer toutes les images lazy
   document.querySelectorAll('.lazy-load, .lazy-bg').forEach(img => {
       imageObserver.observe(img);
   });
}