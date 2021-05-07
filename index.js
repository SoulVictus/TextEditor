let textArea = document.getElementById("text-field");
let buttons = document.getElementsByTagName("button");
const inputElement = document.getElementById("file-selector");
inputElement.addEventListener("change", importJSON, false);

textArea.focus();


/* allows using text editor commands in contentEditable element */
for (let btn of buttons) {
    btn.addEventListener('click', () => {
        if (btn.className === "btn-command") {
            let command = btn.dataset['command'];
            document.execCommand(command, false, null);
            textArea.focus();
        }
    })
}


const exportToJSON = () => {

    /* Create json file*/
    let textContent = JSON.stringify({
        content: textArea.innerHTML
    });

    let file = new File([textContent], "newfile.json", {
        type: "text/json",
    });

    /* Open download link*/
    let a = document.createElement("a");
    a.setAttribute("href", URL.createObjectURL(file));
    a.setAttribute("download", "newfile.json");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function importJSON() {
    
    /* Import json and open file */
    const file = this.files[0];
    fileReader = new FileReader();
    fileReader.onload = receivedText;
    fileReader.readAsText(file);

    function receivedText(e) {
        let lines = e.target.result;
        let fileContent = JSON.parse(lines);
        textArea.innerHTML = fileContent.content;
    }
}
