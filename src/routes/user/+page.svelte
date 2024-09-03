<script>
  import ProjectCard from '$lib/components/cards/ProjectCard.svelte';
  import HighlightedButton from '$lib/components/buttons/HighlightedButton.svelte';
</script>

<div class="min-h-screen w-full">
  <div class="mb-6">
    <HighlightedButton text={'New Service'} route={'/new'} />
  </div>
  <div class="flex flex-wrap gap-2 w-full">
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
    <ProjectCard 
      projectName="My Awesome Project3"
      domain="myawesomeproject2.com"
      status="Live"
      creationDate="2024-09-02" 
    />
    <ProjectCard 
      projectName="My Awesome Project4"
      domain="myawesomeproject2.com"
      status="Live"
      creationDate="2024-09-02" 
    />
    <ProjectCard 
      projectName="My Awesome Project5"
      domain="myawesomeproject2.com"
      status="Live"
      creationDate="2024-09-02" 
    />

    <!-- Añade más ProjectCard aquí según sea necesario -->
  </div>
</div>

