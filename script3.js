

const publicKey = '3745b96821fc3d545eee6bae7b840e72';
const privateKey = 'e67e6b9acd7fc8075c6b63dc8f8ab3babc4b761b';
const apiUrl = 'http(s)://gateway.marvel.com/';
const ts = new Date().getTime();

const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();
var arr = JSON.parse(localStorage.getItem("favourites"));


function showDetails(idnumber) {
  localStorage.setItem("id", idnumber);
  window.location = "index2.html";
}


function removeHero(id) {
  var index = arr.indexOf(id);
  console.log(index);
  arr.splice(index, 1);
  console.log(arr);
  localStorage.setItem("favourites", JSON.stringify(arr));
  alert("Your hero has been successfully removed.");
  location.reload();
}


const fetchData = () => {
  let html = "";
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i])
    var id = arr[i]
    fetch(`http://gateway.marvel.com/v1/public/characters/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`)
      .then((response) => response.json())
      .then((data) => {
        data = data.data.results[0]
        console.log(data)
        html += `
          <div class="card" style="width: 18rem;">
            <img onclick="showDetails(${arr[i]})" class="card-img-top" src="${data.thumbnail.path}.${data.thumbnail.extension}">
            <div class="card-body">
              <h5 class="card-title" onclick="showDetails(${arr[i]})">${data.name}</h5>
              <span><i class="fa-solid fa-xmark icon" onclick="removeHero(${arr[i]})"></i></span>
            </div>
          </div>
        `;
        document.getElementById("fv-main").innerHTML = html;
      });
  }
};


fetchData();
