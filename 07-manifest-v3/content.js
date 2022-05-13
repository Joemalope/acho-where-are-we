// Notification body.
const notification = document.createElement("div");
notification.className = "acho-notification";

// Notification icon.
const icon = document.createElement("img");
icon.src = chrome.runtime.getURL("images/icon32.png");
notification.appendChild(icon);

// Notification text.
const notificationText = document.createElement("p");
notification.appendChild(notificationText);

// Add to current page.
document.body.appendChild(notification);

const autoPopulateNetflixLoginDetails = () => {
  const emailField = document.getElementById("signin_email");
  const passwordField = document.getElementById("signin_password");
  // const emailField = document.getElementById("id_userLoginId");
  // const passwordField = document.getElementById("id_password");
  const signInBtn = document.querySelector("#signin_btn_submit");

  if (emailField && passwordField) {
    emailField.value = "joeymalope@gmail.com";
    passwordField.value = "Test_00h00";

    console.log("signInBtn: ", signInBtn);
    setTimeout(() => signInBtn.click(), 3000);
  } else {
    console.log("emailField:", emailField);
    console.log("passwordField:", passwordField);
  }
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("message recieved(from content):", chrome);
  if (message.msg === "autofill") {
    sendResponse("OK");
  }

  return true;
});

autoPopulateNetflixLoginDetails();
