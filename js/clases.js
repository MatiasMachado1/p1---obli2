class Sistema{
    constructor(){
        this.listaCategoria = [];
        this.listaExperiencia = [];
        this.listaCompra = [];
    }

    agregarCategoria(categoria){
        this.listaCategoria.push(categoria);
    }

    categoriaRepetida(nombre){
        let hay = false;
        for (let i = 0; i < this.listaCategoria.length && !hay; i++){
            if (nombre.toLowerCase() === this.listaCategoria[i].nombre.toLowerCase()){
                hay = true;
            }
        }
        return hay;
    }
//algo
    agregarExperiencia(experiencia){
        this.listaExperiencia.push(experiencia);
    }

    experienciaRepetida(expTitulo){
        let hay = false;
        for (let i = 0; i < this.listaExperiencia.length && !hay; i++){
            if (expTitulo.toLowerCase() === this.listaExperiencia[i].titulo.toLowerCase()){
                hay = true;
            }
        }
        return hay;
    }

    precioCreciente(){
        let arr = [] 
        for (let elem of this.listaExperiencia){
            arr.push(elem);
        }
        arr.sort(function(a, b){
            return a.compararPrecioCon(b);
        })       
        return arr;
    }

    precioDecreciente(){
        let arr = []
        for (let elem of this.listaExperiencia){
            arr.push(elem);
        }
        arr.sort(function(a, b){
            return b.compararPrecioCon(a);
        })
        return arr;
    }

    contDecreciente(){
        let arr = [];
        for (let elem of this.listaExperiencia){
            arr.push(elem);
        }
        arr.sort(function(a, b){
            return b.compararContCon(a);
        })
        return arr;
    }

    agregarCompra(compra){
        this.listaCompra.push(compra);
    }

    darCategorias(){
        return this.listaCategoria;
    }

    darExperiencias(){
        return this.listaExperiencia;
    }

    darCompras(){
        return this.listaCompra;
    }

    darLargoCategorias(){
        return this.listaCategoria.length;
    }

    darLargoExperiencias(){
        return this.listaExperiencia.length;
    }

    darLargoCompras(){
        return this.listaCompra.length;
    }

    eliminarCategoria(posicion){
        if(posicion >= 0 && posicion < this.listaCategoria.length){
            this.listaCategoria.splice(posicion, 1);
        }
    }

    eliminarExperiencia(posicion){
        if(posicion >= 0 && posicion < this.listaExperiencia.length){
            this.listaExperiencia.splice(posicion, 1);
        }
    }

    buscarNombreCategoria(nombreCat){
        let listaCat = this.listaCategoria;
        let encontre = false;
        for (let i = 0; i < listaCat.length && !encontre; i++){
            if (nombreCat === listaCat[i].nombre){
                nombreCat = listaCat[i];
                encontre = true;
            }
        }
        return nombreCat;
    }

    buscarTituloExperiencia(tituloExp){
        let listaExp = this.listaExperiencia;
        let encontre = false;
        for (let i = 0; i < listaExp.length && !encontre; i++){
            if (tituloExp === listaExp[i].titulo){
                tituloExp = listaExp[i];
                encontre = true;
            }
        }
        return tituloExp;
    }

    experienciaMasCara(){
        let max = 0;
        let posMax = 0;
        let listaExp = this.listaExperiencia;
        for (let i = 0; i < listaExp.length; i++){
            if (listaExp[i].precio > max){
                max = listaExp[i].precio;
                posMax = i;
            }
        }
        return listaExp[posMax].precio;
    }

    sumaContadorCatComp(cat){
        let listaCat = this.listaCategoria;
        for (let elem of listaCat){
            if (cat === elem.nombre){
                elem.contadorCompra++;
            }
        }
    }

    sumaContadorCatExp(cat){
        let listaCat = this.listaCategoria;
        for (let elem of listaCat){
            if (cat === elem.nombre){
                elem.contadorExperiencia++;
            }
        }
    }

    sumaContadorExp(exp){
        let listaExp = this.listaExperiencia;
        for (let elem of listaExp){
            if (exp === elem.titulo){
                elem.contador++;
            }
        }
    }
}

class Categoria{
    constructor(nombre, detalles){
        this.nombre = nombre;
        this.detalles = detalles;
        this.contadorExperiencia = 0;
        this.contadorCompra = 0;
    }

    toString(){
        return this.nombre + ' ' + this.detalles;
    }

}

class Experiencia{
    constructor(titulo, descripcion, precio, cantidad, categoria){
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.precio = precio;
        this.cantidad = cantidad;
        this.categoria = categoria;
        this.contador = 0;
    }

    toString(){
        return this.titulo + ' ' + this.descripcion + ' ' + this.precio + ' ' + this.cantidad + ' ' + this.categoria;
    }

    compararPrecioCon(otra){
        return this.precio - otra.precio;
    }

    compararContCon(otra){
        return this.contador - otra.contador;
    }

}

class Compra{
    constructor(nombre, mail, experiencia, fecha){
        this.nombre = nombre;
        this.mail = mail;
        this.experiencia = experiencia;
        this.fecha = fecha;
    }

    toString(){
        return this.nombre + ' ' + this.mail + ' ' + this.experiencia;
    }
}
