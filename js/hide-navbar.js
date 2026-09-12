// Ukrywanie paska adresu na iOS i Android - WERSJA ROZSZERZONA
window.addEventListener("load", function() {
    // Sprawdź czy jesteśmy w trybie standalone (dodano do ekranu głównego)
    var isStandalone = window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches;
    
    if (isStandalone) {
        console.log("Aplikacja działa w trybie standalone - linki będą otwierane wewnątrz aplikacji");
        
        // Przechwytuj wszystkie kliknięcia w linki <a>
        var links = document.getElementsByTagName("a");
        for (var i = 0; i < links.length; i++) {
            links[i].addEventListener("click", function(event) {
                var href = this.getAttribute("href");
                
                // Jeśli to link wewnętrzny (nie zaczyna się od http://, https://, mailto:, tel:, #)
                if (href && href.indexOf('http') !== 0 && href.indexOf('mailto:') !== 0 && href.indexOf('tel:') !== 0 && href !== '#') {
                    event.preventDefault();
                    window.location.href = href;
                }
            }, false);
        }
        
        // Obsługa onclick="window.location.href='...'" - nadpisz window.location.href
        var originalLocationSetter = Object.getOwnPropertyDescriptor(window.Location.prototype, 'href').set;
        Object.defineProperty(window.location, 'href', {
            set: function(url) {
                // Użyj oryginalnej funkcji ale w trybie standalone
                if (url && url.indexOf('http') !== 0) {
                    originalLocationSetter.call(window.location, url);
                } else {
                    originalLocationSetter.call(window.location, url);
                }
            }
        });
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
