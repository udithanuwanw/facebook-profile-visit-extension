// Listener for URL changes
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  // Check if URL is a Facebook profile URL
  if (changeInfo.status === "complete"){
  if (isFacebookProfileUrl(tab.url)) {
    // Get current profile count from storage
    chrome.storage.local.get("profileCount", function(data) {
      let profileCount = data.profileCount || 0;

      // Increment profile count by 1
      profileCount++;

      // Update profile count in storage
      chrome.storage.local.set({ "profileCount": profileCount });
    });
  }
}
});

// Reset profile count
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "reset") {
    // Set profile count to 0
    chrome.storage.local.set({ "profileCount": 0 });

    // Send response to popup.js
    sendResponse({ message: "Profile count reset." });
  }
});

// Function to check if URL is a Facebook profile URL
function isFacebookProfileUrl(url) {
  /*
  Checks if a given URL is a Facebook profile URL.
  */
  var facebookProfilePattern = /https:\/\/www\.facebook\.com\/(profile\.php\?id=\d+|[\w\.]+)/;

  // Check if the URL matches the pattern
  if (url.match(facebookProfilePattern)) {
    if (url.includes("profile.php?id")) {
      if (url.includes("&")){
        return false;

      }
      else{
        return true;

      }
      // Check if the URL contains "profile.php?id", indicating a profile URL
      
    } else if (url.includes("facebook.com/")) {
      if (url.split('/').length === 4) {

        // Check if the URL contains "facebook.com/" followed by a valid username, indicating a profile URL
        if (url.includes("&")){
        return false;

      }
      else{
        return true;

      }
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
}