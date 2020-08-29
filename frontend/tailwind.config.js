module.exports = {
  purge: {
    content: [
      './index.html',
      './src/App.svelte',
      './src/**/*.svelte'
    ]
  },
  theme: {
    extend: {}
  },
  variants: {},
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true,
  }
};