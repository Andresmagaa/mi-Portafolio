<template>
    <div>
      <div class="row">
        <div class="col-md-6">
          <!-- Imagen de la propiedad -->
          <img :src="'/imagen/' + inmueble.foto" class="img-fluid" alt="Imagen de la propiedad">
          <h2>{{ inmueble.nombre }}</h2>
          <h4>Precio por producto ${{ inmueble.precio }} MXN</h4>
          <div>
            <h3>{{ inmueble.descripcion }}</h3>
          </div>
        </div>
        <div class="col-md-6">
          <h2>Selecciona cuantos productos quieres comprar</h2>
          <div class="row">
            <div class="col-md-6">
              <!-- <label for="form-label">Llegada</label>
              {{ checkin }}
              <input type="date" v-model="checkin" class="form-control">
            </div>
            <div class="col-md-6">
              <label for="form-label">Salida</label>
              {{ checkout }}
              <input type="date" v-model="checkout" class="form-control"> -->
              <div class="col-md-6">
                <label class="form-label" for="cantidad">Cantidad</label>
                <input v-model="cantidad" class="form-control" type="number" min="1">
              </div>
            </div>
          </div>
          <div style="margin-top: 10px" class="row">
            <div class="col-md-12">
              <button @click="terminar" class="btn btn-block btn-success">Comprar por ${{ total }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ReservarPropiedad",
    data() {
      return {
        // numero_dias: 0,
        // checkin: 1,
        // checkout: 2
        cantidad: 1
      };
    },
    props: ['inmueble'],
    computed: {
      total: function() {
        if (!this.cantidad || this.cantidad < 1)
      {
        return 0;
      }
        // return parseFloat(this.numero_dias) * parseFloat(this.inmueble.precio);
        return parseFloat(this.cantidad) * parseFloat(this.inmueble.precio);
      }
    }
    // watch: {
    //   checkin: "calcularDias",
    //   checkout: "calcularDias"
    // },
    ,methods: {
      // calcularDias() {
      //   if (!this.checkin || !this.checkout) {
      //     this.numero_dias = 0;
      //     return;
      //   }
      //   var date1 = new Date(this.checkin);
      //   var date2 = new Date(this.checkout);
      //   this.numero_dias = Math.max((date2 - date1) / (1000 * 60 * 60 * 24), 0); // Asegura que no sea negativo
      // },
      terminar: function() {
      // Emitimos los datos necesarios al componente padre (App)
      console.log('ID de inmueble:', this.inmueble.id); // Verifica si el ID está bien asignado
      this.$emit('terminado', {
          total: this.total,
          id: this.inmueble.id,  // Asegúrate de que el ID esté bien
          nombre: this.inmueble.nombre,
          imagen: this.inmueble.foto,  // Aquí se pasa la foto como 'imagen'
          precio: this.inmueble.precio,
          cantidad: this.cantidad
      });
      console.log('Aquí envío los datos', this.inmueble);
  }
    }
  };
  </script>
  
  <style>
  /* Estilo personalizado */
  </style>  