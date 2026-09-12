// Ukrywanie paska adresu na iOS i Android
window.addEventListener("load", function() {
    // Ukrywanie paska adresu na iOS
    if ("standalone" in window.navigator && window.navigator.standalone) {
        var a = document.getElementsByTagName("a");
        for (var i = 0; i < a.length; i++) {
            a[i].addEventListener("click", function(event) {
                var newLocation = this.href;
                event.preventDefault();
                window.location = newLocation;
            }, false);
        }
    }
    
    // Alternatywne podejście do ukrywania paska adresu
    setTimeout(function() {
        window.scrollTo(0, 1);
    }, 0);
});

// Zapobieganie przewijaniu strony poza granice (overscroll)
document.body.style.overscrollBehavior = 'contain';
document.documentElement.style.overscrollBehavior = 'contain';
