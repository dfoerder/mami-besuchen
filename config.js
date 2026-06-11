// ─────────────────────────────────────────────────────────────
//  Firebase-Konfiguration für "Mami besuchen"
// ─────────────────────────────────────────────────────────────
//
//  So füllst du das aus:
//  1. https://console.firebase.google.com  →  Projekt "mami-besuchen"
//  2. Firestore-Datenbank anlegen (Region: europe-west, Produktionsmodus)
//  3. Web-App registrieren (</>-Symbol)  →  Firebase kopiert dir ein
//     "firebaseConfig"-Objekt. Trage dessen Werte hier unten ein.
//  4. In der Firestore-Konsole unter "Regeln" die Regeln aus der
//     README.md (Abschnitt "Firestore-Regeln") einfügen.
//
//  Solange hier die Platzhalter stehen, läuft die App im
//  Vorschau-Modus: die Daten werden nur lokal im Browser gespeichert
//  (kein gemeinsamer Kalender). Das ist zum Ausprobieren völlig ok.
// ─────────────────────────────────────────────────────────────

window.FIREBASE_CONFIG = {
  apiKey:            "AIzaSyC6PeV4uvcyFhPYNF_MqAsvjNwlMS3wSDY",
  authDomain:        "mami-besuchen.firebaseapp.com",
  projectId:         "mami-besuchen",
  storageBucket:     "mami-besuchen.firebasestorage.app",
  messagingSenderId: "959723344915",
  appId:             "1:959723344915:web:86952b879c047b5039dbe6",
  measurementId:     "G-QNXKY6RRD6"
};
