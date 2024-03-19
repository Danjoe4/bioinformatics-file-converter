import Aioli from "@biowasm/aioli";


export async function convertBamToFastq(file) {
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
