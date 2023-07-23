const publicKey = '3745b96821fc3d545eee6bae7b840e72';
const privateKey = 'e67e6b9acd7fc8075c6b63dc8f8ab3babc4b761b';
const apiUrl = 'http(s)://gateway.marvel.com/';
const ts = new Date().getTime();

const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();

fetch(`http://gateway.marvel.com/v1/public/characters/${localStorage.getItem(
  "id"
)}?ts=${ts}&apikey=${publicKey}&hash=${hash}`)
  .then((response) => response.json())
  .then((data) => {
    
    data = data.data.results[0]
    console.log(data)
    
    document.getElementById("img").setAttribute("src", `${data.thumbnail.path}.${data.thumbnail.extension}`);
    
    document.getElementById("name").innerHTML = data.name;

    
    document.getElementById("full-name").append(data.name);
    document.getElementById("place").append(data.description);
    document.getElementById("first-appearance").append(data.urls[0].url);
    document.getElementById("publisher").append(data.urls[1].url);


   
  });


