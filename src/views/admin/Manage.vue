<template>
  <div class="options-container">
    <div class="options-box">
      <h2 class="text-center text-light">Panel de Administración</h2>

      <div class="options">
        <!-- Opción Ver productos -->
        <div class="option">
          <h3 class="text-light">Ver todos los productos</h3>
          <p class="text-light">Accede a la lista de todos los productos disponibles.</p>
          <router-link to="/products" class="btn btn-outline-light">Ver productos</router-link>
        </div>

        <!-- Opción Ver usuarios -->
        <div class="option">
          <h3 class="text-light">Ver todos los usuarios</h3>
          <p class="text-light">Accede a la lista de todos los usuarios registrados.</p>
          <router-link to="/users" class="btn btn-outline-light">Ver usuarios</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminOptions',
  data() {
    return {
      // Aquí podrías guardar cualquier información que necesites para el admin
    }
  },
  methods: {
    // Método opcional si necesitas hacer algo antes de redirigir al usuario
    goToProducts() {
      // Si fuera necesario hacer algo antes de redirigir
      this.$router.push('/products') // Redirige a la página de productos
    },

    goToUsers() {
      // Si fuera necesario hacer algo antes de redirigir
      this.$router.push('/users') // Redirige a la página de usuarios
    },
  },
  mounted() {
    // Puedes agregar algún comportamiento cuando la vista se monte, como verificar el rol o cargar datos
    const userRole = localStorage.getItem('userRole')

    // Si el usuario no es admin, redirigirlo fuera del panel de administración
    if (userRole !== 'admin') {
      this.$router.push('/products') // Redirige a los productos si no es admin
    }
  },
}
</script>

<style scoped>
/* Fondo de la página */
.options-container {
  height: 100vh;
  background: linear-gradient(135deg, #6a0dad, #000);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Arial', sans-serif;
}

/* Caja de opciones */
.options-box {
  background-color: rgba(0, 0, 0, 0.7);
  padding: 40px;
  border-radius: 10px;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
}

h2 {
  color: #fff;
  font-weight: bold;
  margin-bottom: 30px;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.option {
  background-color: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

.option h3 {
  color: #fff;
  font-size: 1.5rem;
}

.option p {
  color: #fff;
  margin: 10px 0;
}

.btn {
  background-color: #8a2be2;
  color: #fff;
  padding: 12px 0;
  border-radius: 50px;
  font-weight: bold;
  width: 100%;
  border: none;
  transition: background-color 0.3s ease;
}

.btn:hover {
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
