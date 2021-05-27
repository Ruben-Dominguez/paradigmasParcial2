<template>
  <div>

    <div id="handler">
      <img id="libros-img" src="https://colegiosanlucas.files.wordpress.com/2020/04/pinpng.com-libros-png-2077375.png?w=1024" alt="libros">
      <h1>Biblioteca Virtual</h1>

    </div>

    <form @submit.prevent="estatusEditar ? updateLibro() : crearLibro()">
      <div>
        <p class="labels">Nombre del Libro:</p>
        <input type="text" v-model="titulo" required>
        <p class="labels">Autor del Libro:</p>
        <input type="text" v-model="autor" required>
      </div>
      <div id="btn-div">
        <button class="btn-principal" type="submit">{{estatusEditar ? "Editar" : "Agregar" }}</button>
        <button id="cancelar" class="btn-principal" v-if="estatusEditar" @click="estatusEditar= false, titulo='', autor=''">Cancelar</button>
      </div>
    </form>

    <h2>Libros almacenados</h2>
    <img src="https://media.tenor.com/images/7500668d515374c0dd15a7ed1e8bdbd8/tenor.gif" v-if="cargando">

    <div id="libros-div">
      <ul>
        <li v-for="libro in libros" :key="libro.id">
          <p>
            <span id="detalles"><strong>Titulo: </strong>{{libro.titulo}}<strong>, Autor: </strong><i>{{libro.autor}}</i></span>
            <span id="botones"><button id="del" @click="deleteLibro(libro)">Eliminar</button> <button id="edit" @click="selectLibro(libro)">Editar</button></span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {db} from './firebase.js'
  export default {
    name: 'App',
    data() {
      return {
        libros: [],
        id: "",
        titulo: "",
        autor: "",
        cargando: false,
        estatusEditar: false
      }
    },
    created() {
      this.cargando = true;
      this.listarLibros();
    },
    methods: {
      async listarLibros() {
        const data = await db.collection('libros').get();
        this.libros = data.docs.map(doc => ({
          id: doc.id, ...doc.data()
        }))
        this.cargando = false;
        console.log(this.libros)
      },
      async crearLibro() {
        await db.collection('libros').add(
          {
            titulo: this.titulo,
            autor: this.autor
          }
        )
        this.titulo = ""
        this.autor = ""
        this.listarLibros()
      },
      async deleteLibro(libro) {
        if(confirm(`Estas seguro de eliminar ${libro.titulo}?`)){
          await db.collection('libros').doc(libro.id).delete()
          this.listarLibros()
        }
      },
      selectLibro(libro) {
        this.estatusEditar = true
        this.id = libro.id
        this.titulo = libro.titulo
        this.autor = libro.autor
      },
      async updateLibro(){
        await db.collection('libros').doc(this.id).set(
          {
            id: this.id,
            titulo: this.titulo,
            autor: this.autor
          }
        )
        this.estatusEditar=false
        this.id = ""
        this.titulo = ""
        this.autor = ""
        this.listarLibros()
      }
    },
  }
</script>

<style>
:root {
  background-color: lightskyblue;
}

body {
  margin: 0;
}

#app {
  
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#libros-img {
  width: 15vw;
}

h1 {
  font-size: 4em;
  margin-bottom: 0;
}

h2 {
  width: 100%;
  background-color: darkcyan;
  color: white;
  padding: 10px 0;
}

.labels {
  font-size: 1.5em;
  margin: 20px 0 0 0;
}

input {
  font-size: 1.2em;
  width: 40vw;
  padding: .4vw;
}

#libros-div {
  width: 50%;
  margin: auto auto;
}

#detalles {
  float: left;
  font-size: 1.2em;
}

#botones {
  float: right;
  margin: 0;
}

#del {
  font-size: 1.2em;
  font-weight: bold;
  height: 100%;
  background-color: crimson;
  color: white;
  transition: .3s;
  padding: 5px;
}

#edit {
  font-size: 1.2em;
  font-weight: bold;
  height: 100%;
  background-color: darkcyan;
  color: white;
  transition: .3s;
  padding: 5px;
}

#del:hover {
  background-color: red;
  transition: .3s;
}

#edit:hover {
  background-color: deepskyblue;
  transition: .3s;
}

#btn-div {
  display: inline-flex;
  width: 41vw;
  padding: .4vw;
}

.btn-principal {
  font-size: 1.2em;
  font-weight: bold;
  flex-grow: 1;
  padding: 5px;
  background-color: darkcyan;
  color: white;
  transition: .3s;
}

.btn-principal:hover {
  background-color: deepskyblue;
  transition: .3s;
}

#cancelar {
  background-color: crimson;
  transition: .3s;
}

#cancelar:hover {
  background-color: red;
  transition: .3s;
}

@media only screen and (max-width: 800px) {
  #libros-div {
    width: 100%;
  }
  input {
    font-size: 1.2em;
    width: 95vw;
    padding: .4vw;
  }
  #detalles {
    float: left;
    font-size: .8em;
  }
  #botones {
    float: left;
  }
}

</style>
