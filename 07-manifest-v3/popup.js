document.addEventListener("DOMContentLoaded", async () => {
  const dialogBox = document.getElementById("dialog-box");

  const tab = new Tab();
  const currentTab = await tab.getActiveTab();
  console.log(currentTab);
  //autopopulate
  const autoPopulateNetflixLoginDetails = () => {
    const emailField = document.getElementById("signin_email");
    const passwordField = document.getElementById("signin_password");

    if (emailField && passwordField) {
      //emailField.value = "moriti.s.malope@gmail.com";
      //signin_email
      emailField.value = "joeymalope@gmail.com";
      //passwordField.value = "gsJwEvYG+PDP5@n";
      passwordField.value = "Test_00h00";

      setTimeout(() => {
        document.getElementById("signin_btn_submit").click();
      }, 5000);
    } else {
      console.log("emailField:", emailField);
      console.log("passwordField:", passwordField);
    }
  };

  const detectedNetflix = (url) => {
    const icon = document.getElementById("icon");
    const radiation = document.querySelector(".radiating-items");

    console.log("Netflix and chill?", url.search("netflix.com"));
    console.log("Showmax and relax?", url.search("showmax.com"));

    if (url.search("netflix.com") > 0 || url.search("showmax.com") > 0) {
      const streamingSite =
        url.search("netflix.com") > 0 ? "netflix" : "showmax";

      icon.classList.add(streamingSite);
      radiation.classList.add(streamingSite);
      icon.classList.add("active");
      radiation.classList.add("active");

      chrome.runtime.sendMessage({ msg: "autofill" }, function (response) {
        console.log("response is: ", response);
      });
      autoPopulateNetflixLoginDetails();
    } else {
      icon.classList.remove("active");
      radiation.classList.remove("active");
    }
  };

  const url = currentTab.url;
  detectedNetflix(url);

  // Store page.
  await PageService.savePage(currentTab.title, currentTab.url);
});
