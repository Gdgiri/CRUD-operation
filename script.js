let input = document.getElementById("input");
let inputEmail = document.getElementById("inputEmail");
let inputDate = document.getElementById("inputDate");
let button = document.getElementById("addItem");
let itemList = document.getElementById("itemList");
let searchInput = document.getElementById("searchInput");
let arr = [];

window.onload = () => {
  let gets = localStorage.getItem("datas");
  if (gets) {
    arr = JSON.parse(gets);
    display();
  }
};

button.addEventListener("click", () => {
  if (
    input.value.trim() !== "" &&
    inputEmail.value.trim() !== "" &&
    inputDate.value.trim() !== ""
  ) {
    arr.push({
      name: input.value.trim(),
      email: inputEmail.value.trim(),
      dob: inputDate.value.trim(),
    });
    display();
    input.value = "";
    inputEmail.value = "";
    inputDate.value = "";
  }
});

searchInput.addEventListener("input", display);

function display() {
  itemList.innerHTML = "";
  localStorage.setItem("datas", JSON.stringify(arr));
  const searchQuery = searchInput.value.toLowerCase();
  arr.forEach((item, index) => {
    if (item.name.toLowerCase().includes(searchQuery)) {
      let li = document.createElement("li");

      li.style.listStyleType = "none";

      let nameInput = document.createElement("input");
      nameInput.type = "text";
      nameInput.value = item.name;
      nameInput.readOnly = true;

      let emailInput = document.createElement("input");
      emailInput.type = "text";
      emailInput.value = item.email;
      emailInput.readOnly = true;

      let dateInput = document.createElement("input");
      dateInput.type = "date";
      dateInput.value = item.dob;
      dateInput.readOnly = true;

      li.appendChild(nameInput);
      li.appendChild(emailInput);
      li.appendChild(dateInput);

      let delBtn = document.createElement("button");
      delBtn.innerHTML = "🗑️";
      delBtn.addEventListener("click", () => {
        del(index);
      });

      let editBtn = document.createElement("button");
      editBtn.innerHTML = "📝";
      editBtn.className = "editBtn";
      editBtn.addEventListener("click", () => {
        edit(index);
      });

      li.append(editBtn, delBtn);
      itemList.append(li);
    }
  });
}

function edit(index) {
  const li = itemList.children[index];
  const nameInput = li.querySelector("input[type='text']:first-of-type");
  const emailInput = li.querySelector("input[type='text']:nth-of-type(2)");
  const dateInput = li.querySelector("input[type='date']");
  const editButton = li.querySelector(".editBtn");

  if (nameInput.readOnly) {
    nameInput.readOnly = false;
    emailInput.readOnly = false;
    dateInput.readOnly = false;
    nameInput.focus();
    editButton.innerHTML = "Save";
  } else {
    nameInput.readOnly = true;
    emailInput.readOnly = true;
    dateInput.readOnly = true;
    arr[index].name = nameInput.value.trim();
    arr[index].email = emailInput.value.trim();
    arr[index].dob = dateInput.value.trim();
    editButton.innerHTML = "📝";
    display();
  }
}

function del(index) {
  arr.splice(index, 1);
  display();
}
