<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Previous"
        @click.prevent="prevPage" :disabled="!pages.has_pre">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item" v-for="page in pages.total_pages" :key="page"
      :class="{ 'active': page === pages.current_page }">
        <a class="page-link" href="#" @click.prevent="updatePage(page)">
          {{ page }}
        </a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Next"
          @click.prevent="nextPage" :disabled="!pages.has_next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
// :pages="{ 頁碼資訊 }"
// @emitPages="更新頁面事件"
export default {
  props: ['pages'],
  methods: {
    updatePage(page) {
      this.$emit('emit-pages', page);
    },
    prevPage() {
      if (this.pages.has_pre) {
        this.updatePage(this.pages.current_page - 1);
      }
    },
    nextPage() {
      if (this.pages.has_next) {
        this.updatePage(this.pages.current_page + 1);
      }
    },
  },
};
</script>
