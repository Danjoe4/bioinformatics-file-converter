<script>
  import Dropzone from "svelte-file-dropzone";
  import { convertBamToFastq } from "./Conversion.js";

  let files = {
    accepted: [],
    rejected: [],
  };

  function handleFilesSelect(e) {
    const { acceptedFiles, fileRejections } = e.detail;
    files.accepted = [...files.accepted, ...acceptedFiles];
    files.rejected = [...files.rejected, ...fileRejections];
  }

  export function handleConversion(e) {
    for (let i = 0; i < files.accepted.length; i++) {
      const file = files.accepted[i];
      convertBamToFastq(file);
    }
  }

</script>

<Dropzone on:drop={handleFilesSelect} />
<ol>
  {#each files.accepted as item}
    <li>{item.name}</li>
  {/each}
</ol>

<div>
  <select id="conversion_type">
    <option value="bam2fastq">BAM to FASTQ</option>
    <option value="sam2bam">more coming soon</option>
  </select>
  <button on:click={handleConversion}>Convert Files Now</button>
</div>

<div id="download_zone">

</div>
