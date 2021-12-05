var fila =
  "<tr><td class='id'></td><td class='foto'></td><td class='price'></td><td class='name'></td><td class='category'></td><td class='action'><td class='edit'></td></tr>";
var moviles = null;
URL = 'http://localhost:3000/moviles';
function codigoCat(catstr) {
  var code = "null";
  switch (catstr) {
    case "Samsumg":
      code = "c1";
      break;
    case "LG":
      code = "c2";
      break;
    case "Huawei":
      code = "c3";
      break;
    case "Apple":
      code = "c4";
      break;
  }
  return code;
}
var orden = 0;

function listarMoviles(moviles) {
  var precio = document.getElementById("price");
  precio.setAttribute("onclick", "orden*=-1;listarMoviles(moviles);");
  var num = moviles.length;
  var listado = document.getElementById("listado");
  var ids, names, prices, descriptions, categories, fotos, btneliminar, btneditar;
  var tbody = document.getElementById("tbody"),
    nfila = 0;
  tbody.innerHTML = "";
  var catcode;
  for (i = 0; i < num; i++) tbody.innerHTML += fila;
  var tr;
  ids = document.getElementsByClassName("id");
  names = document.getElementsByClassName("name");
  /*descriptions = document.getElementsByClassName("description"); */
  categories = document.getElementsByClassName("category");
  fotos = document.getElementsByClassName("foto");
  prices = document.getElementsByClassName("price");
  btneliminar = document.getElementsByClassName("action");
  btneditar = document.getElementsByClassName("edit") ;



  if (orden === 0) {
    orden = -1;
    precio.innerHTML = "Precio";
  } else if (orden == 1) {
    ordenarAsc(moviles, "precio");
    precio.innerHTML = "Precio Ascendente";
    precio.style.color = "brown";
  } else if (orden == -1) {
    ordenarDesc(moviles, "precio");
    precio.innerHTML = "Precio Descendente";
    precio.style.color = "lightpink";
  }

  listado.style.display = "block";

  /* Cambien el ciclo FOR que venia en el ejemplo por un FOREACH */
  var i = 0;
  moviles.forEach(mov => {
    ids[i].innerHTML = mov.id;
    names[i].innerHTML = mov.modelo;

    names[i].addEventListener('click', function () {
      window.location.href = `./detalles.html?id=${mov.id}`
    })

    /*descriptions[nfila].innerHTML = moviles[nfila].description; */
    categories[i].innerHTML = mov.category;
    catcode = codigoCat(mov.category);
    tr = categories[i].parentElement;
    tr.setAttribute("class", catcode);
    prices[i].innerHTML = "$" + mov.precio;
    fotos[i].innerHTML = "<img src='" + mov.image + "'>";
    fotos[i].firstChild.setAttribute(
      "onclick",
      "window.open('" + mov.image + "');"
    );
    //ingresando boton eliminar
    btneliminar[i].innerHTML = "<button>Eliminar</button>";
    btneliminar[i].firstChild.setAttribute("class", "eliminar");
    btneliminar[i].firstChild.setAttribute("id", mov.id);
    btneliminar[i].firstChild.setAttribute("onclick","eliminarMovil("+mov.id+")" );
    
    btneditar[i].innerHTML="<button>Editar</button>";
    btneliminar[i].firstChild.setAttribute("class", "editar");
    btneliminar[i].firstChild.setAttribute("id", mov.id);
    btneliminar[i].firstChild.setAttribute("onclick","editMovil("+mov.id+")" );
    i++;
  });
}

function obtenerMoviles() {
  fetch("http://localhost:3000/moviles")
    .then((res) => res.json())
    .then((data) => {
      moviles = data;
      moviles.forEach(
        function (moviles) {
          moviles.precio = parseFloat(moviles.precio)
        });
      listarMoviles(data);
    });
}


function eliminarMovil(id) {
  var url = 'http://localhost:3000/moviles/' + id;
  
  fetch(url, { method: "DELETE" })
    .then(res => res.status)
    .then(codigo => {
      switch (codigo) {
        case 200: alert("producto borrado");
          break;
        case 404: alert("producto no existe"); break;
      }
    });
}

function ordenarDesc(p_array_json, p_key) {
  p_array_json.sort(function (a, b) {
    if (a[p_key] > b[p_key]) return -1;
    if (a[p_key] < b[p_key]) return 1;
    return 0;
  });
}

function ordenarAsc(p_array_json, p_key) {
  p_array_json.sort(function (a, b) {
    if (a[p_key] > b[p_key]) return 1;
    if (a[p_key] < b[p_key]) return -1;
    return 0;
  });
}

obtenerMoviles();

const agregarMovil = () => {
  const formData = new FormData(document.querySelector('#addMovil'));
  const movil = {
    id: 21,
    image: formData.get('image'),
    category: formData.get('categoria'),
    modelo: formData.get('modelo'),
    pantalla: formData.get('pantalla'),
    precio: formData.get('precio'),
    procesador: formData.get('procesador'),
    RAM: formData.get('ram'),
    almacenamiento: formData.get('almacenamiento'),
    camara: formData.get('camara'),
    video: ""
  }
  /* console.log(movil) */
  fetch(URL, {
    method: 'POST',
    body: JSON.stringify(movil),
    headers: {
      'Content-Type': 'Application/json'
    }
  })
    .then((res) => res.json())
    .then((response) => {
      console.log(response);
      obtenerMoviles();
    });


   function editMovil(id){
     
   }

}
