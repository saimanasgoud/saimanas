let imgBox = document.getElementById("imgBox");
let qrImage = document.getElementById("qrImage");
let qrtext = document.getElementById("qrtext");
let shareBtn = document.getElementById("shareBtn");


function generateQR(){
    qrImage.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + qrtext.value;
    imgBox.classList.add("show-img");
    shareBtn.style.display = "inline"; // Display the share button
}

function shareQR() {
    if (!qrImage.src || qrImage.src === "") {
        alert("Please generate a QR code first.");
        return;
    }

    // Convert the QR code image to a data URL
    let canvas = document.createElement('canvas');
    canvas.width = qrImage.width;
    canvas.height = qrImage.height;
    let context = canvas.getContext('3d');
    context.drawImage(qrImage, 0, 0);
    let dataURL = canvas.toDataURL('image/png');

    if (navigator.share) {
        navigator.share({
            title: "Share QR Code",
            files: [new File([dataURL], "qrcode.png", { type: "image/png" })],
        }).then(() => console.log("QR code shared successfully"))
        .catch((error) => console.error("Error sharing QR code:", error));
    } else {
        alert("Web Share API not supported in this browser.");
    }
}

function generateQR() {
    let qrImage = document.getElementById("qrImage");
    let qrtext = document.getElementById("qrtext").value;

    qrImage.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + qrtext;
    document.getElementById("imgBox").classList.add("show-img");
}

function downloadQR() {
    let qrImageSrc = document.getElementById("qrImage").src;
    
    let downloadLink = document.createElement("a");
    downloadLink.href = qrImageSrc;
    downloadLink.download = "QRCode.png";

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

function generateQR() {
    let qrImage = document.getElementById("qrImage");
    let qrtext = document.getElementById("qrtext").value;
    let imgBox = document.getElementById("imgBox");

    // Check if the input is a YouTube link
    if (qrtext.includes("youtube.com") || qrtext.includes("youtu.be")) {
        let videoId = getYouTubeVideoId(qrtext);
        if (videoId) {
            qrImage.src = "https://img.youtube.com/vi/" + videoId + "/0.jpg";
            imgBox.classList.add("show-img");
            qrImage.onclick = function () {
                window.location.href = qrtext;
            };
        } else {
            alert("Invalid YouTube link");
        }
    }
    // Check if the input is an Instagram link
    else if (qrtext.includes("instagram.com")) {
        qrImage.src = "https://www.instagram.com/p/BVqRSGABF5W/media/?size=l";
        imgBox.classList.add("show-img");
        qrImage.onclick = function () {
            window.location.href = qrtext;
        };
    }
    // For other links or text, generate a standard QR code
    else {
        qrImage.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + qrtext;
        imgBox.classList.add("show-img");
    }
}

// Function to extract YouTube video ID from URL
function getYouTubeVideoId(url) {
    let videoId = null;
    if (url.includes("youtube.com")) {
        videoId = url.split("v=")[1];
        let ampersandPosition = videoId.indexOf("&");
        if (ampersandPosition !== -1) {
            videoId = videoId.substring(0, ampersandPosition);
        }
    } else if (url.includes("youtu.be")) {
        videoId = url.split("/").pop();
    }
    return videoId;
}
