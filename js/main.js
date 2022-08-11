var siteNameInput = document.getElementById("siteNameInput");
var siteURLInput = document.getElementById("siteUrlInput");
var siteContainer;
if (localStorage.getItem("my Sites") != null) {
  siteContainer = JSON.parse(localStorage.getItem("my Sites"));
  displaySites(siteContainer);
} else {
  siteContainer = [];
}

function addSites() {
  if (validate() == true) {
    var site = {
      Name: siteNameInput.value,
      URL: siteURLInput.value,
    };
    siteContainer.push(site);
    displaySites();
    localStorage.setItem("my Sites", JSON.stringify(siteContainer));
    clearForm();
  }
}

function clearForm() {
  siteNameInput.value = "";
  siteURLInput.value = "";
}

function displaySites() {
  var cartona = "";
  for (let i = 0; i < siteContainer.length; i++) {
    const element = siteContainer[i];
    cartona += `
        <div class="backGround mx-1 my-3 py-5 d-flex">
            <p style="width:300px;" class="px-3 fw-bolder fs-5">${siteContainer[i].Name}</p>
            <button onclick="visitSite(${i})" class="btn btn-danger mx-2 btnHover">Visit</button>
            <button onclick="deleteSite(${i})" class="btn btn-danger mx-2 btnHover">Delete</button>
        </div> `;
  }
  document.getElementById("displaySites").innerHTML = cartona;
}
function deleteSite(i) {
  siteContainer.splice(i, 1);
  localStorage.setItem("my Sites", JSON.stringify(siteContainer));
  displaySites();
}
function visitSite(i) {
  window.open(siteContainer[i].URL, "_blank");
}
function validate() {
  var Success = true;
  if (validateSiteName() == false) {
    Success = false;
  }
  if (validateSiteURL() == false) {
    Success = false;
  }
  return Success;
}

function validateSiteName() {
  if (siteNameInput.value === null || siteNameInput.value == "") {
    document.getElementById("Name-error").classList.remove("d-none");
    return false;
  } else {
    document.getElementById("Name-error").classList.add("d-none");

    for (let i = 0; i < siteContainer.length; i++) {
      if (siteContainer[i].Name == siteNameInput.value) {
        document.getElementById("Name-error").classList.remove("d-none");
        document.getElementById("Name-error").innerHTML = "This name is already exist";
        return false;
      }
    }
    return true;
  }
}
function validateSiteURL() {
  document.getElementById("URL-error").classList.add("d-none");

  if (siteURLInput.value === null || siteURLInput.value == "") {
    document.getElementById("URL-error").classList.remove("d-none");
    document.getElementById("URL-error").innerHTML = "URL is required";
    return false;
  } else {
    var regex = /^http[s]?:\/\/([w|W]{3}\.)?[a-zA-Z0-9\-\.]{3,}\.[a-zA-Z]{2,}/;
    if (!regex.test(siteURLInput.value)) {
      document.getElementById("URL-error").classList.remove("d-none");
      document.getElementById("URL-error").innerHTML = "Format is wrong";
      return false;
    } else {
      for (let i = 0; i < siteContainer.length; i++) {
        if (siteContainer[i].URL == siteURLInput.value) {
          document.getElementById("URL-error").classList.remove("d-none");
          document.getElementById("URL-error").innerHTML = "URL is already exist";
          return false;
        }
      }
      return true;
    }
  }
}
