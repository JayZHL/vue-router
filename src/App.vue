<template>
  <div id="app">
    <div id="nav" style="background-color:white">
      <router-link to="/">Estudiantes</router-link>
      <br>
      <br>
      <router-link to="/cursos">Cursos</router-link>
    </div>
    <router-view />
  </div>

</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: auto;
  display: inline-flex;

}

#nav {
  padding: 30px;
  width: 200px;
  height: 600px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
