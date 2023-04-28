window.addEventListener("load", () => {
    fetch('http://127.0.0.1:8080/patrons', { method:"GET"})
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
                 <td>`+authors[i].first_name+`</td>
                <td>`+authors[i].surname+`</td>
                <td>`+authors[i].email+`</td>
                <td>`+authors[i].status+`</td>`;
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

                const inputs = prompt("Upisite ime,prezime,email,status u ovom formatu (ostavite prazno ako ne menjate)", "").split(",");
                if (inputs == null) {

                } else {
                    let autor = {
                        id: this.parentNode.parentNode.dataset.authorid,
                        first_name: inputs[0],
                        surname:inputs[1],
                        email:inputs[2],
                        status:inputs[3],
                    };
                    izmenjenAutor = JSON.stringify(autor);

                    fetch("http://127.0.0.1:8080/patrons/" + this.parentNode.parentNode.dataset.authorid, {
                        method:"PUT",
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: izmenjenAutor
                    })
                        .then( response=>response.json())
                        .then( data => {
                            fetch('http://127.0.0.1:8080/patrons', { method:"GET" })
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
                fetch("http://127.0.0.1:8080/patrons/obrisi/" + this.parentNode.parentNode.dataset.authorid,
                    { method:"DELETE" })
                    .then( response=>response.json())
                    .then( data => {
                        fetch('http://127.0.0.1:8080/patrons', { method:"GET" })
                            .then(response => response.json())
                            .then(data => updateAuthorList(data) );
                    });
            });
        }

        document.getElementById("btn_filter").addEventListener("click", function(){

            let q = document.getElementById("search_q").value;
            fetch("http://127.0.0.1:8080/patrons/"+q, { method:"GET" })
                .then( response=>response.json())
                .then( data =>  updateAuthorList(data) );
        });

    }



    document.getElementById("btn_dodaj").addEventListener("click", function(){
        let noviAutor = {
            first_name: document.getElementById("novi_autor_ime").value,
            surname: document.getElementById("novi_autor_prezime").value,
            email: document.getElementById("novi_autor_mejl").value,
            status: document.getElementById("novi_autor_status").value
        };

        nt = JSON.stringify(noviAutor);
        fetch("http://127.0.0.1:8080/patrons/dodaj", {
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
                fetch('http://127.0.0.1:8080/patrons', { method:"GET" })
                    .then(response => response.json())
                    .then(data => updateAuthorList(data) );
            });

        document.getElementById("novi_autor_ime").value = '';
        document.getElementById("novi_autor_status").value = '';
        document.getElementById("novi_autor_prezime").value = '';
        document.getElementById("novi_autor_mejl").value = '';
    });
})