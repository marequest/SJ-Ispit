window.addEventListener("load", () => {
    fetch('http://127.0.0.1:8080/users', { method:"GET"})
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
                 <td>`+authors[i].name+`</td>
                <td>`+authors[i].admin+`</td>
                <td>`+authors[i].email+`</td>`;
            redHTML += `<td>
                  <button class="btn btn-danger btn-sm btn_obrisi">Obriši</button>
              </td>
          </tr>`;
            tabela.innerHTML += redHTML;
        }

        var btns_obrisi = document.querySelectorAll("#autori .btn_obrisi");
        for(i=0; i<btns_obrisi.length; i++){
            btns_obrisi[i].addEventListener("click", function(){
                console.log(this.parentNode.parentNode.dataset.authorid);
                fetch("http://127.0.0.1:8080/users/obrisi/" + this.parentNode.parentNode.dataset.authorid,
                    { method:"DELETE" })
                    .then( response=>response.json())
                    .then( data => {
                        fetch('http://127.0.0.1:8080/users', { method:"GET" })
                            .then(response => response.json())
                            .then(data => updateAuthorList(data) );
                    });
            });
        }

        document.getElementById("btn_filter").addEventListener("click", function(){

            let q = document.getElementById("search_q").value;
            fetch("http://127.0.0.1:8080/users/"+q, { method:"GET" })
                .then( response=>response.json())
                .then( data =>  updateAuthorList(data) );
        });

    }
})