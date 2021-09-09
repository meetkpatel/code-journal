/* global data */
/* exported data */
var $noEntry = document.querySelector('#noentry');
var $displayEntriesDiv = document.querySelector('#displayEntries');
var $imgurl = document.querySelector('#photoUrl');
var $imageDisplay = document.querySelector('#imageDisplay');
var $formJournal = document.querySelector('#form-journal');
var $view = document.querySelectorAll('.view');
var $navBar = document.querySelector('.navBar');
var $entriesBar = document.querySelector('.entriesBar');

$navBar.addEventListener('click', handleViewNavigation);
$entriesBar.addEventListener('click', handleViewNavigation);

function handleViewNavigation(event) {
  if (!event.target.matches('A')) {
    return;
  }
  switchView(event.target.getAttribute('data-view'));
}

function imgUrlInput(event) {
  var imgsrc = event.target.value;
  $imageDisplay.setAttribute('src', imgsrc);
}

function formJournalSubmit(event) {
  event.preventDefault();
  var newObj = {};
  newObj.title = $formJournal.elements.title.value;
  newObj.imgsrc = $formJournal.elements.photoUrl.value;
  newObj.notes = $formJournal.elements.notes.value;
  newObj.entryId = data.nextEntryId;
  data.nextEntryId += 1;
  data.entries.unshift(newObj);
  $imageDisplay.setAttribute('src', 'images/placeholder-image-square.jpg');
  $formJournal.reset();
  var $entriesFetch = domTree(newObj);
  $displayEntriesDiv.prepend($entriesFetch);
  switchView('entries');
  $noEntry.className = 'hidden';
}

$imgurl.addEventListener('input', imgUrlInput);
$formJournal.addEventListener('submit', formJournalSubmit);

function domTree(entriesData) {
  var $ul = document.createElement('ul');
  var $li = document.createElement('li');
  var $row = document.createElement('div');
  var $columnHalfImg = document.createElement('div');
  var $columnHalfText = document.createElement('div');
  var $columnHalfTitle = document.createElement('div');
  var $columnHalfPara = document.createElement('div');
  var $imgElement = document.createElement('img');
  var $titleH3 = document.createElement('h3');
  var $para = document.createElement('p');

  $row.setAttribute('class', 'row');
  $columnHalfImg.setAttribute('class', 'column-half img-block');
  $columnHalfText.setAttribute('class', 'column-half text-block');
  $columnHalfTitle.setAttribute('class', 'column-half title-block width-100 font-family-proza');
  $columnHalfPara.setAttribute('class', 'column-half para-block width-100 font-family-proza');
  $imgElement.setAttribute('src', entriesData.imgsrc);

  $ul.appendChild($li);
  $li.appendChild($row);
  $row.appendChild($columnHalfImg);
  $columnHalfImg.appendChild($imgElement);
  $row.appendChild($columnHalfText);
  $columnHalfText.appendChild($columnHalfTitle);
  $columnHalfTitle.appendChild($titleH3);
  $columnHalfText.appendChild($columnHalfPara);
  $columnHalfPara.appendChild($para);

  $titleH3.textContent = entriesData.title;
  $para.textContent = entriesData.notes;
  return $ul;
}

function switchView(viewSwitch) {
  data.view = viewSwitch;
  for (var i = 0; i < $view.length; i++) {
    if ($view[i].getAttribute('data-view') === viewSwitch) {
      $view[i].className = 'view';
    } else {
      $view[i].className = 'view hidden';
    }
  }
}

function DOMContentLoadedCall(event) {
  if (data.entries.length !== 0) {
    $noEntry.className = 'hidden';
    for (var i = 0; i < data.entries.length; i++) {
      var $entriesFetch = domTree(data.entries[i]);
      $displayEntriesDiv.appendChild($entriesFetch);
    }
  } else {
    $noEntry.className = 'shows';
  }

}

window.addEventListener('DOMContentLoaded', DOMContentLoadedCall);

switchView(data.view);
