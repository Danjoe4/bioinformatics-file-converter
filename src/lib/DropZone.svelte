<script>
  import Dropzone from "svelte-file-dropzone";
  import Aioli from "@biowasm/aioli";

  let files = {
    accepted: [],
    rejected: [],
  };

  function handleFilesSelect(e) {
    const { acceptedFiles, fileRejections } = e.detail;
    files.accepted = [...files.accepted, ...acceptedFiles];
    files.rejected = [...files.rejected, ...fileRejections];
  }

  function handleConversion(e) {
    for (let i = 0; i < files.accepted.length; i++) {
      const file = files.accepted[i];
      convertBamToFastq(file);
    }
  }

  async function convertBamToFastq(file) {
    // advanced init required to use wrapper
    const CLI = await new Aioli([
      {
        tool: "samtools",
        version: "1.17",
      },
    ]);

    console.log("Converting BAM:", file.name);
    const path = await CLI.mount(file);
    const new_filename = file.name.replace(".bam", ".fastq");
    const new_file_string = await CLI.exec(`samtools bam2fq ${path}`);
    console.log("string length: ", new_file_string.length);

    // write this to a file
    const outputPath = await CLI.mount([
      {
        name: new_filename,
        data: new_file_string,
      },
    ]);
    console.log("Wrote file to", outputPath);
    const stats = await CLI.fs.stat(`${outputPath}`);
    console.log(stats);
    const downloadUrl = await CLI.download(`${outputPath}`);
    console.log("Download URL:", downloadUrl);

    // append the link to the document
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = new_filename;
    a.textContent = "Download " + new_filename; // Text for the link
    const downloadZone = document.getElementById("download_zone");
    downloadZone.appendChild(a);
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
    <option value="fastq2bam">FASTQ to BAM</option>
  </select>
</div>

<div>
  <button on:click={handleConversion}>Convert Files Now</button>
</div>

<div id="download_zone">
  
</div>

<style>
  select {
    padding: 0.5em;
    margin: 0.5em;
  }
</style>
