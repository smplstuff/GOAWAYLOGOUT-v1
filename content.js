// Function to toggle logout button visibility
function toggleLogoutButton(hideLogout) {
    const logoutButton = document.querySelector('a[href="/logout"]');
    if (logoutButton) {
      logoutButton.style.display = hideLogout ? 'none' : 'block';
    }
  }
  
  // Initial check to hide the logout button based on saved state
  chrome.storage.sync.get('hideLogout', ({ hideLogout }) => {
    toggleLogoutButton(hideLogout);
  });
  
  // Set up a MutationObserver to detect when the logout button is added
  const observer = new MutationObserver(() => {
    chrome.storage.sync.get('hideLogout', ({ hideLogout }) => {
      toggleLogoutButton(hideLogout);
    });
  });
  
  // Start observing the document for changes in the child nodes
  observer.observe(document.body, { childList: true, subtree: true });
  