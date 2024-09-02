<script>
  export let projectName = "Project Name";
  export let domain = "example.com";
  export let status = "Live";
  export let creationDate = "2023-09-01";
</script>

<div class="bg-gray-800 text-white shadow-lg rounded-lg p-5 w-96 border border-white">
  <!-- Project Name -->
  <h2 class="text-xl font-bold mb-2">{projectName}</h2>
  
  <!-- Domain -->
  <p class="text-white mb-2">{domain}</p>
  
  <!-- Status -->
  <div class="flex items-center mb-2">
      <span 
          class={`inline-block w-3 h-3 rounded-full mr-2 ${status === 'Live' ? 'bg-green-500' : 'bg-red-500'}`}>
      </span>
      <span>{status}</span>
  </div>
  
  <!-- Creation Date -->
  <p class="text-gray-400 text-sm">{creationDate}</p>
</div>