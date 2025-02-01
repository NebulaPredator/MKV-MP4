document.getElementById("convertBtn").addEventListener("click", async function () {
    const fileInput = document.getElementById("fileInput");
    const status = document.getElementById("status");
    const progressContainer = document.getElementById("progressContainer");
    const progressBar = document.getElementById("progressBar");
    const downloadLink = document.getElementById("downloadLink");

    if (fileInput.files.length === 0) {
        status.innerText = "Please select an MKV file.";
        return;
    }

    const file = fileInput.files[0];
    const fileName = file.name.replace(".mkv", ".mp4");

    // Reset progress
    progressBar.style.width = "0%";
    progressContainer.style.display = "block";
    status.innerText = "Converting...";

    // Simulate conversion with a fake progress bar
    let progress = 0;
    const interval = setInterval(() => {
        progress += 10;
        progressBar.style.width = progress + "%";

        if (progress >= 100) {
            clearInterval(interval);
            finishConversion(fileName);
        }
    }, 500);
});

function finishConversion(fileName) {
    const status = document.getElementById("status");
    const downloadLink = document.getElementById("downloadLink");

    status.innerText = "Conversion completed!";
    downloadLink.style.display = "block";
    downloadLink.href = "#"; // Replace with actual file download path
    downloadLink.download = fileName;
}
