const newButton = document.getElementById("newButton");
const createMenu = document.getElementById("create-menu");

newButton.addEventListener("click", function() {

    createMenu.innerHTML = `
      <div class="create-window">
         <h3>Was möchtest du erstellen?</h3>
         <button>📁 Ordner</button>
         <button>📄 Eintrag</button>
        </div>
    `;

});

document.addEventListener("click", function(event) {

    if (!createMenu.contains(event.target) && event.target !== newButton) {
        createMenu.innerHTML = "";
    }

});