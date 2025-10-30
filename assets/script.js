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