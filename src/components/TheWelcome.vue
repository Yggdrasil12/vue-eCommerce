<!-- <script setup>
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'

// fetch('htt://loclahosat', {
//   method: 'POST',
// }).then((response) => response.json)
</script> -->

<template>
  <div class="container-fluid presentation">
    <div class="text-center d-flex flex-column justify-content-center align-items-center">
      <!-- Logo -->
      <div class="logo mb-4">
        <h2 class="text-uppercase font-weight-bold text-light">eCommerce</h2>
      </div>

      <!-- Título -->
      <h1 class="display-4 mb-3 text-white animated fadeIn">¡Bienvenido a Nuestra Tienda!</h1>

      <!-- Descripción -->
      <p class="lead mb-4 text-light">
        Explora los mejores productos y ofertas en nuestro e-commerce. ¡Haz tus compras ahora!
      </p>

      <!-- Botón de acción -->
      <a href="#explorar" class="btn btn-custom animated bounceIn">Explorar Ahora</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SplashScreen',
};
</script>

<style scoped>
/* Estilo general */
.presentation {
  height: 100vh;
  background: linear-gradient(135deg, #6a0dad, #000);
  color: #fff;
  font-family: 'Arial', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo h2 {
  font-size: 3rem;
  color: #ffffffcc;
  letter-spacing: 4px;
}

h1 {
  font-size: 3.5rem;
  font-weight: 700;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.6);
}

p {
  font-size: 1.25rem;
  max-width: 600px;
}

.btn-custom {
  background-color: #8a2be2;
  color: #fff;
  font-weight: bold;
  padding: 15px 30px;
  border-radius: 50px;
  transition: all 0.3s ease-in-out;
  text-transform: uppercase;
}

.btn-custom:hover {
  background-color: #6a0dad;
  color: #ffffffcc;
}

.animated {
  animation-duration: 1s;
  animation-fill-mode: both;
}

.fadeIn {
  animation-name: fadeIn;
}

.bounceIn {
  animation-name: bounceIn;
}

/* Animaciones */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes bounceIn {
  0% {
    transform: scale(0.3);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(1);
  }
}
</style>
