console.log('rozwijka.js');
const lo = document.querySelector('#lo');
const content = document.querySelector('#rogo');
const arrow = document.querySelector('#rotation');

// Ukryj zawartość na start zamiast czyścić innerHTML
content.style.display = 'none';

lo.addEventListener('click', function () {
    if (content.style.display === 'block') {
        lo.style = "border-radius: 12px;";
        content.style.display = 'none';
        arrow.style = "transform: rotate(0deg);";
    }
    else {
        lo.style = "border-radius: 12px 12px 0 0;";
        content.style.display = 'block';
        arrow.style = "transform: rotate(-90deg);";
    }
});