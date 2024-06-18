let vozaci2=['Max Verstappen','Charles Leclerc','Lewis Hamiltpon','Oscar Piastri','Carlos Sainz'];
let automobili2=['Zastava Yugo 55','Fiat Evo','Ferrari SF-23','Red Bull RB19'];
let gradovi2=[{naziv:'Baku',duzina:6003.0},{naziv:'Monca',duzina:5793.1}];
let takmicari=[];
let selectedTakmicar=null;
let selectedRoww= null;

document.addEventListener('DOMContentLoaded',function(){
    const vozacSelect= document.getElementById('vozac');
    fetch('http://localhost:9000/vozac')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(vozaci => {
                vozaci.forEach(vozac=>{
                const option= document.createElement('option');
                option.textContent=vozac.ime+' '+vozac.prezime;
                option.value= vozac.id;
                vozacSelect.appendChild(option);
            });
            vozaci2=vozaci;
        }
        )
        .catch(error => {
            console.error('Greška:', error);
        });
    

    const autoSelect=document.getElementById('automobil');
    fetch('http://localhost:9000/automobil')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(automobili => {
                automobili.forEach(auto=>{
                const option= document.createElement('option');
                option.textContent=auto.marka+' '+auto.model;
                option.value= auto.id;
                autoSelect.appendChild(option);
            });
            automobili2=automobili;
        })
        .catch(error => {
            console.error('Greška:', error);
        });

    const gradSelect=document.getElementById('grad');
    fetch('http://localhost:9000/grad')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(gradovi => {
                gradovi.forEach(grad=>{
                const option= document.createElement('option');
                option.textContent=grad.naziv;
                option.value= grad.id;
                gradSelect.appendChild(option);
            });
            gradovi2=gradovi;
        })
        .catch(error => {
            console.error('Greška:', error);
        });
});

function loadTableItems(){
    const table= document.getElementById('body');
    let dataHtml='';
    for (const item of takmicari) {
        dataHtml+=`<tr> 
        <td>${item.vozac.ime+' '+item.vozac.prezime}</td>
        <td>${item.automobil.marka+' '+item.automobil.model}</td>
        <td>${item.startnaPozicija}</td>
        <td>${item.zavrsnaPozicija}</td>
        <td>${item.brojNaAutomobilu}</td>
        <td>${item.vreme}</td> `
    }
    table.innerHTML=dataHtml;
}
function add(){
    const vozac = document.getElementById('vozac').value;
    for(voz of vozaci2){
        if(voz.id==vozac){
            var v= voz;
        }
    }
    const automobil = document.getElementById('automobil').value;
    for(auto of automobili2){
        if(auto.id==automobil){
            var a= auto;
        }
    }
    const start = document.getElementById('start').value;
    const broj = document.getElementById('broj').value;
    const vreme = document.getElementById('vreme').value;

    const takmicar={vozac:v,automobil:a,startnaPozicija:start,zavrsnaPozicija:0,brojNaAutomobilu:broj,vreme:vreme};
    const exsits= takmicari.some(takm=> takm.vozac===v);
    if(exsits){
        console.log("Vec se trka");
        return;
    }
    const exsits2= takmicari.some(takm=> takm.startnaPozicija===start);
    if(exsits2){
        console.log("Vec neko startuje sa te pozicije");
        return;
    }
    const exsits3= takmicari.some(takm=> takm.brojNaAutomobilu==broj);
    if(exsits3){
        console.log("Vec neko ima ovaj broj automobila");
        return;
    }
    
    takmicari.push(takmicar);
    sort();
    loadTableItems();
}
function sort(){
    takmicari.forEach(takmicar=>{
        const vremeParts=takmicar.vreme.split(':');
        takmicar.vremeSekunde=(+vremeParts[0] * 3600) + (+vremeParts[1] * 60) + (+vremeParts[2]);
    });
    takmicari.sort((a,b)=>a.vremeSekunde-b.vremeSekunde);
    takmicari.forEach((takmicar,index)=>{
        takmicar.zavrsnaPozicija=index+1;
    });
}

function obrisi(){
    takmicari=takmicari.filter((element, index) => index !== selectedRoww-1);
    sort(); 
    loadTableItems(); 
}
function clicked(){
    let tabela=document.querySelector('.tabela');
    tabela.addEventListener('click',function(event){
        let clickedRow= event.target.closest('tr');
        if(clickedRow){
            let rowData= extractData(clickedRow);
            selectedTakmicar=rowData;   
            selectedRoww=clickedRow.rowIndex;
           // obrisi(clickedRow.rowIndex);
        }
    })
}
function extractData(row){
    let rowData = {};
    let cells = row.querySelectorAll('td');
    let headers = document.querySelectorAll('th');

    if (cells.length !== headers.length) {
        console.error('Broj kolona u redu se ne podudara sa brojem zaglavlja.');
        return null;
    }

    cells.forEach(function(cell, index) {
        let columnName = headers[index].textContent;
        let cellValue = cell.textContent;
        rowData[columnName] = cellValue;
    });
    return rowData;
}
function save(){
    const brojKrugova=document.getElementById('brojkrugova').value;
    const datum=document.getElementById('datum').value;
    const suvo=document.getElementById('suvo').checked;
    const grad=document.getElementById('grad').value;
    for(const gr of gradovi2){
        if(gr.id==grad){
            var g= gr;
        }
    }
    const vreme= takmicari[0].vreme;
    const brojTakmicara= takmicari.length;
    const korisnik={id:1,ime:'Luka',prezime:'Tatovic',username:'luka',password:'luka'};
    const trka= {brojKrugova:parseInt(brojKrugova),trkaPoSuvom:suvo,grad:g,korisnik:korisnik,takmicari:takmicari};
    console.log(trka);
    fetch('http://localhost:9000/trka',{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(trka)
    })
    .then(response => {
        console.log('HTTP odgovor:', response);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Greška:', error);
    });
    
}