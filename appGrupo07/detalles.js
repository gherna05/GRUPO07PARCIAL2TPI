const app = document.querySelector('.container')

getUrl = new URLSearchParams(window.location.search);
id = getUrl.get('id');
let url = 'http://localhost:3000/moviles'

console.log(`${url}/${id}`)
fetch(`${url}/${id}`)
    .then(res => res.json())
    .then(data => {
        let datos = '';
        datos += `<img src="${data.image}" >
        <p aling="center"><strong>Modelo: </strong>${data.modelo}</p>
        <p><strong>Pantalla: </strong>${data.pantalla}</p> 
        <p><strong>Procesador: </strong>${data.procesador}</p>
        <p><strong>RAM: </strong>${data.RAM}</p>
        <p><strong>Almacenamiento: </strong>${data.almacenamiento}</p>
        <p><strong>Camara: </strong>${data.camara}</p>`;
        
        document.getElementById('datos').innerHTML = datos;
        
    })
    .catch(err => console.log(err))

    