<template>
  <div class="container">
    <TheMenu />

    <main class="main">
      <slot />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
}

.main {
  height: 100vh;
  width: 100%;
  padding: 20px 60px 20px 160px;
  max-width: 1200px;
  margin: 0 auto;
}
</style>