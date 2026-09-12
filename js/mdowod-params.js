// Uniwersalny skrypt do przekazywania parametrów mDowodu między stronami
(function() {
    'use strict';
    
    // Funkcja do pobrania zapisanych parametrów z sessionStorage
    function getSavedParams() {
        const savedQuery = sessionStorage.getItem('mdowod_query');
        return savedQuery || '';
    }
    
    // Funkcja do aktualizacji wszystkich linków do dowodnowy.html
    function updateDowodLinks() {
        const savedParams = getSavedParams();
        if (!savedParams) return;
        
        // Znajdź wszystkie linki prowadzące do dowodnowy.html
        const links = document.querySelectorAll('a[href*="dowodnowy.html"]');
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href && !href.includes('?')) {
                link.setAttribute('href', href + '?' + savedParams);
            }
        });
        
        // Znajdź wszystkie elementy z onclick zawierającym dowodnowy.html
        const clickableElements = document.querySelectorAll('[onclick*="dowodnowy.html"]');
        clickableElements.forEach(element => {
            const onclick = element.getAttribute('onclick');
            if (onclick && !onclick.includes('?')) {
                const newOnclick = onclick.replace(
                    'dowodnowy.html',
                    'dowodnowy.html?' + savedParams
                );
                element.setAttribute('onclick', newOnclick);
            }
        });
    }
    
    // Uruchom aktualizację linków gdy strona się załaduje
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateDowodLinks);
    } else {
        updateDowodLinks();
    }
    
    // Obserwuj zmiany w DOM (dla dynamicznie dodawanych elementów)
    const observer = new MutationObserver(updateDowodLinks);
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
})();
