function submitButton() {
  var checkBox = document.createElement('input')
  checkBox.setAttribute('type', 'checkbox')

  var input = document.getElementById('input').value
  document.getElementById('input').value = ""
  
  var li = document.createElement('li')
  var textNode = document.createTextNode(input)
  li.appendChild(checkBox)
  li.appendChild(textNode)
  var listItems = document.getElementById('listItems')
  listItems.appendChild(li)
}
