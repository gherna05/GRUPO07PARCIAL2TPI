var fila =
  "<tr><td class='id'></td><td class='foto'></td><td class='price'></td><td class='name'></td><td class='category'></td><td class='action'></td><td class='editar'></td></tr>";
var moviles = null;
URL = "http://localhost:3000/moviles";
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
  btneditar = document.getElementsByClassName("editar");
  

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
    
    names[i].addEventListener('click',function(e){
      e.preventDefault();
      window.location.href = `../appGrupo07/detalles.html?id=${mov.id}`
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
    
     //ingresando boton eliminar
     btneditar[i].innerHTML = "<button>Editar</button>";
     btneditar[i].firstChild.setAttribute("class", "edit");
     btneditar[i].firstChild.setAttribute("id", mov.id);
     btneditar[i].firstChild.setAttribute(
       "onclick",
       `editarMovil(${mov.id})`
     );
     btneditar[i].addEventListener('click',function(e){
      e.preventDefault();
    })   
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
}

const editarMovil = (id) => {
  let movil = {};
  moviles.filter(mov => {
    if(mov.id == id){
      movil = mov
    }
  })
  document.querySelector('#editMovil #id').value = id;
  document.querySelector('#editMovil #modelo').value = movil.modelo;
  document.querySelector('#editMovil #pantalla').value = movil.pantalla;
  document.querySelector('#editMovil #procesador').value = movil.procesador;
  document.querySelector('#editMovil #almacenamiento').value = movil.almacenamiento;
  document.querySelector('#editMovil #ram').value = movil.RAM;
  document.querySelector('#editMovil #camara').value = movil.camara;
  document.querySelector('#editMovil #precio').value = movil.precio;
  document.querySelector('#editMovil #image').value = movil.image;
  $("#editMovilModal").modal('show');
}

const actualizarMovil = () => {
  const movil = {
    id : document.querySelector('#editMovil #id').value,
    image : document.querySelector('#editMovil #image').value,
    category : document.querySelector('#editMovil #categoria').value,
    modelo : document.querySelector('#editMovil #modelo').value,
    pantalla : document.querySelector('#editMovil #pantalla').value,
    precio : document.querySelector('#editMovil #precio').value,
    procesador: document.querySelector('#editMovil #procesador').value,
    RAM: document.querySelector('#editMovil #ram').value,
    almacenamiento: document.querySelector('#editMovil #almacenamiento').value,
    camara: document.querySelector('#editMovil #camara').value
  }

  fetch('http://localhost:3000/moviles/'+movil.id,{
    method:'PUT',
    body:JSON.stringify(movil),
    headers:{
			'Content-Type':'Application/json'
		}
  })
  .then((res) => res.json())
  .catch (err => console.log(err))
  .then((response) => {
      console.log(response);
      obtenerMoviles();
    });

} 
