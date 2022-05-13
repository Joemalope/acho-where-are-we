/** Shared logic */
class Tab {
  /**
   * Gets the active Tab
   * @returns {Promise<*>} Active tab
   */
  getActiveTab = async () => {
    const query = { active: true, currentWindow: true };
    const tabs = await chrome.tabs.query(query);

    return tabs[0];
  };

  /**
   * Display a badge with the text 'grr' over the browser action icon
   * @returns {Promise<void>}
   */
  notify = async () => {
    await chrome.action.setBadgeBackgroundColor({ color: "#F00" });
    await chrome.action.setBadgeText({ text: "Open" });
  };

  /**
   * Hide the browser action badge.
   * @returns {Promise<void>}
   */
  clearNotifications = async () => {
    await chrome.action.setBadgeText({ text: "" });
  };
}
