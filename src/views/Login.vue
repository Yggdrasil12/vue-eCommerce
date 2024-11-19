<template>
  <div class="login-container">
    <div class="login-box">
      <h2 class="text-center text-light">Iniciar Sesión</h2>
      <form @submit.prevent="handleLogin">
        <!-- Campo de correo -->
        <div class="form-group">
          <label for="email" class="text-light">Correo Electrónico</label>
          <input type="email" id="email" class="form-control" v-model="email" required placeholder="Ingresa tu correo">
        </div>

        <!-- Campo de contraseña -->
        <div class="form-group">
          <label for="password" class="text-light">Contraseña</label>
          <input type="password" id="password" class="form-control" v-model="password" required placeholder="Ingresa tu contraseña">
        </div>

        <!-- Botón de inicio de sesión -->
        <button type="submit" class="btn btn-outline-light btn-block">Iniciar Sesión</button>
      </form>

      <div class="text-center mt-3">
        <router-link to="/signup" class="text-light">¿No tienes una cuenta? Regístrate</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    handleLogin() {
      // Aquí puedes agregar la lógica de autenticación
      console.log('Iniciando sesión con:', this.email, this.password);
      // Redirigir a la página principal o dashboard
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
/* Fondo de la página */
.login-container {
  height: 100vh;
  background: linear-gradient(135deg, #6a0dad, #000);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Arial', sans-serif;
}

/* Caja de login */
.login-box {
  background-color: rgba(0, 0, 0, 0.7);
  padding: 40px;
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
}

h2 {
  color: #fff;
  font-weight: bold;
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-weight: bold;
}

input {
  padding: 10px;
  background-color: #222;
  border: none;
  color: #fff;
  border-radius: 5px;
  width: 100%;
}

input:focus {
  outline: none;
  border: 2px solid #8a2be2;
}

button {
  background-color: #8a2be2;
  color: #fff;
  padding: 12px 0;
  border-radius: 50px;
  font-weight: bold;
  width: 100%;
  border: none;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #6a0dad;
}

/* Estilo del enlace */
.text-light {
  color: #fff !important;
}

.text-light:hover {
  color: #8a2be2;
}
</style>
