export default {
  name: 'ProfileEdit',
  data() {
    return {
      user: {
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
      },
      errors: {
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
      },
    }
  },
  mounted() {
    this.fetchUser()
  },
  methods: {
    // Método para obtener los datos del usuario desde la API
    async fetchUser() {
      try {
        const email = localStorage.getItem('userEmail')
        const response = await fetch(`http://127.0.0.1:8000/api/users/${email}`, {
          method: 'GET',
        })

        const data = await response.json()
        console.log(data)
        this.user = data
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error)
      }
    },

    // Método que maneja el envío del formulario
    async handleSubmit() {
      // Resetear errores antes de la validación
      this.errors = {
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
      }

      // Validación de los campos del formulario
      if (!this.user.name) {
        this.errors.name = 'El nombre es obligatorio.'
      }

      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
      if (!emailPattern.test(this.user.email)) {
        this.errors.email = 'Por favor, ingresa un correo electrónico válido.'
      }

      if (!this.user.phone) {
        this.errors.phone = 'El teléfono es obligatorio.'
      }

      if (!this.user.address) {
        this.errors.address = 'La dirección es obligatoria.'
      }

      // Si hay errores, no proceder con la actualización
      if (Object.values(this.errors).some((error) => error !== '')) {
        return
      }

      // Verifica los datos antes de enviar la solicitud
      console.log('Datos a enviar:', this.user)

      // Enviar los datos actualizados al backend
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/users/${this.user.email}`, {
          method: 'PUT',
          body: JSON.stringify({
            name: this.user.name,
            password: this.user.password,
            phone: this.user.phone,
            address: this.user.address,
          }),
        })

        if (response.ok) {
          const data = await response.json()
          console.log('Respuesta de la API:', data)
          alert('Perfil actualizado correctamente')
          this.$router.push('/profile') // Redirigir al perfil de usuario
        } else {
          const data = await response.json()
          console.error('Error al actualizar el perfil:', data)
          alert('Error al actualizar el perfil')
        }
      } catch (error) {
        console.error('Error al actualizar los datos:', error)
      }
    },
  },
}
