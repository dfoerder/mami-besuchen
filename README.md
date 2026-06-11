# Mami besuchen 👵💚

Eine kleine PWA, mit der sich die fünf Geschwister (Lucas, Thomas, Barbara,
Daniel, Christine) für die täglichen Besuche bei Mami im Pflegeheim eintragen.
Pro Tag gibt es vier Zeiten: **Morgen, Mittag, Nachmittag, Abend**. Zusätzliche
Besucher können mit Namen von Hand eingetragen werden.

Kalenderbereich: **1. Juni 2026 bis 30. November 2026** (6 Monate).

## Aufbau

Build-frei wie die Bibel-App – einfach Dateien bearbeiten und pushen:

| Datei | Zweck |
|-------|-------|
| `index.html` | Komplette App (React + Babel via CDN) |
| `config.js` | Firebase-Zugangsdaten (hier eintragen!) |
| `sw.js` | Service Worker (offline-fähig) |
| `manifest.json` | PWA-Manifest |
| `icon-192.png`, `icon-512.png` | App-Icons |
| `.github/workflows/pages.yml` | Auto-Deploy auf GitHub Pages |

## Vorschau-Modus

Solange in `config.js` die Platzhalter stehen, läuft die App im
**Vorschau-Modus**: Daten landen nur lokal im Browser (kein gemeinsamer
Kalender). Ideal zum Ausprobieren. Lokal starten z. B. mit:

```sh
python3 -m http.server 8000
# dann http://localhost:8000 öffnen
```

## Firebase einrichten (für den gemeinsamen Kalender)

1. **Projekt anlegen:** [console.firebase.google.com](https://console.firebase.google.com)
   → „Projekt hinzufügen" → Name `mami-besuchen`.
2. **Firestore anlegen:** Linke Leiste → „Firestore Database" → „Datenbank
   erstellen" → **Produktionsmodus** → Region **europe-west** (z. B. `europe-west3`).
3. **Web-App registrieren:** Projektübersicht → `</>`-Symbol → App-Name
   `mami-besuchen` (Hosting nicht nötig). Firebase zeigt dir ein
   `firebaseConfig`-Objekt.
4. **Werte übertragen:** Trage `apiKey`, `authDomain`, `projectId` usw. in
   `config.js` ein.
5. **Sicherheitsregeln setzen** (siehe unten).

### Firestore-Regeln

In der Firebase-Konsole unter **Firestore Database → Regeln** einfügen und
veröffentlichen. Es gibt keinen Login (Vertrauensbasis), aber die Regeln
erlauben nur die erwartete Datenstruktur in der Sammlung `tage` und nichts
anderes:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /tage/{tag} {
      // Tag-IDs müssen das Format YYYY-MM-DD haben
      allow read: if true;
      allow write: if tag.matches('^[0-9]{4}-[0-9]{2}-[0-9]{2}$')
                   && request.resource.data.keys().hasOnly(
                        ['morgen','mittag','nachmittag','abend']);
    }
  }
}
```

> Hinweis: Die Web-Config (`apiKey` etc.) ist absichtlich öffentlich – das ist
> bei Firebase normal und kein Geheimnis. Den Zugriff steuern allein die Regeln.

## Datenmodell

Sammlung `tage`, ein Dokument pro Tag (ID = `YYYY-MM-DD`):

```json
{
  "morgen":     ["Lucas", "Nachbarin Erika"],
  "mittag":     ["Barbara"],
  "nachmittag": [],
  "abend":      ["Daniel", "Christine"]
}
```

Ein- und Austragen nutzt `arrayUnion`/`arrayRemove`, damit gleichzeitige
Änderungen mehrerer Geschwister sich nicht gegenseitig überschreiben.

## Deployment

Repo `mami-besuchen` auf GitHub anlegen, pushen, dann in den Repo-Einstellungen
unter **Settings → Pages → Source: GitHub Actions** aktivieren. Jeder Push auf
`main` deployt automatisch.
