var popup = undefined;

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_sucataria')) ?? [];

const setLocalStorage = (dbSucataria) => localStorage.setItem('db_sucataria', JSON.stringify(dbSucataria));

function openPopup(button){
    const card = button.closest("div");
    popup = card.querySelector("dialog");
    popup.showModal();
}

function closePopup(){
    popup.close();
}

function criarSucataria() {
    const dbSucataria = getLocalStorage();
    const nome = document.getElementById("nome-sucataria").value
    const local = document.getElementById("local-sucataria").value

    if (validaCampos(nome, local) === false) {
        return;
    }

    sucataria ={
        nome : document.getElementById("nome-sucataria").value,
        local: document.getElementById("local-sucataria").value
    } 

    dbSucataria.push(sucataria);
    localStorage.setItem('db_sucataria', JSON.stringify(dbSucataria));
}

const readSucataria = () => getLocalStorage();

function updateSucataria(index) {
    const dbSucatariaUp = readSucataria();
    const nome = document.getElementById("novo-nome-sucataria").value
    const local = document.getElementById("novo-local-sucataria").value

    sucataria ={
        nome : nome,
        local: local
    }
    dbSucatariaUp[index] = sucataria;
    setLocalStorage(dbSucatariaUp);
    atualizaLista();
    closePopup();
}

function deleteSucataria(index) {
    const dbSucatariaDel = readSucataria();
    dbSucatariaDel.splice(index, 1);
    setLocalStorage(dbSucatariaDel);
    atualizaLista() 
}

function validaCampos(nome, local) {
    if (nome == '' || local == '') {
        console.log('false')
        return false;
    }
    return true;
}

function limpaLista() {
    lista = document.getElementById('lista-sucatarias').innerHTML = '';
}

function atualizaLista() {
    const dbSucatariasTable = readSucataria();
    limpaLista();
    dbSucatariasTable.forEach(createCard);

}

const createCard = (sucataria, index) => {
    const card = document.createElement('div')
    card.classList.add('sucataria')
    card.innerHTML = `
                    <div style="display: flex;flex-direction: column;gap: 10px;">
                        <h3 id="nome-sucataria-${index}">Nome: ${sucataria.nome}</h3>
                        <p id="local-sucataria-${index}">Endereço: ${sucataria.local}</p>
                    </div>
                    <div>
                        <button class="btn-primary" onclick="openPopup(this)">editar</button>
                        <button class="btn-primary" onclick="deleteSucataria(${index})">excluir</button>
                        <dialog>
                            <h2>Editar Sucataria</h2>
                            <input type="text" name="novo-nome-sucataria" id="novo-nome-sucataria" value="${sucataria.nome}" >
                            <input type="text" name="novo-local-sucataria" id="novo-local-sucataria" value="${sucataria.local}">
                            <button id="enviar" onclick="updateSucataria(${index})" class="btn-primary">enviar</button>
                            <button onclick="closePopup()" class="btn-primary">Cancelar</button>
                        </dialog>
                    </div>`;
    document.getElementById('lista-sucatarias').appendChild(card);
}