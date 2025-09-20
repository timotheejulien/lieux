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

       // On vide et on réinsère dans l’ordre
       container.innerHTML = "";
       items.forEach(item => container.appendChild(item));
   });
});