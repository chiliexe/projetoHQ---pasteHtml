const btnArea = document.querySelector("#buttons-area")
const btnReset = document.querySelector('#reset');
const btnAdd = document.querySelector("#btnAdd")
const form = document.querySelector("form")

function addBtn() {
    let div = document.createElement('div')
    let label = document.createElement('label')
    let input = document.createElement('input')

    div.classList.add("col-12");
    label.innerText = btnArea.children.length
    input.setAttribute("type", "url")
    input.setAttribute("id", "download")
    input.classList.add("form-control")

    div.appendChild(label)
    div.appendChild(input)
    btnArea.appendChild(div)
}

function getDataAtual() {
    let dataAtual = new Date();

    let dia = String(dataAtual.getDate()).padStart(2, '0');
    let mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    let ano = dataAtual.getFullYear();

    return `${dia}/${mes}/${ano}`;
}

function gerarCodigo(e) {
    e.preventDefault()

    const titulo = document.querySelector("#titulo").value;
    const editora = document.querySelector("#editora").value;
    const dataHq = document.querySelector("#data").value;
    const descricao = document.querySelector("#descricao").value;
    const imageLink = document.querySelector("#imagem").value;
    let btnDownload = document.querySelectorAll("#download");
    const dataPost = getDataAtual();

    let hqLinkLoopTxt = `
                <div class="card" style="border: none; margin: 5px;">
                    <div class="col">
                        <a href="">
                            <img src="${imageLink}" alt="" width="115px">
                        </a>
                    </div>
                    <div class="col">
                        <a href="{hqLink}">Download: {hqTexto}</a>
                    </div>
                </div>
            `
    let hqLinkLoop = ""
    btnDownload.forEach((value, key) => {
        if (!(value.value == "")) {
            if ((key + 1) < 10) {
                hqLinkLoop += hqLinkLoopTxt.replace("{hqLink}", value.value).replace("{hqTexto}", "#0" + (key + 1))
            } else {
                hqLinkLoop += hqLinkLoopTxt.replace("{hqLink}", value.value).replace("{hqTexto}", "#" + (key + 1))
            }
        }
    })

    let texto = `
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <main>

        <style>@import "https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap";:root{--color-text: #2a2a2a;--color-text-2: #f2f2f2;--color-1: #3B82F6;--color-2: #2654a0;--color-3: #02235a}.wp-post-image{width:86%!important}html{scroll-behavior:smooth}*{margin:0;padding:0;font-family:Poppins,sans-serif;color:var(--color-text)}section{width:100%;display:flex;justify-content:start;flex-wrap:wrap}.card-section{margin:5px;width:200px;height:300px}@media screen and (max-width:1000px){section{width:85%}.card-section,.card-section img{width:150px;height:250px}}@media screen and (max-width:770px){.card-section,.card-section img{width:130px;height:230px}section{width:85%}}@media screen and (max-width:440px){main{flex-direction:column}.card-section,.card-section img{width:150px;height:250px}section{width:100%}}p{margin-bottom:5px}.links{display:flex;flex-wrap:wrap;width:100%}</style>
        <section>
            <div class="card mb-3" style="max-width: 100%; border: none;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${imageLink}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">

                            <p class="card-text">
                            </p>
                            <p>
                                <b>Nome: </b> ${titulo}
                            </p>
                            <p>
                                <b>Editora: </b> ${editora}
                            </p>
                            <p>
                                <b>Ano de Lançamento: </b> ${dataHq}
                            </p>
                            <p>
                                <b>Data da postagem: </b> ${dataPost}
                            </p>
                            <p><b>Resumo: </b>
                                ${descricao}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col mt-5">
                <h3>Downloads</h3>
                <div class="links">

                    ${hqLinkLoop}


                </div>
            </div>









        </section>

    </main>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
        crossorigin="anonymous"></script>
    `

    navigator.clipboard.writeText(texto)
    document.querySelector("#copy").classList.remove("d-none")
    setTimeout(() => { document.querySelector("#copy").classList.add("d-none") }, 2000)
}


// ACTION
btnReset.onclick = (e) => { window.location.reload() };
btnAdd.onclick = addBtn
form.onsubmit = (e) => gerarCodigo(e)