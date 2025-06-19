import { defineComponent, createApp } from 'vue';

const App = defineComponent({
  name: 'App',
  setup() {
    function formatDate() {
      return new Date().toLocaleDateString(navigator.language, {
        dateStyle: 'long',
      });
    }
    return {
      formatDate,
    }
  },
  template: `<div>Сегодня {{ formatDate() }}</div>`,
});

const app = createApp(App);

app.mount('#app');
