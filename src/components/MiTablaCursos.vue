<template>
<div>
  <h4 style="text-align: center">
      <slot></slot>
  </h4>
  <div class="panel panel-default ">
      <dialog-alerta v-if="alertaRegistro" @ok="alertaRegistro=false" @cancelado="alertaRegistro=false" titulo="Atención">
          ¿Estás seguro que quieres borrar el registro con matrícula {{matricula}}?
      </dialog-alerta>
      <dialog-alerta v-if="alertaCurso" @ok="alertaCurso=false" @cancelado="alertaCurso=false" titulo="Atención" :idcurso="idcurso">
          ¿Estás seguro que quieres quitar el curso {{curso}}?
      </dialog-alerta>
      <dialog-registro-cursos v-if="alertaNuevoCurso">
      </dialog-registro-cursos>
      <table class="table table-striped table-bordered ">
          <thead>
              <tr>
                  <th style="text-align: center">ID</th>
                  <th style="text-align: center">Clave</th>
                  <th style="text-align: center">Nombre</th>
                  <th style="text-align: center">Creditos</th>
                  <th style="text-align: center">
                      <button type="button" class="btn btn-primary btn-default btn-sm" title="Nuevo Cursos" @click="confirmarRegistroCursos">
                            <span class="glyphicon glyphicon-plus" aria-hidden="false">
                            </span>
                      </button>
                  </th>
               </tr>
          </thead>
          <tbody>
              <tr v-for="e in cursos" :key="e">
                  <td style="text-align: center">{{e.id}}</td>
                  <td style="text-align: center">{{e.clave}}</td>
                  <td style="text-align: center">{{e.nombre}}</td>
                  <td style="text-align: center">{{e.creditos}}</td>

                  <td>
                      <div style="text-align: center; ">
                          <button type="button" class="btn btn-danger btn-default btn-sm"
                                  :title="'Eliminar registro de matricula '+e.nombre" @click="confirmarBorradoCurso(e.nombre,e.id)">
                            <span class="glyphicon glyphicon-remove" aria-hidden="false">
                            </span>
                          </button>
                      </div>
                  </td>
              </tr>
          </tbody>
      </table>
  </div>
</div>
</template>

<script>
import miAlertacursos from "@/components/MiAlertacursos.vue";
import miRegistroCursos from "@/components/MiRegistroCursos.vue";

export default{
  data: function () {
        return {
            cursos: [],
            alertaRegistro: false,
            alertaCurso: false,
            alertaNuevoCurso: false,
            matricula:0,
            curso:'',
            idcurso:0
        }
    },
    methods: {
      confirmarBorradoRegistro: function (m) {
          this.matricula = m;
          this.alertaRegistro = true;
      },
      confirmarBorradoCurso: function (c,id) {
            this.curso = c;
            this.idcurso = id;
            this.alertaCurso = true;
        },
      confirmarRegistroCursos: function (c) {
            this.curso = c;
            this.alertaNuevoCurso = true;
        }

    },
    components: {
        dialogAlerta: miAlertacursos,
        dialogRegistroCursos: miRegistroCursos
    },
    mounted: function () {
        fetch('http://localhost:4000/cursos',{
            method:'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).
        then(response => {
            return response.json();
        }).
        then(datos =>{
            datos.forEach(e => {
                if(!e.cursosNombre)
                    e.cursosNombre = [];
                e.cursosNombre.forEach(c => {
                    fetch(c,{
                        method:'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).
                    then(respCurso => {
                        return respCurso.json();
                    }).
                    then(datoCurso =>{
                        e.cursosNombre.push(datoCurso.nombre);
                    }).
                    catch(error => {
                        console.log(error);
                    });
                })
            })
            this.cursos = datos;
        }).
        catch(error => {
            console.log(error);
        });
    }
}
</script>

<style></style>
