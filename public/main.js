function update(event) {
  prompt('Fill me out');

}


function strikeThrough(event) {
  if(target.clicked) {
    style.textDecoration = 'line-through'
  } else {
    todo.id.style.textDecoration = "none";
  }
}

var totalItems = 0;

function deleteOption(e) {
  e.target.parentElement.removeChild(e.target);
}

function submitButton() {
  totalItems++
  var input = document.getElementById('input').value

  if(input != "" || input != " ") {
    var checkBox = document.createElement('input')
    checkBox.type = 'checkbox'
    checkBox.id = "checkId" + totalItems
    checkBox.onclick = strikeThrough
    checkBox.contentEditable = "false"

    document.getElementById('input').value = ""

    var li = document.createElement('li')
    li.id = "li" + totalItems
    var textNode = document.createTextNode(input)
    li.appendChild(checkBox)
    li.appendChild(textNode)
    li.ondblclick = deleteOption
    li.contentEditable = 'true'

    var listItems = document.getElementById('listItems')
    listItems.appendChild(li)
  }
}
