// DOM Elements
const contactForm = document.getElementById("contactForm");
const contactsContainer = document.querySelector(".contactList");
const nameInput = contactForm["name"];
const phoneInput = contactForm["phone"];
const mailInput = contactForm["mail"];
const cityInput = contactForm["city"];
let deleteIndex = [];

const contacts = JSON.parse(localStorage.getItem("contacts")) || [];

const addContact = (name, phone, mail, city) => {
	contacts.push({
		name,
		phone,
		mail,
		city,
	});

	localStorage.setItem("contacts", JSON.stringify(contacts));

	return { name, phone, mail, city };
};

// function deleteContact() {
// 	// contacts.splice(0, 1);
// 	// console.log(deleteDiv);
// 	// deleteDiv.remove();

// 	localStorage.setItem("contacts", JSON.stringify(contacts));

// 	contactsContainer.style.display = contacts.length == 0 ? "none" : "flex";
// }

const createContactElement = ({ name, phone, mail, city }) => {
	const contactDiv = document.createElement("tr");
	contactDiv.classList.add("contact");
	const contactName = document.createElement("td");
	const contactPhone = document.createElement("td");
	const contactPhoneLink = document.createElement("a");
	const contactMail = document.createElement("td");
	const contactCity = document.createElement("td");

	// const contactDelete = document.createElement("button");

	contactName.innerText = name;
	contactPhoneLink.innerText = phone;
	contactPhoneLink.href = "https://wa.me/55" + phone;
	contactPhoneLink.target = "_blank";
	contactPhone.appendChild(contactPhoneLink);
	contactMail.innerText = mail;
	contactCity.innerText = city;

	contactDiv.append(contactName, contactPhone, contactMail, contactCity);

	var td = document.createElement("TD");
	var txt = document.createTextNode("\u00D7");
	td.className = "close";
	td.appendChild(txt);
	contactDiv.appendChild(td);

	contactsContainer.appendChild(contactDiv);

	// for (i = 0; i < close.length; i++) {
	// 	close[i].onclick = function () {
	// 		var div = this.parentElement;
	// 		div.style.display = "none";
	// 	};
	// }

	// contactsContainer.style.display = contacts.length == 0 ? "none" : "flex";
};
// contactsContainer.style.display = contacts.length == 0 ? "none" : "flex";

contacts.forEach(createContactElement);

contactForm.onsubmit = (e) => {
	e.preventDefault();

	const newContact = addContact(
		nameInput.value,
		phoneInput.value,
		mailInput.value,
		cityInput.value
	);

	createContactElement(newContact);

	nameInput.value = "";
	phoneInput.value = "";
	mailInput.value = "";
	cityInput.value = "";

	nameInput.focus();

	close = document.getElementsByClassName("close");
	console.log(close.length - 1);
	var i = 0;
	for (i = 0; i < close.length; i++) {
		deleteIndex.push(i);
		let index = i;
		console.log("Before click: " + index);
		close[i].onclick = function () {
			var div = this.parentElement;
			console.log(index);
			contacts.splice(index, 1);
			div.remove();

			deleteIndex = [];

			localStorage.setItem("contacts", JSON.stringify(contacts));

			// contactsContainer.style.display = contacts.length == 0 ? "none" : "flex";
			redefineCloses();
		};
	}

	// createCloseButton();
	// redefineCloses();
};

// Create a "close" button and append it to each list item
function createCloseButton() {
	var contactList = document.querySelectorAll(".contact");
	var i;
	for (i = 0; i < contactList.length; i++) {
		// console.log(contactList[i].children);
		if (contactList[i].lastChild.className == "close") {
			console.log("Already has a close button");
			return;
		}
		var td = document.createElement("TD");
		var txt = document.createTextNode("\u00D7");
		td.className = "close";
		td.appendChild(txt);
		contactList[i].appendChild(td);
		// console.log(contactList[i].lastChild.className);
		// console.log(contactList[i].children);
	}
}

createCloseButton();

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
	// console.log(i);
	deleteIndex.push(i);
	let index = deleteIndex[i];
	close[i].onclick = function () {
		var div = this.parentElement;
		// div.style.display = "none";
		console.log(deleteIndex[index]);
		contacts.splice(deleteIndex[index], 1);
		div.remove();

		deleteIndex = [];

		// close = document.getElementsByClassName("close");
		// var a;
		// for (a = 0; a < close.length; a++) {
		// 	deleteIndex.push(a);
		// 	index = deleteIndex[a];
		// 	console.log("New Index: " + deleteIndex[index]);
		// }

		localStorage.setItem("contacts", JSON.stringify(contacts));

		// contactsContainer.style.display = contacts.length == 0 ? "none" : "flex";
		redefineCloses();
	};
}

function redefineCloses() {
	close = document.getElementsByClassName("close");
	i = 0;
	for (i = 0; i < close.length; i++) {
		deleteIndex.push(i);
		let index = deleteIndex[i];
		close[i].onclick = function () {
			var div = this.parentElement;
			console.log(deleteIndex[index]);
			contacts.splice(deleteIndex[index], 1);
			div.remove();

			deleteIndex = [];

			localStorage.setItem("contacts", JSON.stringify(contacts));

			// contactsContainer.style.display = contacts.length == 0 ? "none" : "flex";
			redefineCloses();
		};
	}
}

function searchContact() {
	var input, filter, table, tr, i, ii;
	input = document.getElementById("searchInput");
	filter = input.value.toUpperCase();
	table = document.getElementById("contacts");
	tr = table.querySelectorAll("tbody tr");
	for (i = 0; i < tr.length; i++) {
		var tds = tr[i].getElementsByTagName("td");
		var found = false;
		for (ii = 0; ii < tds.length && !found; ii++) {
			if (tds[ii].textContent.toUpperCase().indexOf(filter) > -1) {
				found = true;
				break;
			}
		}
		tr[i].style.display = found ? "" : "none";
	}
}

// // Defines table variables.
// let contactTable;
// let tableName;
// let tablePhone;
// let tableMail;
// let tableCity;

// // Defines input variables.
// let inputName = document.querySelector("input[name='contact-name']");
// let inputPhone = document.querySelector("input[name='contact-phone']");
// let inputMail = document.querySelector("input[name='contact-mail']");
// let inputCity = document.querySelector("input[name='contact-city']");

// // Array holding the contacts table info.
// let contactList = [
// 	{
// 		name: "Test 1",
// 		phone: "2222-2222",
// 		mail: "test@example.com",
// 		city: "City",
// 	},
// 	{
// 		name: "Test 2",
// 		phone: "3333-3333",
// 		mail: "test@example.com",
// 		city: "City",
// 	},
// 	{
// 		name: "Test 3",
// 		phone: "4444-4444",
// 		mail: "test@example.com",
// 		city: "City",
// 	},
// ];

// let contactList_serialized;

// let contactList_deserialized;

// console.log(contactList_deserialized);

// // Loop that fills the table with the saved contacts info.
// for (let i = 0; i < contactList.length; i++) {
// 	console.log("test");
// 	contactTable = document.querySelector("#contacts").insertRow(-1);
// 	tableName = contactTable.insertCell(0);
// 	tablePhone = contactTable.insertCell(1);
// 	tableMail = contactTable.insertCell(2);
// 	tableCity = contactTable.insertCell(3);

// 	tableName.innerHTML = contactList[i].name;
// 	tablePhone.innerHTML = contactList[i].phone;
// 	tableMail.innerHTML = contactList[i].mail;
// 	tableCity.innerHTML = contactList[i].city;
// }

// function addContact(id) {
// 	// Adds the input values to the table.
// 	tableName.innerHTML = inputName.value;
// 	tablePhone.innerHTML = inputPhone.value;
// 	tableMail.innerHTML = inputMail.value;
// 	tableCity.innerHTML = inputCity.value;

// 	contactList_serialized = JSON.stringify(contactList);
// 	localStorage.setItem("contactList", contactList_serialized);

// 	let contactList_deserialized = JSON.parse(
// 		localStorage.getItem("contactList")
// 	);

// 	inputName.value = "";
// 	inputPhone.value = "";
// 	inputMail.value = "";
// 	inputCity.value = "";
// }
