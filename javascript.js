let page = 0
let information = {
  "name": "",
  "email": "",
  "phone": "",
  "plan": "",
  "planAmount": "",
  "plantDuration": "",
  "addOn": {
    "onlineService": false,
    "largerStorage": false,
    "customizableProfile": false
  }
}

function loadPage() {
  page = 1
  displayContainer()
}

function enableNextClick() {
  console.log("checkForInfo " + checkForInfo())
  if (!checkForInfo()) {
    document.getElementById("next-button").setAttribute('disabled', true)
  } else {
    document.getElementById("next-button").removeAttribute('disabled')
  }
}

function onNextClick() {
  if (!checkForInfo()) {
    alert("Enter/Select all the details")
    return
  }
  page = ++page
  console.log("page number is " + page)
  displayContainer()
}

function goBack() {
  if (page == 1) return
  page = --page
  displayContainer()
}

function hideBack() {
  document.getElementById("back-button").style.visibility = "hidden"
}

function showBack() {
  document.getElementById("back-button").style.visibility = "visible"
}

function hideButtons() {
  document.getElementById("action-buttons").style.display = "none"
}

function showButtons() {
  document.getElementById("action-buttons").style.display = "flex"
}

function displayContainer() {
  document.getElementById("step-1").style.display = "none"
  document.getElementById("step-2").style.display = "none"
  document.getElementById("step-3").style.display = "none"
  document.getElementById("step-4").style.display = "none"
  document.getElementById("step-5").style.display = "none"
  selectNav()
  showButtons()
  showBack()
  enableNextClick()
  switch (page) {
    case 1:
      document.getElementById("step-1").style.display = "block"
      hideBack()
      break;
    case 2:
      document.getElementById("step-2").style.display = "block"
      break;
    case 3:
      document.getElementById("step-3").style.display = "block"
      break;
    case 4:
      document.getElementById("step-4").style.display = "block"
      displaySummary()
      break;
    case 5:
      document.getElementById("step-5").style.display = "block"
      hideButtons()
      break;

    default:
      break;
  }
}

function selectNav() {
  console.log("select nav")
  document.getElementById("step-number-1").classList.remove("active")
  document.getElementById("step-number-2").classList.remove("active")
  document.getElementById("step-number-3").classList.remove("active")
  document.getElementById("step-number-4").classList.remove("active")
  switch (page) {
    case 1:
      document.getElementById("step-number-1").classList.add("active")
      break;
    case 2:
      document.getElementById("step-number-2").classList.add("active")
      break;
    case 3:
      document.getElementById("step-number-3").classList.add("active")
      break;
    case 4:
    case 5:
      document.getElementById("step-number-4").classList.add("active")
      break;

    default:
      break;
  }
}

function checkForInfo() {
  information.name = document.getElementById("input_name").value
  information.phone = document.getElementById("input_phone").value
  if (page === 1 && information.name.length > 0 && information.email.length > 0 && information.phone.length == 10)
    return true
  else if (page === 2 && information.plan.length > 0)
    return true
  else if (page === 3 || page === 4)
    return true
  return false
}

function addOnDisplay() {
  if (information.addOn.onlineService) {
    document.getElementsByClassName("add-on")[0].classList.add("add-on-selected")
  } else {
    document.getElementsByClassName("add-on")[0].classList.remove("add-on-selected")
  }
  if (information.addOn.largerStorage) {
    document.getElementsByClassName("add-on")[1].classList.add("add-on-selected")
  } else {
    document.getElementsByClassName("add-on")[1].classList.remove("add-on-selected")
  }
  if (information.addOn.customizableProfile) {
    document.getElementsByClassName("add-on")[2].classList.add("add-on-selected")
  } else {
    document.getElementsByClassName("add-on")[2].classList.remove("add-on-selected")
  }
}

function selectOnlineServiceAddOn() {
  let element = document.getElementsByClassName("add-on")[0].getElementsByClassName("checkbox")[0]
  information.addOn.onlineService = !information.addOn.onlineService
  element.checked = information.addOn.onlineService
  console.log("addOnns " + information.addOn)
  addOnDisplay()
}

function selectLargerStorageAddOn() {
  let element = document.getElementsByClassName("add-on")[1].getElementsByClassName("checkbox")[0]
  information.addOn.largerStorage = !information.addOn.largerStorage
  element.checked = information.addOn.largerStorage
  console.log("addOnns " + information.addOn)
  addOnDisplay()
}

function selectCustomizableProfileAddOn() {
  let element = document.getElementsByClassName("add-on")[2].getElementsByClassName("checkbox")[0]
  information.addOn.customizableProfile = !information.addOn.customizableProfile
  element.checked = information.addOn.customizableProfile
  console.log("addOnns " + information.addOn)
  addOnDisplay()
}

function validateEmail() {
  let email = document.getElementById('input_email');
  let mailFormat = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})|([0-9]{10})+$/;
  let email_error = document.getElementById("input_email_error")
  if (!mailFormat.test(email.value)) {
    console.log("Not an Email")
    information.email = ""
    email_error.style.display = "block"
  } else {
    console.log("Email")
    information.email = document.getElementById("input_email").value
    email_error.style.display = "none"
  }
  enableNextClick()
}

function onNameEntered() {
  let name = document.getElementById('input_name').value;
  information.name = name
  enableNextClick()
}

function validatePhoneNumber() {
  let phone = document.getElementById('input_phone');
  if (phone.value.length > phone.maxLength) phone.value = phone.value.slice(0, phone.maxLength);
  information.name = phone.value.length == 10 ? phone.value : "";
  let phone_error = document.getElementById("input_phone_error")
  if (information.name.length == 10) {
    phone_error.style.display = "none"
  } else {
    phone_error.style.display = "block"
  }
  enableNextClick()
}

function deselectPlan() {
  document.getElementById("plan-1").classList.remove("plan-selected")
  document.getElementById("plan-2").classList.remove("plan-selected")
  document.getElementById("plan-3").classList.remove("plan-selected")
}

function selectArcadePlan() {
  deselectPlan()
  document.getElementById("plan-1").classList.add("plan-selected")
  information.plan = "Arcade"
  information.planAmount = 9
  enableNextClick()
}

function selectAdvancedPlan() {
  deselectPlan()
  document.getElementById("plan-2").classList.add("plan-selected")
  information.plan = "Advanced"
  information.planAmount = 12
  enableNextClick()
}

function selectProPlan() {
  deselectPlan()
  document.getElementById("plan-3").classList.add("plan-selected")
  information.plan = "Pro"
  information.planAmount = 15
  enableNextClick()
}

function displaySummary() {
  console.log("dispaly summary " + information.plan)
  let table = document.getElementById("billing-table");
  table.innerHTML = ""
  let planRow = document.createElement("tr");
  planRow.innerHTML = "<th align='left'>" + information.plan + "</th>"
    + "<th align='right'>$" + information.planAmount + "/mo</th>"
  table.append(planRow)

  if (information.addOn.onlineService) {
    let addOnRow = document.createElement("tr");
    addOnRow.innerHTML = "<td> Online Service </td>"
      + "<td align='right'>$1/mo</td>"
    table.append(addOnRow)
  }

  if (information.addOn.largerStorage) {
    let addOnRow = document.createElement("tr");
    addOnRow.innerHTML = "<td> Larger Storage </td>"
      + "<td align='right'>$1/mo</td>"
    table.append(addOnRow)
  }

  if (information.addOn.customizableProfile) {
    let addOnRow = document.createElement("tr");
    addOnRow.innerHTML = "<td> Customizable Profile </td>"
      + "<td align='right'>$1/mo</td>"
    table.append(addOnRow)
  }

  let total = information.planAmount
  if (information.addOn.onlineService) total = total + 1
  if (information.addOn.largerStorage) total = total + 1
  if (information.addOn.customizableProfile) total = total + 1

  document.getElementById("total-amount-value").innerHTML = "$" + total + "/mo"
}