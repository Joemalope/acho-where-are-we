importScripts("tab.js", "page.service.js");
console.log("Hi from Service worker Script file");

chrome.commands.onCommand.addListener(async (command) => {
  switch (command) {
    case "duplicate-tab":
      await duplicateTab();
      break;
    case "bark":
      await getTitle();
      break;
    default:
      console.log(`Command ${command} not found`);
  }
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  await new Tab().notify();
});

chrome.tabs.onCreated.addListener(async (tab) => {
  await new Tab().notify();
});

/**
 * Gets the current active tab URL and opens a new tab with the same URL.
 */
const duplicateTab = async () => {
  const tab = new Tab();
  const currentTab = await tab.getActiveTab();

  chrome.tabs.create({ url: currentTab.url, active: false });
};

const getTitle = async () => {
  const tab = new Tab();
  const currentTab = await tab.getActiveTab();

  await chrome.tabs.sendMessage(currentTab.id, {
    tabTitle: currentTab.title,
  });

  await PageService.savePage(currentTab.title, currentTab.url);

  await currentTab.clearNotifications();
};

const autoPopulateNetflixLoginDetails = () => {
  const emailField = document.getElementById("id_userLoginId");
  const passwordField = document.getElementById("id_password");

  if (emailField && passwordField) {
    emailField.value = "moriti.s.malope@gmail.com";
    passwordField.value = "gsJwEvYG+PDP5@n";
  } else {
    console.log("emailField:", emailField);
    console.log("passwordField:", passwordField);
  }
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("message recieved:", message.msg);

  if (message.msg == "autofill") {
    // autoPopulateNetflixLoginDetails();
    sendResponse("OK bro");
    console.log("Are we in?? ", chrome);
  }

  return true;
});
