<template>
  <div class="modal" tabindex="-1" role="dialog" style="display: block; padding-right: 17px;">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">{{titulo}}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="cancelado">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p><slot></slot></p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" @click="entendido">Ok</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="cancelado">Cancel</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default{
  props: {
        titulo: String,
        matricula:Number,
        idcurso:Number
    },
  methods: {
        entendido: function () {
            this.$emit('miOk');
            console.log(this.matricula);
            fetch('http://localhost:4000/estudiantes/'+this.matricula,{
                method:'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).
            then(response => {
                return response.json();
            })
        },
        cancelado: function () {
            this.$emit('cancelado');
        },
        entendidoCurso: function(){
          this.$emit('miOk');
          fetch('http://localhost:4000/inscripciones/'+this.idcurso,{
              method:'DELETE',
              headers: {
                  'Content-Type': 'application/json'
              }
          }).
          then(response => {
              return response.json();
          })
        }
    }
}
</script>
<style></style>
