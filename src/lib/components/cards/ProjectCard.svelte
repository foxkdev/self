<script>

  import githubIcon from '$lib/images/github.svg';
  export let projectName = "Project Name";
  export let domain = "example.com";
  export let status = "Live";
  export let creationDate = "2023-09-01";
  export let repository = "https://github.com/foxkdev/self";

  export let branch = 'main';

  const getRepoIcon = () => {
    if (repository.includes('github')) {
      return 'github';
    } else if (repository.includes('gitlab')) {
      return 'gitlab';
    } else if (repository.includes('bitbucket')) {
      return 'bitbucket';
    } else {
      return 'external-link';
    }
  }

  const getRepoName = () => {
    // Eliminar cualquier "/" al final de la URL
    const cleanUrl = repository.replace(/\/$/, "");
    const splits = cleanUrl.split('/');
    return splits[splits.length - 2] + '/' + splits[splits.length - 1];
  }
  //TODO: REFACTOR AND ENGLISH
  function calcularDiasDesde(fecha) {
    // Convertir la fecha proporcionada y la fecha actual a milisegundos
    const fechaProporcionada = new Date(fecha);
    const fechaActual = new Date();

    // Calcular la diferencia en milisegundos
    const diferenciaEnMilisegundos = fechaActual - fechaProporcionada;

    // Convertir la diferencia de milisegundos a días
    const diasPasados = Math.floor(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24));

    // Devolver el texto con el número de días
    if (diasPasados === 0) {
        return "Hoy";
    } else if (diasPasados === 1) {
        return "Hace 1 día";
    } else {
        return `Hace ${diasPasados} días`;
    }
}
</script>

<div class="flex flex-col items-start bg-[#1A1C20] text-white shadow-lg rounded-lg p-3 w-72 border-[0.5px] border-[solid] border-[#26282d]">
  <!-- Project Name -->
  <div class="text-md">{projectName}</div>
  
  <!-- Domain -->
  <div class="text-[#A1A1A1] mb-2">{domain}</div>
  
  <a href={repository} target="_blank" class="text-white my-3 px-3 py-1 rounded-full bg-[#090909] flex items-center">
    {#if getRepoIcon() === 'github'}
      <img src={githubIcon} class="w-6 mr-2"/>
    {/if}
    {getRepoName()}
  </a>
  <!-- Status -->
  <!-- <div class="flex items-center mb-2 mt-2">
      <span 
          class={`inline-block w-3 h-3 rounded-full mr-2 ${status === 'Live' ? 'bg-green-500' : 'bg-red-500'}`}>
      </span>
      <span>{status}</span>
  </div> -->
  
  <!-- Creation Date -->
  <p class="text-gray-400 text-sm">{calcularDiasDesde(creationDate)} en rama <a href={`${repository}/tree/${branch}`} target="_blank" class="underline text-white">{branch}</a></p>
</div>