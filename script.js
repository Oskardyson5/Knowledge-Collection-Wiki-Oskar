const newButton = document.getElementById("newButton");
const createMenu = document.getElementById("create-menu");

newButton.addEventListener("click", function() {

    createMenu.innerHTML = `
      <div class="create-window">
         <h3>Was möchtest du erstellen?</h3>
         <a href="ordner.html" class="create-button">📁 Ordner</a>
         <a href="artikel.html">📄 Eintrag</a>
        </div>
    `;

});

document.addEventListener("click", function(event) {

    if (!createMenu.contains(event.target) && event.target !== newButton) {
        createMenu.innerHTML = "";
    }

});