const folders = [
    {
        id: 1,
        name: "Privat",
        children: [
            {
                id: 4,
                name: "Haushalt",
                children: []
            }
        ]
    },
    {
        id: 2,
        name: "Schule",
        children: []
    },
    {
        id: 3,
        name: "Studium",
        children: []
    }
];

const folderTree = document.getElementById("folder-tree");

function showFolders(folderList){

    folderTree.innerHTML = "";

    folderList.forEach(function(folder){

        folderTree.innerHTML += `
            <nav class="choosebutton" data-id="${folder.id}">
                <div>
                    <h2>📁 ${folder.name}</h2>
                </div>
            </nav>
        `;

    });

}

showFolders(folders)

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