// STANDALONE MODE FIX - MUSI BYĆ ZAŁADOWANY JAKO PIERWSZY!
(function() {
    'use strict';
    
    // Natychmiastowa detekcja standalone
    var isStandalone = window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches;
    
    if (isStandalone) {
        console.log("🟢 STANDALONE MODE DETECTED - Intercepting ALL navigation");
        
        // KLUCZOWE: Przechwytuj kliknięcia PRZED wszystkimi innymi handlerami
        document.addEventListener('click', function(e) {
            var target = e.target;
            var depth = 0;
            
            // Idź w górę drzewa DOM szukając elementu z onclick
            while (target && depth < 10) {
                var onclick = target.getAttribute('onclick');
                
                if (onclick) {
                    // Sprawdź czy onclick zawiera window.location
                    if (onclick.indexOf('window.location') !== -1 || onclick.indexOf('.href') !== -1) {
                        // Wyciągnij URL
                        var urlMatch = onclick.match(/['"]([^'"]+\.html[^'"]*)['"]/);
                        
                        if (urlMatch && urlMatch[1]) {
                            var url = urlMatch[1];
                            
                            console.log("🔴 BLOCKED onclick - redirecting to:", url);
                            
                            // ZATRZYMAJ wszystkie eventy
                            e.preventDefault();
                            e.stopPropagation();
                            e.stopImmediatePropagation();
                            
                            // Nawiguj przez window.location (działa w standalone)
                            setTimeout(function() {
                                window.location.href = url;
                            }, 10);
                            
                            return false;
                        }
                    }
                }
                
                // Sprawdź czy to link <a>
                if (target.tagName === 'A') {
                    var href = target.getAttribute('href');
                    if (href && href.indexOf('.html') !== -1) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        console.log("🔵 Link clicked:", href);
                        
                        setTimeout(function() {
                            window.location.href = href;
                        }, 10);
                        
                        return false;
                    }
                }
                
                target = target.parentElement;
                depth++;
            }
        }, true); // useCapture = TRUE (najważniejsze!)
    }
    
    // Ukryj pasek scrollując
    window.addEventListener('load', function() {
        setTimeout(function() {
            window.scrollTo(0, 1);
        }, 100);
    });
    
    // Overscroll
    if (document.body) {
        document.body.style.overscrollBehavior = 'contain';
    }
})();
