document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('toggle-logout');
  
    // Load the saved state from storage
    chrome.storage.sync.get('hideLogout', ({ hideLogout }) => {
      toggle.checked = hideLogout;
    });
  
    // Add a listener for the toggle switch
    toggle.addEventListener('change', () => {
      const hideLogout = toggle.checked;
  
      // Save the state in storage
      chrome.storage.sync.set({ hideLogout });
  
      // Send a message to content script to hide/show the button
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: toggleLogoutButton,
          args: [hideLogout]
        });
      });
    });
  });
  
  // Function to toggle logout button visibility
  function toggleLogoutButton(hideLogout) {
    const logoutButton = document.querySelector('a[href="/logout"]');
    if (logoutButton) {
      logoutButton.style.display = hideLogout ? 'none' : 'block';
    }
  }
  