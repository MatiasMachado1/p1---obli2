window.addEventListener('load', inicio);

let sistema = new Sistema();

function inicio(){
    document.getElementById('idBotonAgregarCategoria').addEventListener('click', agregarCat);
    document.getElementById('idBotonBajaCategoria').addEventListener('click', eliminarCat);
    document.getElementById('idBotonAltaExperiencia').addEventListener('click', agregarExp);
    document.getElementById('idBotonBajaExperiencia').addEventListener('click', eliminarExp);
    document.getElementById('idComboCategoriasIzquierda').addEventListener('change', cargarTabla);
    document.getElementById('idComboCategoriasIzquierda').addEventListener('change', cargarCatCompradas);
    document.getElementById('idCantidadPersonasCategoria').addEventListener('change', cargarTabla);
    document.getElementById('idOrdenPrecio').addEventListener('change', cargarTabla);
    document.getElementById('idBotonBajaCategoria').addEventListener('click', deshabilitarCat);
    document.getElementById('idBotonBajaExperiencia').addEventListener('click', deshabilitarExpYComp);
    document.getElementById('idBotonComprar').addEventListener('click', agregarComp);



}

//Funciones genericas

function agregarACombo(padre, texto){
    let nodo = document.createElement('option');
    let nodoTexto = document.createTextNode(texto);
    nodo.appendChild(nodoTexto);
    padre.appendChild(nodo);
}

function habilitarBoton(id, largo){  //Funcion para habilitar y deshabilitar los botones
    let boton = document.getElementById(id);
    if(largo > 0){              //Si hay experiencias el boton se habilita, sino no
        boton.disabled = false; 
    }
    else{
        boton.disabled = true;
    }
}

function cargarLista(lista, texto){
    let nodo = document.createElement('li');
    let nodoTexto = document.createTextNode(texto);
    nodo.appendChild(nodoTexto);
    lista.appendChild(nodo);
}

//Funciones para las categorias

function agregarCat(){          //Agrega una nueva categoria y actualiza los respectivos datos
    let form = document.getElementById('idFormCategoria');
    if(form.reportValidity()){  //Esta condicion devuelve true o false, dependiendo de si el usuario completo todos los campos del formulario
        let nombre = document.getElementById('idNombreCategoria').value;
        let detalles = document.getElementById('idDetallesCategoria').value;
        let cat = new Categoria(nombre, detalles);  //Crea un objeto categoria
        if(!sistema.categoriaRepetida(nombre)){ //Esta condicion devuelve true o false, dependiendo si el nombre de la categoria ya existe, si no existe se agrega, actualiza y se resetea el formulario 
            sistema.agregarCategoria(cat);
            actualizarCat();
            form.reset();
        }else{
            alert('El nombre de la categoria ya fue utilizado');
        }
        habilitarBoton('idBotonBajaCategoria', sistema.darLargoCategorias());
        habilitarBoton('idBotonAltaExperiencia', sistema.darLargoCategorias());
    }
}

function actualizarCat(){       //Actualiza los datos que contengan categorias
    agregarCatCombo();
}

function agregarCatCombo(){     // Agrega las categorias a sus respectivos combos
    let comboCat = document.getElementById('idComboCategoriasIzquierda');
    let comboExp = document.getElementById('idCategoriaExperiencia');
    let combBajaCat = document.getElementById('idComboCategoriasAbajo');
    let listaCat = sistema.darCategorias(); //Llamamos a la funcion darCategorias() que esta en la clase sistema, nos devuelve la lista con todas las categorias
    comboCat.innerHTML = '';    //Se hace para que la lista se vacie cada que agregue una nueva categoría
    combBajaCat.innerHTML = ''; 
    comboExp.innerHTML = '';
    for (let elem of listaCat){ //Va agregando de a un elemento en los combos
        agregarACombo(comboCat, elem.nombre);
        agregarACombo(combBajaCat, elem.nombre);
        agregarACombo(comboExp, elem.nombre);
    }
}

function deshabilitarCat(){ 
    let botonBajaCat = document.getElementById('idBotonBajaCategoria');
    if (sistema.darLargoCategorias() === 0){
        botonBajaCat.disabled = true;
    }
}

function eliminarCat(){         //Elimina la categoria que el usuario desee, si no esta agregada a una experiencia
    let nombreCat = document.getElementById('idComboCategoriasAbajo').value;
    let listaCat = sistema.darCategorias();
    let darCat = sistema.buscarNombreCategoria(nombreCat);
    let posicion = listaCat.indexOf(darCat);
    if(darCat.contadorExperiencia > 0){
        alert('Esta categoría no puede ser eliminada porque está incluida en una experiencia');
    }else{
        sistema.eliminarCategoria(posicion);    //Llamo a la funcion que se encuentra en la clase sistema que elimina la categoria que se encuentra en el paramentro
        actualizarCat();
        habilitarBoton('idBotonAltaExperiencia', sistema.darLargoCategorias());
    }
}

//Funciones para las experiencias

function agregarExp(){          //Agrega una nueva experiencia y actualiza los respectivos datos
    let form = document.getElementById('idFormExperiencia');
    if (form.reportValidity()){
        let titulo = document.getElementById('idTituloExperiencia').value;
        let descripcion = document.getElementById('idDescripcionExperiencia').value;
        let precio = parseInt(document.getElementById('idPrecioExperiencia').value);
        let cantidad = document.getElementById('idCantidadPersonasExperiencia').value;
        let nombreCat = document.getElementById('idCategoriaExperiencia').value;
        let categoria = sistema.buscarNombreCategoria(nombreCat); //Esta funcion de la clase sistema se utiliza para obtener el objeto de la categoría, para poder vincular el objeto completo en la experiencia
        let exp = new Experiencia(titulo, descripcion, precio, cantidad, categoria); //Crea un nuevo objeto de experiencia
        if(!sistema.experienciaRepetida(titulo)){   //Esta condicion devuelve true o false, dependiendo si el título de la experiencia ya existe, si no existe, se agrega, actualiza y se resetea el formulario 
            sistema.agregarExperiencia(exp);    //Agrega una experiencia a la lista que se encuentra en la clase sistema
            sistema.sumaContadorCatExp(categoria.nombre);   //Se suma el contador de categorias, ya que ahora la categoría esta vinculada a esta experiencia
            actualizarExp();
            form.reset();
        }else{
            alert('El titulo de la experiencia ya fue utilizado');
        }
    }
    habilitarBoton('idBotonBajaExperiencia', sistema.darLargoExperiencias());
}

function actualizarExp(){       //Actualiza los datos que contengan experiencias
    agregarExpCombo();
    cargarTabla();
    expMasCara();
}

function agregarExpCombo(){     //Agrega las experiencias a sus respectivos combos
    let comboBaja = document.getElementById('idComboBajaExperiencia');
    let lista = sistema.darExperiencias();  //Devuelve la lista con los objetos de experiencias
    comboBaja.innerHTML = '';   //Se hace para resetear el combo y no repetir las experiencias
    for (let elem of lista){
        agregarACombo(comboBaja, elem.titulo);
    }
}

function eliminarExp(){         //Elimina la experiencia que el usuario desee, si no está incluida en una compra
    let tituloExp = document.getElementById('idComboBajaExperiencia').value;
    let listaExp = sistema.darExperiencias();
    let darExp = sistema.buscarTituloExperiencia(tituloExp);
    let posicion = listaExp.indexOf(darExp);
    if (darExp.contador > 0){
        alert('Esta experiencia no puede ser eliminada porque está incluida en una compra');
    }else{
        sistema.eliminarExperiencia(posicion);    //Llamo a la funcion que se encuentra en la clase sistema, que elimina la experiencia que se encuentra en el paramentro
        actualizarExp();
    }
}

function cargarTabla(){
    //let listaExp = sistema.darExperiencias();
    let listaExp = sistema.precioCreciente();
    let comboCat = document.getElementById('idComboCategoriasIzquierda').value;
    let comboPersonas = document.getElementById('idCantidadPersonasCategoria').value;
    let comboOrden = document.getElementById('idOrdenPrecio').value;
    let tabla = document.getElementById('idTabla');
    let ordenTabla = [];    //Creo un array que va a contener solo los objetos (de la lista de experiencia) que cumplan con la condicion del filtro
    if (comboOrden != '1'){ //Si combo orden es decreciente
        listaExp = sistema.precioDecreciente(); //Llamo a la función que esta en la clase sistema, esta me ordena la lista en funcion del precio, de menor al mayor 
    }
    for (let i = 0; i < sistema.darLargoExperiencias(); i++){
        if(comboPersonas != 'todos'){   //Si es distinto de 'todos' voy a querer que el array (ordenTabla) cumpla con la condicion de cantidad de personas y el nombre de la categoría
            if (comboCat === listaExp[i].categoria.nombre && comboPersonas === listaExp[i].cantidad){   //Si cumple con esta condicion, el objeto en esa posición se agregara al array (ordenTabla)
                ordenTabla.push(listaExp[i]);
            }
        }else{  //Si es igual a 'todos' solo voy a querer filtrarlos por el nombre de la categoría
            if(comboCat === listaExp[i].categoria.nombre){
                ordenTabla.push(listaExp[i]);
            }
        }
    }
    tabla.innerHTML = '';   //Vacio la tabla para que no se repitan celdas con el mismo valor
    for (let j = 0; j < ordenTabla.length; j+=2){   //Con este for obtengo que cada una fila quiero 2 objetos del array (ordenTabla)
        let fila = tabla.insertRow();
        let termine = false;    //Esta variable booleana sirve para parar el for cuando lo desee
        for (let i = 0; i < 2 && !termine; i++){    //Con este otro for obtengo las celdas que van dentro dentro de la fila
            let celda = fila.insertCell();
            let imagen = document.createElement('img'); //Creo un elemento img
            let cuantos = 'uno';    //Esta variable se usa para concatenarla
            if (ordenTabla[j+i].cantidad === 'dos'){
                cuantos = 'dos';
            }else if(ordenTabla[j+i].cantidad === 'varias'){
                    cuantos = 'muchos';
            }
            imagen.src = './img/' + cuantos + '.png';   //Concateno cuantos para obtener la imagen que obtuve con las condiciones anteriores
            let italica = document.createElement('span');   //Creo un elemento span
            italica.setAttribute('style', 'font-style: italic');    //Al elemento span le pongo un estilo de letra llamado 'italic'
            italica.innerHTML = ordenTabla[j+i].descripcion;
            celda.innerHTML = ordenTabla[j+i].titulo + '<br>';  //'<br>'se utilizo para hacer un salto de linea
            celda.appendChild(italica);
            celda.innerHTML += '<br>' + ordenTabla[j+i].precio + '<br>';
            celda.appendChild(imagen);
            celda.addEventListener('click', function (){    //A las celdas le agrego un evento click con su respectiva función 
                let expCompra = document.getElementById('idCualExperiencia');
                let tituloExp = ordenTabla[j+i].titulo;
                let botonComp = document.getElementById('idBotonComprar');
                expCompra.innerHTML = tituloExp;    //Cuando hacemos click en una celda, al parrafo se le da el valor del titulo de la experiencia que tiene dicha celda
                if(document.getElementsByClassName('selected').length > 0){
                    document.getElementsByClassName('selected')[0].className = '';
                    celda.className = 'selected';
                }else{  //Si se hace click en una celda agregamos una clase llamada 'selected', y cuando seleccionamos una celda diferente le vaciamos el nombre a la que tenia la class 'selected' y le ponemos a la que dimos click la clase 'selected'
                    celda.className = 'selected';
                }
                if (expCompra.value != ''){ //Si no tiene valor el boton compra se inhabilita y viceversa
                    botonComp.disabled = false;
                }
                else{
                    botonComp.disabled = true;
                }
            })
            if((ordenTabla.length % 2) != 0 && j === ordenTabla.length-1){  //Si el array (ordenTabla) es impar solo se creara una celda
                termine = true; //Le cambio el valor para que se corte el for
                celda.colSpan = 2;
            }
        }
    }
}

function deshabilitarExpYComp(){    //Deshabilita el boton de eleminar experiencia y el de agregar compra
    let botonBajaExp = document.getElementById('idBotonBajaExperiencia');
    let botonComp = document.getElementById('idBotonComprar');
    let expCompra = document.getElementById('idCualExperiencia')
    if (sistema.darLargoExperiencias() === 0){
        botonBajaExp.disabled = true;
        botonComp.disabled = true;
        expCompra.innerHTML = '';
    }
}

function expMasCara(){  //Escribe la experiencia mas cara en informes
    let parrafo = document.getElementById('idExperienciaMasCara');
    if(sistema.darLargoExperiencias() > 0){
        parrafo.innerHTML = sistema.experienciaMasCara(); //Devuelve la experiencia mas cara
    }else{
        parrafo.innerHTML = 'Sin datos';
    }
}

//Funciones para las compras

function agregarComp(){
    let form = document.getElementById('idFormCompra');
    if(form.reportValidity()){
        let expCompra = document.getElementById('idCualExperiencia').innerHTML;
        let nomComprador = document.getElementById('idNombreComprador').value;
        let mail = document.getElementById('idMail').value;
        let experiencia = sistema.buscarTituloExperiencia(expCompra);   //Busca con el titiulo de la experiencia selecionada en la tabla y devuelve el objeto de dicha experiencia completo
        let compra = new Compra (nomComprador, mail, experiencia, conseguirFechaYHora());   //Creo un nuevo objeto de compra, con la fecha y hora que se realizo la compra
        sistema.agregarCompra(compra);  //Agrega una nueva compra a la lista de compras
        sistema.sumaContadorCatComp(experiencia.categoria.nombre);  //Cuando agrego una compra de la categoria seleccionada el contador suma 1
        sistema.sumaContadorExp(expCompra); //Cuando agrego una compra de la experiencia seleccionada el contador suma 1
        actualizarComp();
        form.reset();
    }
}

function actualizarComp(){
    agregarListaAInforme();
    cargarCatCompradas();
}

function agregarListaAInforme(){    //Agrega la lista de experiencias mas veces compradas
    let listaExp = sistema.contDecreciente();
    let lista = document.getElementById('idExperienciasMasCompradas');
    lista.innerHTML = '';
    if (sistema.darLargoCompras() > 0){
        for (let elem of listaExp){
            if(elem.contador > 0){  //Si el contador de la experiencia es mayor a 0, esta sera agregada a la lista
               cargarLista(lista, elem.titulo); 
            }
        }
    }else{
        cargarLista(lista, 'Sin datos');
    }

}

function conseguirFechaYHora(){     //Devuelve la fecha y hora en la que se hizo click
    let d = new Date();
    let hora = d.getHours();
    let minutos = d.getMinutes();
    let fecha = d.toLocaleDateString();
    if (hora.toString().length === 1){  //Como getHours() devuelve un numero del (0 - 23), cuando sean las 12 de la noche quiero que muestre: '00'
        hora = '0' + hora;
    }
    if(minutos.toString().length === 1){    //Como getMinuts() devuelve un numero del (0 - 59), cuando sea un numero de 1 digito quiero que se muestre con un '0' adelante
        minutos = '0' + minutos;
    }
    return ' Fecha: ' + fecha + ' Hora: ' + hora + ':' + minutos;
}

function cargarCatCompradas(){  //Carga en informes las compras que se realizaron en esa categoria
    let filtroCat = document.getElementById('idComboCategoriasIzquierda').value;
    let listaCompras = sistema.darCompras();
    let parrafo = document.getElementById('idDetallesCualCategoria');
    let lista = document.getElementById('idListaCompras');
    if(sistema.darLargoCompras() > 0){
        parrafo.innerHTML = 'Información detallada de la categoría ' + filtroCat;
        lista.innerHTML = '';
        let termine = false;
        for (let i = 0; i < sistema.darLargoCompras() && !termine; i++){
            if(listaCompras[i].experiencia.categoria.nombre === filtroCat && listaCompras[i].experiencia.categoria.contadorCompra > 0){
                let texto = 'Nombre: ' + listaCompras[i].nombre + ' Mail: ' + listaCompras[i].mail + listaCompras[i].fecha;
                cargarLista(lista, texto);
            }
            else{
                cargarLista(lista, 'Sin datos');
                termine = true;
            }
        }     
    }
}