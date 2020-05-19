<template>
  <form @submit.prevent="enviar">
      <input placeholder="matricula" v-model="matricula" :matricula="matricula">
      <br>
      <input placeholder="nombre" v-model="nombre" :nombre="nombre">
      <br>
      <input placeholder="paterno" v-model="apellidoPaterno" :apellidoPaterno="apellidoPaterno">
      <br>
      <input placeholder="materno" v-model="apellidoMaterno" :apellidoMaterno="apellidoMaterno">
      <br>
      <input placeholder="semestre" v-model="semestreIngreso" :semestreIngreso="semestreIngreso">
      <br>
      <input placeholder="creditos" v-model="creditosCursados" :creditosCursados="creditosCursados">
      <br>
      <button type="submit">Enviar</button>
    </form>
</template>

<script>
export default{
props:{
  matricula:Number,
  apellidoPaterno:String,
  apellidoMaterno:String,
  nombre:String,
  semestreIngreso: Number,
  creditosCursados: Number
},
methods: {
    enviar: function () {
        //this.$emit('matricula');
        console.log(this.nombre);
        let obj={
          matricula:this.matricula,
          apellidoPaterno:this.apellidoPaterno,
          apellidoMaterno:this.apellidoMaterno,
          nombre:this.nombre,
          semestreIngreso: this.semestreIngreso,
          creditosCursados: this.creditosCursados
        }
        console.log(obj)
        fetch('http://localhost:4000/estudiantes/',{
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
