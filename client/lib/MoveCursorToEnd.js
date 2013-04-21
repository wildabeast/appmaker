/**
 * Move cursor to the end of the contenteditable div
 *
 * @param {HTMLElement}
 */
var MoveCursorToEnd = function(element)
{
  if (!element) {return null}
  var range, text_selection
  if (document.createRange) {
    range = document.createRange()//Create a range (a range is a like the selection but invisible)
    range.selectNodeContents(element)//Select the entire contents of the element with the range
    range.collapse(false)//collapse the range to the end point. false means collapse to end rather than the start
    text_selection = window.getSelection()//get the selection object (allows you to change selection)
    text_selection.removeAllRanges()//remove any selections already made
    text_selection.addRange(range)//make the range you have just created the visible selection
  }
}
