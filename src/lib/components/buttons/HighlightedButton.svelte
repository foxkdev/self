<script>
  export let text = "Click Me"; // Texto del botón, por defecto "Click Me"
  export let route = "/"; // Ruta a la que debe dirigir el botón, por defecto "/"
</script>

<a href={route} class="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded">
  {text}
</a>
