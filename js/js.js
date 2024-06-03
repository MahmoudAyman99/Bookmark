var bookmarkNameInput = document.getElementById('bookmarkName');
var bookmarkUrlInput = document.getElementById('bookmarkURL');
var submitBtn = document.querySelector('#submitBtn');
var boxInfo = document.querySelector('.box-info');
var closeBtn = document.querySelector('#closeBtn');
var deleteAllItem = document.querySelector('#deleteAllItems');
var bookmarkList=[];

if ( localStorage.getItem('websitesContainer') !== null ){
    bookmarkList = JSON.parse(localStorage.getItem('websitesContainer'));
displayData();
}




closeBtn.addEventListener('click' , function (){
  boxInfo.classList.replace('d-flex','d-none');
})
deleteAllItem.addEventListener('click' , function (){
  deleteAllItems();
})

submitBtn.addEventListener('click' , function (){
  if (bookmarkNameInput.classList.contains('is-invalid') || bookmarkUrlInput.classList.contains('is-invalid') || bookmarkUrlInput.value == '' || bookmarkNameInput.value == '' )
    {
      boxInfo.classList.replace('d-none','d-flex');
      
    }
  else {
    addWebsite();
    deleteAllItem.classList.replace('d-none', 'd-flex');
    bookmarkUrlInput.classList.remove('is-valid');
    bookmarkNameInput.classList.remove('is-valid');
    
  }
})

function addWebsite(){
    var website = {
        WebsiteName : bookmarkNameInput.value,
        websiteUrl : bookmarkUrlInput.value,
    }
    bookmarkList.push(website);
    localStorage.setItem('websitesContainer' , JSON.stringify( bookmarkList ))
    clear();
    displayData();
    
}

function clear(){
    bookmarkNameInput.value = null;
    bookmarkUrlInput.value = null;
}
function displayData(){
    var container =``;
    for(var i = 0; i < bookmarkList.length; i++ ){
        container += `<tr>
        <td class ="index">${i+1}</td>
        <td>${bookmarkList[i].WebsiteName}</td>              
        <td>
          <a class="btn btn-visit" data-index="0" href="${bookmarkList[i].websiteUrl}" target="_blank">
            <i class="fa-solid fa-eye pe-2"></i>Visit
          </a>
        </td>
        <td>
          <button class="btn btn-delete pe-2" data-index="0"  onclick = "deleteItem(${i})">
            <i class="fa-solid fa-trash-can"></i>
            Delete
          </button>
        </td>
    </tr>`
    }
    document.getElementById('tableContent').innerHTML = container;
}
function deleteItem(indexItem){
    bookmarkList.splice( indexItem , 1);
    localStorage.setItem('websitesContainer' , JSON.stringify( bookmarkList ))
    displayData();
}
function deleteAllItems(){
  bookmarkList.splice( 0 , bookmarkList.length+1);
  localStorage.setItem('websitesContainer' , JSON.stringify( bookmarkList ))
  displayData();
  
deleteAllItem.classList.replace('d-flex', 'd-none');
}
function validatWebsiteName(){
  var regex1 = /\w{3}$/;
  if (regex1.test(bookmarkNameInput.value)){
    bookmarkNameInput.classList.remove('is-invalid');
    bookmarkNameInput.classList.add('is-valid');
    submitBtn.classList.replace('btn-submitinvalid','btn-submit');
  }
  else {
    bookmarkNameInput.classList.add('is-invalid');
    submitBtn.classList.replace('btn-submit','btn-submitinvalid');
  }
}
bookmarkNameInput.addEventListener("keyup", function()
{
  validatWebsiteName();
})
function validatWebsiteUrl(){
  var regex2 = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
  if (regex2.test(bookmarkUrlInput.value)){
    bookmarkUrlInput.classList.remove('is-invalid');
    bookmarkUrlInput.classList.add('is-valid');
    submitBtn.classList.replace('btn-submitinvalid','btn-submit');
  }
  else {
    bookmarkUrlInput.classList.add('is-invalid');
    submitBtn.classList.replace('btn-submit','btn-submitinvalid');
  }
}
bookmarkUrlInput.addEventListener("keyup", function()
{
  validatWebsiteUrl();
})
if (bookmarkList.length !=0){
  
  deleteAllItem.classList.replace('d-none', 'd-flex');
}