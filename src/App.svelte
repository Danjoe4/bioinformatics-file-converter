<script>
  import DropZone from './lib/DropZone.svelte'
</script>

<main>
  <div>
    <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
      <img src=logo.svg class="logo" alt="Logo" />
    </a>

  </div>
  <h1>Bioinformatics Conversion Tool</h1>

  <div >
    <DropZone />
  </div>

  <p>
    A simple tool to convert bioinformatics file formats. There is no file size limit but it will struggle with very large files (400+ mb). For reference, a 200mb file takes about 60secs to convert. Performance improvements are coming.
    Please contact <a href="mailto:admin@seqbio.app">admin@seqbio.app</a> to report issues, request features, or if you'd like to contribute.
  </p>


</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
</style>
