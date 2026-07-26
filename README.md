<p align="center">
  <img src="custom_components/radio_panel/brand/logo.png" width="160" alt="Logo Radio Panel">
</p>

# Radio Panel for Home Assistant

Panel radia internetowego dla Home Assistant z katalogiem Radio Browser, globalnym odtwarzaczem, ulubionymi stacjami oraz transportem HLS dla urządzeń iOS.

## Najważniejsze funkcje

- wyszukiwanie stacji w katalogu Radio Browser,
- ulubione stacje i automatyczne statystyki słuchania,
- panel **Radio** automatycznie dodawany do paska bocznego,
- pływający odtwarzacz widoczny również na innych panelach Home Assistanta,
- Play, Pauza, Stop, regulacja głośności, logo stacji i informacje o utworze,
- automatyczne ponowne łączenie strumienia,
- HLS dla iPhone'a i iPada, aby ograniczyć problem zamykania długich połączeń HTTP w tle,
- awaryjne logo Radio Play dla stacji bez własnej grafiki,
- polskie i angielskie tłumaczenia konfiguracji.

## Wymagania

- Home Assistant z dostępem do internetu,
- HACS — tylko przy instalacji przez HACS,
- wbudowany komponent `ffmpeg` Home Assistanta dla trybu HLS na iOS,
- opcjonalnie wbudowana integracja **Radio Browser**. Panel sprawdza jej stan i wyświetla komunikat, gdy nie jest skonfigurowana.

## Instalacja przez HACS

1. W HACS otwórz menu z trzema kropkami i wybierz **Niestandardowe repozytoria**.
2. Dodaj adres:

   ```text
   https://artgraf181-glitch/radio-panel
   ```

3. Wybierz typ **Integracja**.
4. Wyszukaj **Radio Panel** i zainstaluj integrację.
5. Uruchom ponownie Home Assistanta.
6. Przejdź do **Ustawienia → Urządzenia i usługi → Dodaj integrację → Radio Panel**.
7. Po zatwierdzeniu pozycja **Radio** pojawi się w pasku bocznym.

## Instalacja ręczna

Skopiuj katalog:

```text
custom_components/radio_panel
```

do:

```text
/config/custom_components/radio_panel
```

Następnie uruchom ponownie Home Assistanta i dodaj integrację z poziomu **Ustawienia → Urządzenia i usługi**.

## Radio Browser

Radio Panel korzysta bezpośrednio z internetowego API Radio Browser do wyszukiwania stacji. Wbudowana integracja Radio Browser w Home Assistant jest zalecana i jest sprawdzana przy uruchamianiu panelu, ale nie jest bezwzględnie wymagana do samego wyszukiwania.

## Aktualizacja

Po aktualizacji przez HACS uruchom ponownie Home Assistanta. Gdy interfejs nadal pokazuje poprzednią wersję, wykonaj twarde odświeżenie przeglądarki lub całkowicie zamknij aplikację mobilną Home Assistant.

Numer zainstalowanej wersji jest widoczny na dole zakładki **Ustawienia** w panelu.

## Rozwiązywanie problemów

### Panel nie pojawił się w pasku bocznym

Sprawdź, czy po restarcie została dodana integracja **Radio Panel** w sekcji **Urządzenia i usługi**. Samo pobranie plików przez HACS nie tworzy wpisu integracji.

### Radio nie uruchamia się na iOS

Sprawdź log Home Assistanta pod kątem `radio_panel` i `ffmpeg`. Pierwsze uruchomienie HLS może potrwać kilka sekund, ponieważ Home Assistant musi przygotować początkowe segmenty audio.

### Brak tytułu utworu lub logo

Nie każda stacja udostępnia metadane ICY ani poprawny adres grafiki. W takim przypadku panel pokazuje nazwę stacji i logo Radio Play.

## Dane i połączenia sieciowe

Panel łączy się z API Radio Browser oraz z serwerami wybranych stacji. Ulubione, ustawienia i statystyki są przechowywane lokalnie w magazynie Home Assistanta.

## Zgłaszanie błędów

Zgłoszenia: https://artgraf181-glitch/radio-panel/issues

Przed zgłoszeniem podaj wersję Radio Panel, wersję Home Assistanta, urządzenie oraz nazwę stacji, na której problem występuje.

## Licencja

Projekt jest udostępniany na licencji MIT. Szczegóły znajdują się w pliku `LICENSE`.
