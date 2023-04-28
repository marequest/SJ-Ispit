window.addEventListener("load", () => {
    fetch('http://127.0.0.1:8080/waitlists', { method:"GET"})
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
                <td>`+authors[i].book_id+`</td>
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

                const inputs = prompt("Upisite book_id,patron_id u ovom formatu (ostavite prazno ako ne menjate)", "").split(",");
                if (inputs == null) {

                } else {
                    let autor = {
                        id: this.parentNode.parentNode.dataset.authorid,
                        book_id:inputs[0],
                        patron_id:inputs[1]

                    };
                    izmenjenAutor = JSON.stringify(autor);

                    fetch("http://127.0.0.1:8080/waitlists/" + this.parentNode.parentNode.dataset.authorid, {
                        method:"PUT",
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: izmenjenAutor
                    })
                        .then( response=>response.json())
                        .then( data => {
                            fetch('http://127.0.0.1:8080/waitlists', { method:"GET" })
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
                fetch("http://127.0.0.1:8080/waitlists/obrisi/" + this.parentNode.parentNode.dataset.authorid,
                    { method:"DELETE" })
                    .then( response=>response.json())
                    .then( data => {
                        fetch('http://127.0.0.1:8080/waitlists', { method:"GET" })
                            .then(response => response.json())
                            .then(data => updateAuthorList(data) );
                    });
            });
        }

        document.getElementById("btn_filter").addEventListener("click", function(){

            let q = document.getElementById("search_q").value;
            fetch("http://127.0.0.1:8080/waitlists/"+q, { method:"GET" })
                .then( response=>response.json())
                .then( data =>  updateAuthorList(data) );
        });

    }



    document.getElementById("btn_dodaj").addEventListener("click", function(){
        let noviAutor = {
            book_id: document.getElementById("novi_autor_book_id").value,
            patron_id: document.getElementById("novi_autor_patron_id").value
        };

        nt = JSON.stringify(noviAutor);
        fetch("http://127.0.0.1:8080/waitlists/dodaj", {
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
                fetch('http://127.0.0.1:8080/waitlists', { method:"GET" })
                    .then(response => response.json())
                    .then(data => updateAuthorList(data) );
            });

        document.getElementById("novi_autor_book_id").value = '';
        document.getElementById("novi_autor_patron_id").value = '';
    });
})