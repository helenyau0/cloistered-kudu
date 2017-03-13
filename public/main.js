

function strikeThrough() {
  var checkId = this.id.replace("checkId", "")
  var newLi = document.getElementById('li' + checkId)
  if(this.checked) {
    newLi.style.textDecoration = 'line-through'
  } else {
    newLi.style.textDecoration = "none";
  }
}
var totalItems = 0;

function submitButton() {
  totalItems++

  var checkBox = document.createElement('input')
  checkBox.type = 'checkbox'
  checkBox.id = "checkId" + totalItems
  checkBox.onclick = strikeThrough
  checkBox.contentEditable = "false"

  var input = document.getElementById('input').value
  document.getElementById('input').value = ""

  var li = document.createElement('li')
  li.id = "li" + totalItems
  var textNode = document.createTextNode(input)
  li.appendChild(checkBox)
  li.appendChild(textNode)
  li.contentEditable = 'true'

  var listItems = document.getElementById('listItems')
  listItems.appendChild(li)
}
