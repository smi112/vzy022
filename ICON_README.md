# Instrukcja generowania ikon dla iOS i Android

## Problem
iOS nie obsługuje ikon SVG dla aplikacji webowych (PWA). Potrzebuje ikon w formacie PNG.

## Potrzebne rozmiary ikon:

### iOS:
- **apple-touch-icon.png** - 180x180px

### Android/PWA (manifest.json):
- **icon-192.png** - 192x192px
- **icon-512.png** - 512x512px

## Jak wygenerować ikony:

### Opcja 1: Online Generator (POLECANE)
1. Otwórz: https://www.faviconbuilder.com/
2. Wgraj plik: `images/coi_common_ui_ic_mobywatel_logo.svg`
3. Pobierz wygenerowane ikony
4. Skopiuj do głównego folderu projektu:
   - `apple-touch-icon.png` (180x180)
   - `icon-192.png` (192x192)
   - `icon-512.png` (512x512)

### Opcja 2: Inne narzędzie
- https://realfavicongenerator.net/
- https://favicon.io/favicon-converter/

## Po wygenerowaniu ikon:
Ikony powinny być w głównym folderze projektu (`togithub/`), a kod HTML już jest zaktualizowany aby ich używać.

## Status:
✅ Kod HTML zaktualizowany (wszystkie strony)
⚠️ Ikony PNG do wygenerowania (użyj powyższych narzędzi)
