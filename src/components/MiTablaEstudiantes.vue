<template>
  <div>
      <h4 style="text-align: center">
          <slot></slot>
      </h4>
      <div class="panel panel-default ">
          <dialog-alerta v-if="alertaRegistro" @miOk="alertaRegistro=false" @cancelado="alertaRegistro=false" titulo="Atención" :matricula="matricula" >
              ¿Estás seguro que quieres borrar el registro con id {{matricula}}?
          </dialog-alerta>
          <dialog-alerta-inscripciones v-if="alertaCurso" @miOk="alertaCurso=false" @cancelado="alertaCurso=false" titulo="Atención" :idcurso="idcurso">
              ¿Estás seguro que quieres quitarle el curso  {{curso}}?
          </dialog-alerta-inscripciones>
          <dialog-registro v-if="alertaNuevoAlumno">
          </dialog-registro>
          <dialog-inscripciones v-if="alertaNuevaInscripcion">
          </dialog-inscripciones>
          <table class="table table-striped table-bordered ">
              <thead>
                  <tr>
                      <th style="text-align: center">ID</th>
                      <th style="text-align: center">Matricula</th>
                      <th style="text-align: center">Nombre</th>
                      <th style="text-align: center">Apellido Paterno</th>
                      <th style="text-align: center">Apellido Materno</th>
                      <th style="text-align: center">Semestre Ingreso</th>
                      <th style="text-align: center">Creditos Cursados</th>
                      <th style="text-align: center">Cursos Asociados</th>
                      <th style="text-align: center">
                          <button type="button" class="btn btn-primary btn-default btn-sm" title="Nuevo Alumno" @click="confirmarNuevoAlumno">
                                <span class="glyphicon glyphicon-plus" aria-hidden="false">
                                </span>
                          </button>
                      </th>
                   </tr>
              </thead>
              <tbody>
                  <tr v-for="e in estudiantes" :key="e">
                      <td style="text-align: center">{{e.id}}</td>
                      <td style="text-align: center">{{e.matricula}}</td>
                      <td style="text-align: center">{{e.nombre}}</td>
                      <td style="text-align: center">{{e.apellidoPaterno}}</td>
                      <td style="text-align: center">{{e.apellidoMaterno}}</td>
                      <td style="text-align: center">{{e.semestreIngreso}}</td>
                      <td style="text-align: center">{{e.creditosCursados}}</td>
                      <td>
                          <div style="text-align: end; vertical-align: middle; ">
                              <button type="button" class="btn btn-info btn-default btn-sm" title="Inscribir en un curso" @click="confirmarNuevoInscripcion">
                                <span class="glyphicon glyphicon-plus" aria-hidden="false">
                                </span>
                              </button>
                          </div>
                          <p style="text-align: end" v-for="c in e.Cursos" :key="c">
                              {{c.nombre}}
                              <button type="button" class="btn btn-default btn-sm"
                                          :title="'Dar de baja en el curso: '+c.nombre" @click="confirmarBorradoCurso(c.nombre,c.Inscripciones.id)">
                                  <span class="glyphicon glyphicon-remove" aria-hidden="false"></span>
                              </button>
                          </p>

                      </td>
                      <td>
                          <div style="text-align: center; ">
                              <button type="button" class="btn btn-danger btn-default btn-sm"
                                      :title="'Eliminar registro de matricula '+e.nombre" @click="confirmarBorradoRegistro(e.id)">
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
import miAlerta from "@/components/MiAlertaEstudiantes.vue";
import miAlertaInscripciones from "@/components/MiAlertaInscripciones.vue";
import miRegistro from "@/components/MiRegistroEstudiantes.vue";
import miRegistroInscripciones from "@/components/MiRegistroInscripciones.vue";

export default {
  data: function () {
        return {
            estudiantes: [],
            alertaRegistro: false,
            alertaNuevoAlumno: false,
            alertaNuevaInscripcion: false,
            alertaCurso: false,
            matricula:0,
            curso:'',
            idcurso:0
        }
    },
    methods: {
      confirmarBorradoRegistro: function (m) {
          console.log(m);
          this.matricula = m;
          this.alertaRegistro = true;

      },
      confirmarBorradoCurso: function (c,id) {
            this.curso = c;
            this.idcurso = id;
            this.alertaCurso = true;
        },
      confirmarNuevoAlumno:function(){
        this.alertaNuevoAlumno=true;
      },
      confirmarNuevoInscripcion:function(){
        this.alertaNuevaInscripcion=true;
      }
    },
    components: {
        dialogAlerta: miAlerta,
        dialogAlertaInscripciones: miAlertaInscripciones,
        dialogRegistro: miRegistro,
        dialogInscripciones: miRegistroInscripciones
    },
    mounted: function () {
        fetch('http://localhost:4000/inscripciones',{
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
                if(!e.Cursos)
                    e.Cursos = [];

                e.Cursos.forEach(c => {
                    fetch(c.nombre,{
                        method:'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).
                    then(respCurso => {
                        return respCurso.json();
                    }).
                    then(datoCurso =>{
                        e.Cursos.push(datoCurso.nombre);
                    }).
                    catch(error => {
                        console.log(error);
                    });
                })
            })
            this.estudiantes = datos;
        }).
        catch(error => {
            console.log(error);
        });
    }
};
</script>

<style></style>
