<template>
  <div class="register-container">
    <div class="register-form-container">
      <h2 class="text-center text-light mb-4">Crea tu Cuenta</h2>
      <form @submit.prevent="handleRegister">
        <div class="mb-3">
          <label for="name" class="form-label text-light">Nombre</label>
          <input type="text" class="form-control" id="name" v-model="name" required />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label text-light">Correo Electrónico</label>
          <input type="email" class="form-control" id="email" v-model="email" required />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label text-light">Contraseña</label>
          <input type="password" class="form-control" id="password" v-model="password" required />
        </div>
        <div class="mb-3">
          <label for="confirmPassword" class="form-label text-light">Confirmar Contraseña</label>
          <input
            type="password"
            class="form-control"
            id="confirmPassword"
            v-model="confirmPassword"
            required
          />
        </div>
        <button type="submit" class="btn btn-outline-light w-100">Registrar</button>
      </form>
      <p class="text-center text-light mt-3">
        ¿Ya tienes cuenta? <router-link to="/login" class="text-decoration-none">Inicia sesión</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  },
  methods: {
  async handleRegister() {
    // Validación de contraseñas
    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    const userData = {
      name: this.name,
      email: this.email,
      password: this.password,
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Especificamos que estamos enviando JSON
        },
        body: JSON.stringify(userData), // Convertimos los datos a JSON
      });

      if (!response.ok) {
        throw new Error('Error al registrar el usuario');
      }

      const data = await response.json();
      console.log('Usuario registrado:', data);

      // Aquí puedes redirigir al login si el registro fue exitoso
      this.$router.push('/login');
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      alert('Hubo un error al registrar el usuario.');
    }
  },
}
};
</script>

<style scoped>
.register-container {
  background: linear-gradient(135deg, #6a0dad, #000); /* Fondo morado */
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.register-form-container {
  background-color: rgba(0, 0, 0, 0.7); /* Fondo oscuro para el formulario */
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.7);
  width: 100%;
  max-width: 400px;
}

.register-form-container input {
  background-color: #222;
  color: #fff;
  border: 1px solid #444;
}

.register-form-container input:focus {
  border-color: #8a2be2; /* Color morado al enfocar los inputs */
}

.register-form-container button {
  background-color: #8a2be2;
  border: none;
}

.register-form-container button:hover {
  background-color: #6a0dad;
}

.register-form-container p {
  color: #ddd;
}

.register-form-container a {
  color: #8a2be2;
}

.register-form-container a:hover {
  text-decoration: underline;
}
</style>
