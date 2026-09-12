// Ukrywanie paska adresu na iOS i Android - WERSJA ROZSZERZONA
window.addEventListener("load", function() {
    // Sprawdź czy jesteśmy w trybie standalone (dodano do ekranu głównego)
    var isStandalone = window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches;
    
    if (isStandalone) {
        console.log("Aplikacja działa w trybie standalone - przechwytywanie nawigacji");
        
        // Przechwytuj wszystkie kliknięcia w linki <a>
        var links = document.getElementsByTagName("a");
        for (var i = 0; i < links.length; i++) {
            links[i].addEventListener("click", function(event) {
                var href = this.getAttribute("href");
                
                // Jeśli to link wewnętrzny (nie zaczyna się od http://, https://, mailto:, tel:, #)
                if (href && href.indexOf('http') !== 0 && href.indexOf('mailto:') !== 0 && href.indexOf('tel:') !== 0 && href !== '#') {
                    event.preventDefault();
                    event.stopPropagation();
                    window.location.href = href;
                    return false;
                }
            }, true); // useCapture = true
        }
        
        // Nadpisz window.location.href aby działało w standalone
        var originalPushState = history.pushState;
        var originalReplaceState = history.replaceState;
        
        // Przechwytuj wszystkie zmiany window.location poprzez delegację zdarzeń
        document.addEventListener('click', function(e) {
            var target = e.target;
            var maxDepth = 5; // Sprawdź max 5 poziomów w górę
            
            // Sprawdź czy kliknięto element lub jego rodzica z onclick
            while (target && maxDepth > 0) {
                var onclickAttr = target.getAttribute('onclick');
                
                if (onclickAttr && onclickAttr.indexOf('window.location') !== -1) {
                    // Wyciągnij URL z onclick="window.location.href='url'"
                    var match = onclickAttr.match(/['"](.*?)['"]/);
                    if (match && match[1]) {
                        var url = match[1];
                        
                        // Jeśli to wewnętrzny link HTML
                        if (url.indexOf('.html') !== -1 || url.indexOf('#') === 0) {
                            e.preventDefault();
                            e.stopPropagation();
                            
                            console.log("Przechwycono onclick nawigację do:", url);
                            
                            // Użyj setTimeout aby uniknąć problemów z event loop
                            setTimeout(function() {
                                window.location.href = url;
                            }, 0);
                            
                            return false;
                        }
                    }
                }
                
                target = target.parentElement;
                maxDepth--;
            }
        }, true); // useCapture = true - przechwytuj przed innymi handlerami
    }
    
    // Alternatywne podejście do ukrywania paska adresu (dla starszych wersji)
    setTimeout(function() {
        window.scrollTo(0, 1);
    }, 0);
});

// Zapobieganie przewijaniu strony poza granice (overscroll)
if (document.body) {
    document.body.style.overscrollBehavior = 'contain';
}
if (document.documentElement) {
    document.documentElement.style.overscrollBehavior = 'contain';
}
