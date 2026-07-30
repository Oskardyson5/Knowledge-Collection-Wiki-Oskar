let folders = [];

const folderTitle = document.getElementById("folder-title");
const folderTree = document.getElementById("folder-tree");

let currentFolders;
let selectedParent = null;


// Ordner laden
async function loadFolders() {

    const response = await fetch("data/folders.json");

    folders = await response.json();

    showFolders(folders, "");
}


// Ordner anzeigen
function showFolders(folderList, title = "", folderId = null) {

    currentFolders = folderList;

    if (folderTitle) {
        folderTitle.innerHTML = title;
    }

    if (!folderTree) return;

    folderTree.innerHTML = "";

    folderList.forEach(function(folder) {

        folderTree.innerHTML += `
            <nav class="choosebutton" data-id="${folder.id}">
                <div>
                    <h2>📁 ${folder.name}</h2>
                </div>
            </nav>
        `;

    });
}


// Parent suchen
function findParent(folderList, id, parent = null) {

    for (let folder of folderList) {

        if (folder.id === id) {
            return parent;
        }


        if (folder.children.length > 0) {

            const result = findParent(
                folder.children,
                id,
                folder
            );


            if (result) {
                return result;
            }

        }

    }

    return null;
}



// Ordner anklicken
if (folderTree) {

folderTree.addEventListener("click", function(event) {


    const button = event.target.closest(".choosebutton");


    if (!button) return;


    const id = Number(button.dataset.id);


    const folder = currentFolders.find(
        f => f.id === id
    );


    if (folder) {


        selectedParent = folder;


        if (folder.children.length > 0) {


            history.pushState(
                {
                    folderId: folder.id
                },
                "",
                ""
            );


            showFolders(
                folder.children,
                folder.name,
                folder.id
            );

        }

    }


});

}



// + Menü

const newButton = document.getElementById("newButton");
const createMenu = document.getElementById("create-menu");


if (newButton) {


newButton.addEventListener("click", function() {


    createMenu.innerHTML = `

        <div class="create-window">

            <h3>Was möchtest du erstellen?</h3>

            <a href="ordner.html" class="create-button">
                📁 Ordner
            </a>

            <a href="artikel.html" class="create-button">
                📄 Eintrag
            </a>

        </div>

    `;


});


}



document.addEventListener("click", function(event) {


    if (
        createMenu &&
        !createMenu.contains(event.target) &&
        event.target !== newButton
    ) {

        createMenu.innerHTML = "";

    }


});




// Zurück Button

window.addEventListener("popstate", function(event) {


    if (event.state) {


        const parent = findParent(
            folders,
            event.state.folderId
        );


        if (parent) {


            showFolders(
                parent.children,
                parent.name,
                parent.id
            );


        }


        else {


            showFolders(
                folders,
                ""
            );


        }


    }

    else {


        showFolders(
            folders,
            ""
        );


    }


});





// Ordner erstellen

const createFolderButton =
document.getElementById("createFolderButton");


if (createFolderButton) {


createFolderButton.addEventListener("click", function() {


    const input =
    document.getElementById("NewfolderName");


    const folderName =
    input.value.trim();



    if (!folderName) {

        alert("Bitte einen Ordnernamen eingeben.");
        return;

    }



    const newFolder = {

        id: Date.now(),

        name: folderName,

        children: []

    };
    if (selectedParent) {
        selectedParent.children.push(
            newFolder
        );
    }

    else {
        folders.push(
            newFolder
        );
    }

    alert("Ordner erstellt!");

    showFolders(
        folders,
        ""
    );
});
}
loadFolders();