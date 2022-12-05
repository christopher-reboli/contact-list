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

const createContactElement = ({ name, phone, mail, city }) => {
	const contactDiv = document.createElement("tr");
	contactDiv.classList.add("contact");
	const contactName = document.createElement("td");
	contactName.classList.add(
		"whitespace-nowrap",
		"px-6",
		"py-4",
		"text-sm",
		"text-gray-400"
	);
	const contactPhone = document.createElement("td");
	contactPhone.classList.add(
		"whitespace-nowrap",
		"px-6",
		"py-4",
		"text-sm",
		"text-gray-400"
	);
	const contactPhoneLink = document.createElement("a");
	contactPhoneLink.classList.add(
		"hover:text-gray-300",
		"hover:underline",
		"transition"
	);
	const contactMail = document.createElement("td");
	contactMail.classList.add(
		"whitespace-nowrap",
		"px-6",
		"py-4",
		"text-sm",
		"text-gray-400"
	);
	const contactCity = document.createElement("td");
	contactCity.classList.add(
		"whitespace-nowrap",
		"px-6",
		"py-4",
		"text-sm",
		"text-gray-400"
	);

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
	td.classList.add(
		"whitespace-nowrap",
		"px-6",
		"py-4",
		"text-sm",
		"text-gray-400",
		"hover:bg-gray-800",
		"hover:text-white",
		"hover:cursor-pointer",
		"transition",
		"text-center"
	);
	td.appendChild(txt);
	contactDiv.appendChild(td);

	contactsContainer.appendChild(contactDiv);
};

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

			redefineCloses();
		};
	}
};

// Create a "close" button and append it to each list item
function createCloseButton() {
	var contactList = document.querySelectorAll(".contact");
	var i;
	for (i = 0; i < contactList.length; i++) {
		if (contactList[i].lastChild.classList.contains("close")) {
			console.log("Already has a close button");
			return;
		}
		var td = document.createElement("TD");
		var txt = document.createTextNode("\u00D7");
		td.className = "close";
		td.appendChild(txt);
		contactList[i].appendChild(td);
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
		console.log(deleteIndex[index]);
		contacts.splice(deleteIndex[index], 1);
		div.remove();

		deleteIndex = [];

		localStorage.setItem("contacts", JSON.stringify(contacts));

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
