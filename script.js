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

let currentFolders;


function showFolders(folderList){
    currentFolders = folderList;

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

function findParent(folderList, id, parent = null){

    for(let folder of folderList){

        if(folder.id === id){
            folder.parent = parent;
            return {parent};
        }

        if(folder.children.length > 0){
           const result = findParent(folder.children, id, folder);

           if(result){
            return result;
           }
        }
    }
    return null;
}

showFolders(folders)

folderTree.addEventListener("click", function(event){

    const button = event.target.closest(".choosebutton");

    if(!button) return;

    const id = Number(button.dataset.id);

    const folder = currentFolders.find(f => f.id === id);

    if(folder && folder.children.length > 0){
        history.pushState(
            {folderId: folder.id},
            "",
            ""
        );
        showFolders(folder.children);
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

window.addEventListener("popstate", function(event){

    if(event.state){

        const result = findParent(folders, event.state.folderId);

        if(result){
            if(result){
                showFolders(result.parent.children);
            } else {
                showFolders(folders);
            }
        }
    } else {
        showFolders(folders);
    }
});