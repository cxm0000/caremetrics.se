// Client-side language detection and content switching
(function() {
  // Get language from URL query parameter
  const urlParams = new URLSearchParams(window.location.search);
  const lang = urlParams.get('lang') || 'sv';
  
  // Store language preference
  if (lang === 'en' || lang === 'sv') {
    localStorage.setItem('preferredLanguage', lang);
  }
  
  // Update HTML lang attribute
  document.documentElement.lang = lang;
  
  // If we're on the default language and there's no query param, ensure we're showing Swedish
  // This handles the case where someone visits without ?lang=en
  if (!urlParams.has('lang') && lang === 'sv') {
    // Already correct, no action needed
  }
})();

