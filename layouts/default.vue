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
  min-height: 100vh;
}

.main {
  width: 100%;
  min-height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 60px 20px 160px;
}

@media (max-width: 1024px) {
  .main {
    padding: 20px 32px 20px 120px;
  }
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }

  .main {
    min-height: auto;
    padding: 16px 16px 88px;
  }
}
</style>
