# Gewicht Tracker — Einrichtung (Schritt 1: Gewicht)

Drei Teile: **dein Google Sheet**, das **Apps Script** dazwischen, und die **PWA** auf deinen Geräten.
Reihenfolge: erst das Backend (einmalig), dann die App.

---

## A) Backend einrichten (einmalig, ~5 Min am PC)

1. Neues Google Sheet anlegen (z. B. „Gewicht"). Tab-Namen egal — das Script legt den Tab `weight` selbst an.
2. **Erweiterungen → Apps Script**.
3. Allen Vorlagen-Code löschen, den Inhalt von **`Code.gs`** komplett einfügen.
4. Oben in der Datei `TOKEN` auf eine eigene **lange Zufallszeichenkette** ändern (wie ein Passwort). Merken — die brauchst du gleich in der App.
5. In der Toolbar `setup` auswählen → **Ausführen**. Beim ersten Mal Berechtigungen erteilen
   (Google warnt bei selbstgeschriebenen Scripts — über „Erweitert → … trotzdem fortfahren" bestätigen, es ist dein eigenes Script).
   Das legt den `weight`-Tab an und trägt deinen Startwert **96 kg am 08.06.2026** ein.
6. **Bereitstellen → Neue Bereitstellung → Typ: Web-App**:
   - *Ausführen als:* **Ich**
   - *Zugriff:* **Alle, die über den Link verfügen**
   - Bereitstellen → die **/exec-URL** kopieren.

> Sicherheit: URL **und** Token zusammen sind dein Schlüssel. Beides privat halten. Ohne passendes Token antwortet das Script `unauthorized`.

---

## B) PWA hosten

Die App ist statisch (nur HTML/JS), braucht also nur irgendeinen HTTPS-Ort. Zwei Wege:

- **Privates GitHub Pages Repo** (wie bei deinem Stempelpass): die 6 Dateien hochladen, Pages aktivieren. Nur die *App-Hülle* ist dann erreichbar — deine Daten liegen ausschließlich im Sheet, nie im Repo.
- **Lokal testen:** im Ordner `python3 -m http.server 8000`, dann `http://localhost:8000` öffnen. (Service Worker braucht HTTPS oder localhost — `file://` reicht nicht.)

Dateien: `index.html`, `analysis.html`, `manifest.json`, `sw.js`, `icon-180/192/512.png`.

---

## C) App verbinden & auf iPhone installieren

1. App-URL öffnen → beim ersten Start öffnet sich automatisch ⚙ **Einstellungen**.
2. **Web-App URL** (…/exec) und **Token** eintragen (exakt wie im Script). Größe steht auf 168.
3. **Sichern** → es sollte „Synchronisiert" anzeigen und 96 kg erscheinen.
4. iPhone (Safari): **Teilen → Zum Home-Bildschirm**. Startet dann als Vollbild-App mit Icon.

---

## Tägliche Nutzung

Aufstehen → wiegen → App öffnen (Datum steht auf heute) → Zahl tippen → **Speichern**. Fertig.
„Verlauf & Analyse" zeigt Messpunkte, EWMA-Trend, Prognose und die Ziele 90 / 80 / 69 kg samt geschätztem Datum und BMI.

Pro Tag ein Eintrag — speicherst du nochmal, wird der Tag überschrieben (kein Wildwuchs im Sheet).

---

## Technische Notizen

- **Trend:** exponentiell geglätteter Mittelwert (α≈0,12) statt einfachem 7-Tage-Schnitt — reagiert schneller, glättet aber Wasser-Rauschen.
- **Prognose:** lineare Regression auf den geglätteten Trend der letzten 3 Wochen. Weiter entfernte Ziele sind bewusst als grobe Schätzung gekennzeichnet, weil Gewichtsverlust selten linear bleibt.
- **Offline:** der Service Worker cached die Hülle; Einträge werden lokal optimistisch gesetzt und beim nächsten Online-Sync ans Sheet geschickt. (Echtes Offline-Queueing kommt bei Bedarf in einem späteren Schritt.)
- **CORS:** der `fetch` sendet `text/plain`, damit kein Preflight nötig ist — Apps Script Web-Apps mögen keine Custom-Header.

Wenn dir Handling & Analyse passen, kommt **Schritt 2** (Kalorien/Keto) dazu — selber Sheet, neuer Tab, gleiches Muster.
