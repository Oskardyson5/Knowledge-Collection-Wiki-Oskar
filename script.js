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

const folderTitle = document.getElementById("folder-title");
const folderTree = document.getElementById("folder-tree");

let currentFolders;
let newFolderName = "";
let selectedFolder = null;
let path = [];

function showFolders(folderList, title = "", folderId = null) {
    currentFolders = folderList;
    folderTitle.innerHTML = title;
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

showFolders(folders, "");

folderTree.addEventListener("click", function(event) {

    const button = event.target.closest(".choosebutton");

    if (!button) return;

    const id = Number(button.dataset.id);

    const folder = currentFolders.find(f => f.id === id);

    if (folder) {

        path.push(folder);

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

window.addEventListener("popstate", function(event) {

    if (event.state) {

        path.pop();

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

        } else {

            showFolders(
                folders,
                ""
            );

        }
    } else {

        path = [];

        showFolders(
            folders,
            ""
        );
    }
});

const nameStep = document.getElementById("nameStep");
const pathStep = document.getElementById("pathStep");
const nextButton = document.getElementById("nextButton");
const folderNameInput = document.getElementById("NewfolderName");
const backPathButton = document.getElementById("backPathButton");


if (nextButton && folderNameInput) {

    nextButton.addEventListener("click", () => {

        const folderName = folderNameInput.value;

        newFolderName = folderName;

        nameStep.style.display = "none";
        pathStep.style.display = "block";

        path = [];
        showFolders(folders);
    });

}


if (backPathButton) {

    backPathButton.addEventListener("click", () => {
        history.back();
    });

}

nextButton.addEventListener("click", () => {

    const folderName = folderNameInput.value;

    newFolderName = folderName;

    nameStep.style.display = "none";
    pathStep.style.display = "block";

    path = [];
    showFolders(folders);
});

backPathButton.addEventListener("click", () => {
    history.back();
});

function showCurrentPath() {
    if (path.length === 0) {
        showFolders(folders);
    } else {
        const currentFolder = path[path.length - 1];

        showFolders(
            currentFolder.children,
            currentFolder.name,
            currentFolder.id
        );
    }
}