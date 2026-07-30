const tokenInput = document.getElementById("tokenInput");
const saveTokenButton = document.getElementById("saveTokenButton");


if (saveTokenButton) {


    saveTokenButton.addEventListener("click", function() {


        const token = tokenInput.value.trim();



        if (!token) {


            alert("Bitte Token eingeben.");

            return;


        }



        localStorage.setItem(

            "githubToken",

            token

        );



        alert("Token gespeichert!");



        tokenInput.value = "";


    });


}
