<template>
  <form @submit.prevent="enviar">
      <input placeholder="clave" v-model="clave" :clave="clave">
      <br>
      <input placeholder="nombre" v-model="nombre" :nombre="nombre">
      <br>
      <input placeholder="creditos" v-model="creditos" :creditos="creditos">
      <br>

      <button type="submit">Enviar</button>
    </form>
</template>

<script>
export default{
  props:{
    clave: Number,
    nombre: String,
    creditos: Number
  },
  methods: {
    enviar: function () {
        //this.$emit('matricula');
        let obj={
          clave: this.clave,
          nombre: this.nombre,
          creditos: this.creditos
        }
        console.log(obj)
        fetch('http://localhost:4000/cursos/',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(obj)
        }).
        then(response => {
             return response.json();
        }).catch(err=>{
          console.log(err);
        })
        console.log('enviado');
    },
    cancelado: function () {
      console.log('cancelado');
    }
  }
}
</script>

<style></style>
