<script>
  import ProjectCard from '$lib/components/cards/ProjectCard.svelte';
  import HighlightedButton from '$lib/components/buttons/HighlightedButton.svelte';
</script>

<div class="min-h-screen w-full bg-gray-700">
  <div class="mb-6">
    <HighlightedButton text={'New Service'} route={'/new'} />
  </div>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
    <ProjectCard 
      projectName="My Awesome Project1"
      domain="myawesomeproject1.com"
      status="Live"
      creationDate="2024-09-02" 
    />

    <ProjectCard 
      projectName="My Awesome Project2"
      domain="myawesomeproject2.com"
      status="Live"
      creationDate="2024-09-02" 
    />

    <!-- Añade más ProjectCard aquí según sea necesario -->
  </div>
</div>

