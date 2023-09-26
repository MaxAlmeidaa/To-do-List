const input = document.getElementById("inputTask");
const btnAddTask = document.getElementById("btnAddTask");
const ulList = document.getElementById("list");
const btnRemoveAll = document.getElementById("btnRemoveAll");
const number = document.getElementById("number");
let count = 0;

function removeItem(lista, item, check) {
  if (check.checked) {
    count -= 1;
    lista.remove(item);
    number.innerText = count;
  } else {
    lista.remove(item);
  }
}
function removeAll(item) {
  item.remove();
  count = 0;
  number.innerText = count;
}
function verifyInput(txt) {
  if (!txt.trim()) {
    alert("Você esta tentando inserir um item vazio");
    input.value = "";
  } else {
    input.placeholder = "O campo esta vazio! Digite Algo!";
    input.placeholder = "Digite algo";
    addTask(txt);
    input.value = "";
  }
}

function addTask(inputValue) {
  const checkItem = document.createElement("input");
  const itemLi = document.createElement("li");
  const editTask = document.createElement("img");
  const spanItem = document.createElement("span");
  const confirmItem = document.createElement("img");
  const editInput = document.createElement("input");
  const backItem = document.createElement("img");
  const divIcons = document.createElement("div");
  divIcons.type = "div";
  divIcons.className = "divIcon";
  backItem.className = "backItem";
  backItem.setAttribute("src", "assets/imgs/x-square.svg");
  editInput.type = "text";
  editInput.className = "editInput";
  confirmItem.className = "confirmItem";
  editTask.setAttribute("src", "assets/imgs/pencil-square.svg");
  checkItem.type = "checkbox";
  checkItem.className = "checkItem";
  spanItem.className = "spanItem";
  spanItem.textContent = inputValue;
  itemLi.id = "itemEdited";
  editTask.className = "editTask";
  ulList.appendChild(itemLi);
  divIcons.appendChild(editTask);
  divIcons.appendChild(backItem);
  divIcons.appendChild(confirmItem);
  itemLi.appendChild(divIcons);
  itemLi.appendChild(spanItem);
  itemLi.appendChild(checkItem);

  btnRemoveAll.addEventListener("click", () => removeAll(itemLi));

  checkItem.addEventListener("click", () => taskDone(checkItem, itemLi));

  editTask.addEventListener("click", () =>
    editTasker(itemLi, editInput, spanItem, checkItem, backItem, ulList)
  );

  editInput.addEventListener("input", () =>
    inputNew(
      editInput,
      confirmItem,
      spanItem,
      editInput,
      itemLi,
      checkItem,
      backItem
    )
  );

  backItem.addEventListener("click", () =>
    removeItem(itemLi, ulList, checkItem)
  );
}

function taskDone(itemCheck) {
  if (itemCheck.checked) {
    count += 1;
    number.innerText = count;
    itemCheck.parentElement.style.textDecoration = "line-through";
    itemCheck.parentElement.style.color = "black";
  } else {
    count -= 1;
    number.innerText = count;
    itemCheck.parentElement.style.textDecoration = "none";
    itemCheck.parentElement.style.color = "";
  }
}

function editTasker(newLi, openInput, span, check, back) {
  back.style.display = "none";
  check.style.display = "none";
  openInput.value = span.textContent;
  newLi.appendChild(openInput);
  span.style.display = "none";
}

function inputNew(txtInput, confirmationItem, span, input, item, check, x) {
  if (txtInput.value === "") {
    confirmationItem.style.display = "none";
  } else {
    confirmationItem.setAttribute("src", "assets/imgs/check-square-copy.svg");
    confirmationItem.style.display = "block";
    const conteudoSpan = span.textContent;
    const novoInput = txtInput.value;

    confirmationItem.addEventListener("click", function () {
      span.textContent = novoInput;
      input.style.display = "none";
      span.style.display = "inline-block";
      confirmationItem.style.display = "none";
      check.style.display = "block";
      item.appendChild(check);
      x.style.display = "block";
    });
  }
}

btnAddTask.addEventListener("click", () => verifyInput(input.value));
