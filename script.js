const folders = [
    "Privat",
    "Schule",
    "Studium"
];

const folderTree = document.getElementById("folder-tree");

folders.forEach(function(foldername){
    folderTree.innerHTML += `
    <nav class="choosebutton">
        <div>
            <h2>📁 ${folderName}</h2>
        </div>
    </nav>
`;
})


const newButton = document.getElementById("newButton");
const createMenu = document.getElementById("create-menu");

newButton.addEventListener("click", function() {

    createMenu.innerHTML = `
      <div class="create-window">
         <h3>Was möchtest du erstellen?</h3>
         <a href="ordner.html" class="create-button">📁 Ordner</a>
         <a href="artikel.html" class="create-button">📄 Eintrag</a>
        </div>
    `;

});

document.addEventListener("click", function(event) {

    if (!createMenu.contains(event.target) && event.target !== newButton) {
        createMenu.innerHTML = "";
    }

});