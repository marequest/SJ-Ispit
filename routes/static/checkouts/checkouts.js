window.addEventListener("load", () => {
    fetch('http://127.0.0.1:8080/checkouts', { method:"GET"})
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
                 <td>`+authors[i].start_time+`</td>
                <td>`+authors[i].end_time+`</td>
                <td>`+authors[i].book_copy_id+`</td>
                <td>`+authors[i].patron_id+`</td>
                <td>`+authors[i].is_returned+`</td>`;
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

                const inputs = prompt("Upisite start_time,end_time,book_copy_id,patron_id,is_returned u ovom formatu (ostavite prazno ako ne menjate)", "").split(",");
                if (inputs == null) {

                } else {
                    let autor = {
                        id: this.parentNode.parentNode.dataset.authorid,
                        start_time: inputs[0],
                        end_time:inputs[1],
                        book_copy_id:inputs[2],
                        patron_id:inputs[3],
                        is_returned:inputs[4],

                    };
                    izmenjenAutor = JSON.stringify(autor);

                    fetch("http://127.0.0.1:8080/checkouts/" + this.parentNode.parentNode.dataset.authorid, {
                        method:"PUT",
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: izmenjenAutor
                    })
                        .then( response=>response.json())
                        .then( data => {
                            fetch('http://127.0.0.1:8080/checkouts', { method:"GET" })
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
                fetch("http://127.0.0.1:8080/checkouts/obrisi/" + this.parentNode.parentNode.dataset.authorid,
                    { method:"DELETE" })
                    .then( response=>response.json())
                    .then( data => {
                        fetch('http://127.0.0.1:8080/checkouts', { method:"GET" })
                            .then(response => response.json())
                            .then(data => updateAuthorList(data) );
                    });
            });
        }

        document.getElementById("btn_filter").addEventListener("click", function(){

            let q = document.getElementById("search_q").value;
            fetch("http://127.0.0.1:8080/checkouts/"+q, { method:"GET" })
                .then( response=>response.json())
                .then( data =>  updateAuthorList(data) );
        });

    }



    document.getElementById("btn_dodaj").addEventListener("click", function(){
        let noviAutor = {
            start_time: document.getElementById("novi_autor_start_time").value,
            end_time: document.getElementById("novi_autor_end_time").value,
            book_copy_id: document.getElementById("novi_autor_book_copy_id").value,
            patron_id: document.getElementById("novi_autor_patron_id").value,
            is_returned: document.getElementById("novi_autor_is_returned").value
        };

        nt = JSON.stringify(noviAutor);
        fetch("http://127.0.0.1:8080/checkouts/dodaj", {
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
                fetch('http://127.0.0.1:8080/checkouts', { method:"GET" })
                    .then(response => response.json())
                    .then(data => updateAuthorList(data) );
            });

        document.getElementById("novi_autor_start_time").value = '';
        document.getElementById("novi_autor_end_time").value = '';
        document.getElementById("novi_autor_book_copy_id").value = '';
        document.getElementById("novi_autor_patron_id").value = '';
        document.getElementById("novi_autor_is_returned").value = '';

    });
})