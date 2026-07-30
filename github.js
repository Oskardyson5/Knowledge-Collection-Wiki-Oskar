function getToken(){
    const token = localStorage.getItem("githubToken");
    return token;
}

async function getFileSha() {

    const token = getToken();

    const response = await fetch(
        "https://api.github.com/repos/oskardyson5/Knowledge-Collection-Wiki-Oskar/contents/data/folders.json",
        {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/vnd.github+json"
            }
        }
    );

    const data = await response.json();
    return data.sha;

}

async function uploadFile(content, sha) {

    const token = getToken();

    const response = await fetch(
        "https://api.github.com/repos/oskardyson5/Knowledge-Collection-Wiki-Oskar/contents/data/folders.json",
        {
            method: "PUT",

            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/vnd.github+json",
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                message: "Ordnerstruktur aktualisiert",

                content: btoa(
                    unescape(
                        encodeURIComponent(content)
                    )
                ),

                sha: sha

            })
        }
    );


    const data = await response.json();
    return data;
}

async function saveFolders() {

    const json = JSON.stringify(
        window.folders,
        null,
        4
    );


    const sha = await getFileSha();


    await uploadFile(
        json,
        sha
    );
}