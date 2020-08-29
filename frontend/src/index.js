import App from './App.svelte';
// import './index.css';

const app = new App({
  target: document.getElementById('app')
});

export default app;

// Hot Module Replacement (HMR)
if (import.meta.hot) {
  import.meta.hot.accept();
  import.meta.hot.dispose(() => {
    app.$destroy();
  });
}