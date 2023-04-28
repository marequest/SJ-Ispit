window.addEventListener("load", () => {
    fetch('http://127.0.0.1:8080/notifications', { method:"GET"})
        .then(response => response.json())
        .then(data => {
            console.log(data);
            updateAuthorList(data);
        })


    function updateAuthorList(authors){
        var tabela = document.getElementById("autori");
        tabela.innerHTML = "";

        for(i in authors){
            let redHTML = `<tr data-authorID="`+authors[i].id+`">
                 <td>`+authors[i].sent_at+`</td>
                <td>`+authors[i].contents+`</td>
                <td>`+authors[i].patron_id+`</td>`;
            redHTML += `<td>
                  <button class="btn btn-info btn-sm btn_izmeni">Izmeni</button>
                  <button class="btn btn-danger btn-sm btn_obrisi">Obriši</button>
              </td>
          </tr>`;
            tabela.innerHTML += redHTML;
        }

        var btns_izmeni = document.querySelectorAll("#autori .btn_izmeni");
        for(i=0; i<btns_izmeni.length; i++){
            btns_izmeni[i].addEventListener("click", function(){

                const inputs = prompt("Upisite sent_at,contents,patron_id u ovom formatu (ostavite prazno ako ne menjate)", "").split(",");
                if (inputs == null) {

                } else {
                    let autor = {
                        id: this.parentNode.parentNode.dataset.authorid,
                        sent_at: inputs[0],
                        contents:inputs[1],
                        patron_id:inputs[2],
                    };
                    izmenjenAutor = JSON.stringify(autor);

                    fetch("http://127.0.0.1:8080/notifications/" + this.parentNode.parentNode.dataset.authorid, {
                        method:"PUT",
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: izmenjenAutor
                    })
                        .then( response=>response.json())
                        .then( data => {
                            fetch('http://127.0.0.1:8080/notifications', { method:"GET" })
                                .then(response => response.json())
                                .then(data => updateAuthorList(data) );
                        });
                }
            });
        }

        var btns_obrisi = document.querySelectorAll("#autori .btn_obrisi");
        for(i=0; i<btns_obrisi.length; i++){
            btns_obrisi[i].addEventListener("click", function(){
                console.log(this.parentNode.parentNode.dataset.authorid);
                fetch("http://127.0.0.1:8080/notifications/obrisi/" + this.parentNode.parentNode.dataset.authorid,
                    { method:"DELETE" })
                    .then( response=>response.json())
                    .then( data => {
                        fetch('http://127.0.0.1:8080/notifications', { method:"GET" })
                            .then(response => response.json())
                            .then(data => updateAuthorList(data) );
                    });
            });
        }

        document.getElementById("btn_filter").addEventListener("click", function(){

            let q = document.getElementById("search_q").value;
            fetch("http://127.0.0.1:8080/notifications/"+q, { method:"GET" })
                .then( response=>response.json())
                .then( data =>  updateAuthorList(data) );
        });

    }



    document.getElementById("btn_dodaj").addEventListener("click", function(){
        let noviAutor = {
            sent_at: document.getElementById("novi_autor_sent_at").value,
            contents: document.getElementById("novi_autor_contents").value,
            patron_id: document.getElementById("novi_autor_patron_id").value
        };

        nt = JSON.stringify(noviAutor);
        fetch("http://127.0.0.1:8080/notifications/dodaj", {
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: nt
        })
            .then( response=>response.json())
            .then( data => {
                //ponovo učitavamo celu listu
                fetch('http://127.0.0.1:8080/notifications', { method:"GET" })
                    .then(response => response.json())
                    .then(data => updateAuthorList(data) );
            });

        document.getElementById("novi_autor_sent_at").value = '';
        document.getElementById("novi_autor_contents").value = '';
        document.getElementById("novi_autor_patron_id").value = '';

    });
})