<script>
  // Puedes manejar la lógica aquí si necesitas hacer algo en el layout
</script>

<style>
  /* Estilos adicionales si necesitas */
</style>

<div class="flex h-screen bg-[#090909]">
  <!-- Sidebar -->
  <aside class="w-64 bg-[#090909] text-white flex flex-col">
      <!-- Logo and Name -->
      <div class="flex items-center justify-center h-20">
          <img src="/path-to-your-logo.png" alt="Logo" class="h-12 w-12 mr-2">
          <span class="text-xl font-bold">VercelClon</span>
      </div>

      <!-- Navigation Links -->
      <nav class="flex-1 mt-5">
          <ul>
              <li class="px-4 py-2 hover:bg-gray-700">
                  <a href="/user/overview" class="block">Overview</a>
              </li>
              <li class="px-4 py-2 hover:bg-gray-700">
                  <a href="/user/usage" class="block">Usage</a>
              </li>
              <li class="px-4 py-2 hover:bg-gray-700">
                  <a href="/user/support" class="block">Support</a>
              </li>
              <li class="px-4 py-2 hover:bg-gray-700">
                  <a href="/user/settings" class="block">Settings</a>
              </li>
          </ul>
      </nav>
  </aside>

  <!-- Main Content -->
  <div class="flex-1 bg-[#101012] m-[8px] ml-0 border-[0.5px] border-[solid] border-[#26282d] p-3">
      <slot></slot>
  </div>
</div>
