// Firebase Initialization & Dual-Mode Configuration
// Supports real Firebase Cloud Firestore + Anonymous Auth, with automatic fallback to LocalStorage/Mock state.

const DEFAULT_FIREBASE_CONFIG = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

class FirebaseManager {
  constructor() {
    this.app = null;
    this.db = null;
    this.auth = null;
    this.isConfigured = false;
    this.config = this.loadConfig();
    this.init();
  }

  loadConfig() {
    try {
      const saved = localStorage.getItem('KIC_FIREBASE_CONFIG');
      return saved ? JSON.parse(saved) : DEFAULT_FIREBASE_CONFIG;
    } catch (e) {
      return DEFAULT_FIREBASE_CONFIG;
    }
  }

  saveConfig(newConfig) {
    this.config = { ...this.config, ...newConfig };
    localStorage.setItem('KIC_FIREBASE_CONFIG', JSON.stringify(this.config));
    this.init();
  }

  init() {
    if (this.config.apiKey && this.config.projectId && window.firebase) {
      try {
        if (!firebase.apps.length) {
          this.app = firebase.initializeApp(this.config);
        } else {
          this.app = firebase.app();
        }
        this.db = firebase.firestore();
        this.auth = firebase.auth();
        this.isConfigured = true;
        console.log('[KeepIn Cool] Firebase Cloud Firestore 연결 완료! (Project ID:', this.config.projectId, ')');
      } catch (err) {
        console.warn('[KeepIn Cool] Firebase 초기화 오류 (Mock 모드로 동작합니다):', err);
        this.isConfigured = false;
      }
    } else {
      this.isConfigured = false;
    }
  }

  isReady() {
    return this.isConfigured && this.db !== null;
  }
}

window.firebaseManager = new FirebaseManager();
