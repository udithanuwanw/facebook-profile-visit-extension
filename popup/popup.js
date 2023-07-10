document.addEventListener("DOMContentLoaded", function() {
  // Get current profile count from storage
  chrome.storage.local.get("profileCount", function(data) {
    let profileCount = data.profileCount || 0;

    // Update popup HTML with current profile count
    document.getElementById("profileCount").innerText = profileCount.toString();
  });

  // Add click event listener to reset button
  document.getElementById("resetButton").addEventListener("click", function() {
    // Send reset message to background.js
    chrome.runtime.sendMessage({ action: "reset" }, function(response) {
      // Update popup HTML with reset message
      document.getElementById("profileCount").innerText = "0";
    });
  });
});