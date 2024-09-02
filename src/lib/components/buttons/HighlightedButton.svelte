<script>
  export let text = "Click Me"; // Texto del botón, por defecto "Click Me"
  export let route = "/"; // Ruta a la que debe dirigir el botón, por defecto "/"
</script>

<a href={route} class="bg-yellow-500 hover:bg-yellow-600 text-gray-700 font-bold py-2 px-4 rounded">
  {text}
</a>
