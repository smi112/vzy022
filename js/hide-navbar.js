// STANDALONE MODE FIX - NADPISANIE window.location
(function() {
    'use strict';
    
    // Natychmiastowa detekcja standalone
    var isStandalone = window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches;
    
    if (isStandalone) {
        console.log("🟢 STANDALONE MODE - Przechwytywanie nawigacji");
        
        // NADPISZ window.location.href setter
        var originalLocation = window.location;
        var originalHref = originalLocation.href;
        
        Object.defineProperty(window, 'location', {
            get: function() {
                return originalLocation;
            },
            set: function(url) {
                console.log("🔴 BLOCKED window.location =", url);
                originalLocation.href = url;
            }
        });
        
        // PRZECHWYTUJ onclick PRZED wykonaniem
        document.addEventListener('click', function(e) {
            var target = e.target;
            var depth = 0;
            
            // Szukaj elementu z onclick
            while (target && depth < 10) {
                var onclick = target.getAttribute('onclick');
                
                if (onclick && (onclick.indexOf('window.location') !== -1 || onclick.indexOf('.href') !== -1)) {
                    // Wyciągnij URL
                    var urlMatch = onclick.match(/['"]([^'"]+\.html[^'"]*)['"]/);
                    
                    if (urlMatch && urlMatch[1]) {
                        var url = urlMatch[1];
                        
                        console.log("🔴 INTERCEPTED onclick:", url);
                        
                        // ZATRZYMAJ event
                        e.preventDefault();
                        e.stopPropagation();
                        e.stopImmediatePropagation();
                        
                        // Nawiguj ASYNCHRONICZNIE
                        setTimeout(function() {
                            window.location.href = url;
                        }, 50);
                        
                        return false;
                    }
                }
                
                // Sprawdź <a> tag
                if (target.tagName === 'A') {
                    var href = target.getAttribute('href');
                    if (href && href.indexOf('.html') !== -1) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        console.log("🔵 Link:", href);
                        
                        setTimeout(function() {
                            window.location.href = href;
                        }, 50);
                        
                        return false;
                    }
                }
                
                target = target.parentElement;
                depth++;
            }
        }, true); // useCapture = TRUE!
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
