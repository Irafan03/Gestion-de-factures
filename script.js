class Facture {
    constructor(id, reference, quantite, prixunitaire) {
        this.id = id;
        this.reference = reference;
        this.quantite = quantite;
        this.prixunitaire = prixunitaire;
    }

    getTotal() {
        return this.quantite * this.prixunitaire;
    }
}


let Factures = [];
let i = 0;
let selectedId = null;


const refInput = document.getElementById('ref');
const qntInput = document.getElementById('qnt');
const puInput = document.getElementById('pu');
const totalDisplay = document.getElementById('total');
const tbody = document.querySelector('#listeFacture tbody');

const addBtn = document.getElementById('addBtn');
const filterBtn = document.getElementById('filterBtn');
const modifyBtn = document.getElementById('modifyBtn');
const deleteBtn = document.getElementById('deleteBtn');


function ListerFacture() {
    tbody.innerHTML = ''; 
    let totalFacture = 0;

    Factures.forEach(f => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${f.id}</td>
            <td>${f.reference}</td>
            <td>${f.quantite}</td>
            <td>${f.prixunitaire.toFixed(2)}</td>
            <td>${f.getTotal().toFixed(2)}</td>
        `;
        tr.onclick = () => selectLigne(f.id, tr);
        tbody.appendChild(tr);
        totalFacture += f.getTotal();
    });

    totalDisplay.textContent = `Total : ${totalFacture.toFixed(2)}`;
}


function selectLigne(id, rowElement) {
    selectedId = id;
    const f = Factures.find(f => f.id === id);

   
    refInput.value = f.reference;
    qntInput.value = f.quantite;
    puInput.value = f.prixunitaire;

   
    document.querySelectorAll('#listeFacture tbody tr').forEach(tr => {
        tr.style.backgroundColor = '';
    });
    rowElement.style.backgroundColor = '#d0e8ff';
}


function addFacture() {
    if (!refInput.value || !qntInput.value || !puInput.value) {
        alert("Remplissez tous les champs !");
        return;
    }

    const nouvelle = new Facture(++i, refInput.value, parseInt(qntInput.value), parseFloat(puInput.value));
    Factures.push(nouvelle);
    viderInputs();
    ListerFacture();
}

function filterFacture() {
    const ref = refInput.value.trim().toLowerCase();
    if (!ref) {
        alert("Entrez une référence à filtrer !");
        return;
    }

    let trouve = false;
    document.querySelectorAll('#listeFacture tbody tr').forEach(tr => {
        const refCell = tr.cells[1].textContent.toLowerCase();
        if (refCell.includes(ref)) {
            tr.style.backgroundColor = '#ffeb3b'; 
            trouve = true;
        } else {
            tr.style.backgroundColor = '';
        }
    });

    if (!trouve) {
        alert("Aucune référence trouvée !");
    }
}


function modifyFacture() {
    const ref = refInput.value.trim();
    if (!ref || !qntInput.value || !puInput.value) {
        alert("Remplissez tous les champs pour modifier !");
        return;
    }

    const facture = Factures.find(f => f.reference.toLowerCase() === ref.toLowerCase());
    if (!facture) {
        alert("Référence non trouvée !");
        return;
    }

    facture.quantite = parseInt(qntInput.value);
    facture.prixunitaire = parseFloat(puInput.value);
    viderInputs();
    ListerFacture();
}

function deleteFacture() {
    const ref = refInput.value.trim();
    if (!ref) {
        alert("Entrez une référence à supprimer !");
        return;
    }

    const index = Factures.findIndex(f => f.reference.toLowerCase() === ref.toLowerCase());
    if (index === -1) {
        alert("Référence non trouvée !");
        return;
    }

    if (confirm(`Supprimer la facture "${Factures[index].reference}" ?`)) {
        Factures.splice(index, 1);
        viderInputs();
        ListerFacture();
    }
}


function viderInputs() {
    refInput.value = '';
    qntInput.value = '';
    puInput.value = '';
    selectedId = null;
    document.querySelectorAll('#listeFacture tbody tr').forEach(tr => {
        tr.style.backgroundColor = '';
    });
}


addBtn.onclick = addFacture;
filterBtn.onclick = filterFacture;
modifyBtn.onclick = modifyFacture;
deleteBtn.onclick = deleteFacture;

ListerFacture();