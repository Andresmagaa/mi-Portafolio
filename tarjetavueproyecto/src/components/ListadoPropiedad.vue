<template>
    <div style="margin-bottom: 10px;" class="row">
        <div v-for="propiedad in propiedades" :key="propiedad.idinmueble" class="propiedad col-md-3" @click="seleccionar_propiedad(propiedad)">
                <!-- Mostramos la imagen, si no tiene imagen usamos una predeterminada -->
                <img class="img-fluid" :src="'/imagen/' + propiedad.foto" alt="Imagen de inmueble">
                <div class="propiedad-info">
                    <h4>{{ propiedad.nombre }}</h4>
                    <span>${{ propiedad.precio }} MXN</span>
                </div>
            </div>
        </div>
</template>

<script>
export default {
    name: "ListadoPropiedad",
    data() {
        return {

        };
    }
    ,props:['propiedades']
    ,methods: {
        seleccionar_propiedad:function(elemento) {
            this.$emit('seleccionado', elemento);
        }
    }
}
</script>
<style>
    .propiedad {
        background-color: #FFFFFF;
        border-radius: 5px;
        padding: 5px;
        border: 1px solid #CCCCCC;
        box-shadow: rgba(0,0,0,.16) 0px 1px 4px;
        overflow: hidden;
        cursor: pointer;
    }

    .propiedad img {
        transition: transform 0.3s ease-in-out, filter 0.3s ease-in-out;
        width: 100%; /* Aseguramos que la imagen ocupe el 100% del contenedor */
        height: 200px; /* Fija una altura para las imágenes */
        object-fit: cover; /* Mantiene la relación de aspecto de la imagen */
    }

    .propiedad img:hover {
        transform: scale(1.1);
        filter: brightness(0.8);
    }

    .propiedad h4 {
        font-size: 1.1rem;
        margin: 10px 0;
    }

    .propiedad span {
        font-size: 1.2rem;
        color: #28a745; /* Verde para el precio */
    }
</style>