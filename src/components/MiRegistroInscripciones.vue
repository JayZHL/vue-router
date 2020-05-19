<template>
  <form @submit.prevent="enviar">
        <input placeholder="estudianteid" v-model="estudianteid" :estudianteid="estudianteid">
        <br>
        <input placeholder="cursoid" v-model="cursoid" :cursoid="cursoid">
        <br>

        <button type="submit">Enviar</button>
      </form>
</template>

<script>
export default{
  props:{
    estudianteid: Number,
    cursoid: Number
  },
  methods: {
      enviar: function () {
          //this.$emit('matricula');
          let obj={
            estudianteid:this.estudianteid,
            cursoid:this.cursoid
          }
          console.log(obj)
          fetch('http://localhost:4000/inscripciones/',{
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
