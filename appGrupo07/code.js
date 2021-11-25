var fila="<tr><td class='id'></td><td class='foto'></td><td class='price'></td><td class='name'></td><td class='description'></td><td class='category'></td><td class='action'></td></tr>";
	 var moviles=null;
  function codigoCat(catstr) {
	var code="null";
	switch(catstr) {
		case "a":code="c1";break;
	    case "b":code="c2";break;
		case "c":code="c3";break;
		case "d":code="c4";break;
	}
	return code;
}   
	  var orden=0;
	  
	  
	function listarMoviles(moviles) {
	  var precio=document.getElementById("price"); 
	  precio.setAttribute("onclick", "orden*=-1;listarMoviles(moviles);");
	  var num=moviles.length;
	  var listado=document.getElementById("listado");
	  var ids,names,prices,descriptions,categories,fotos,btneliminar;
	  var tbody=document.getElementById("tbody"),nfila=0;
	  tbody.innerHTML="";
	  var catcode;
	  for(i=0;i<num;i++) tbody.innerHTML+=fila;
	  var tr; 
	  ids=document.getElementsByClassName("id");
	  names=document.getElementsByClassName("name");
	  descriptions=document.getElementsByClassName("description");
	  categories=document.getElementsByClassName("category");   
	  fotos=document.getElementsByClassName("foto");   
	  prices=document.getElementsByClassName("price");
	  btneliminar=document.getElementsByClassName("action");    
	  if(orden===0) {orden=-1;precio.innerHTML="Precio"}
	  else
	     if(orden==1) {ordenarAsc(productos,"price");precio.innerHTML="Precio Ascendente";precio.style.color="brown"}
	     else 
	       if(orden==-1) {ordenarDesc(productos,"price");precio.innerHTML="Precio Descendente";precio.style.color="lightpink"}
	
		  
	  	  listado.style.display="block";
	  for(nfila=0;nfila<num;nfila++) {
        ids[nfila].innerHTML=moviles[nfila].id;
		names[nfila].innerHTML=moviles[nfila].title;
		descriptions[nfila].innerHTML=moviles[nfila].description;
		categories[nfila].innerHTML=moviles[nfila].category;
		catcode=codigoCat(moviles[nfila].category);
		tr=categories[nfila].parentElement;
		tr.setAttribute("class",catcode);
		prices[nfila].innerHTML="$"+moviles[nfila].price;
		fotos[nfila].innerHTML="<img src='"+moviles[nfila].image+"'>";
		fotos[nfila].firstChild.setAttribute("onclick","window.open('"+moviles[nfila].image+"');" );
		//ingresando boton eliminar
		btneliminar[nfila].innerHTML="<button>Eliminar</button>";
		btneliminar[nfila].firstChild.setAttribute("class","eliminar");
		btneliminar[nfila].firstChild.setAttribute("id",moviles[nfila].id);
		btneliminar[nfila].firstChild.setAttribute("onclick",'eliminarMovil(${productos[nfila].id})')
		}
	}

function obtenerMoviles() {
	  fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(data=>{productos=data;listarMoviles(data)})
}

function eliminarMovil(id) {
	
}

function ordenarDesc(p_array_json, p_key) {
   p_array_json.sort(function (a, b) {
      if(a[p_key] > b[p_key]) return -1;
if(a[p_key] < b[p_key]) return 1;
return 0;
   });
}

function ordenarAsc(p_array_json, p_key) {
   p_array_json.sort(function (a, b) {
      if(a[p_key] > b[p_key]) return 1;
if(a[p_key] < b[p_key]) return -1;
return 0;
   });
}