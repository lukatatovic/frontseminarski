const vozaci=['Max Verstappen','Charles Leclerc','Lewis Hamiltpon','Oscar Piastri','Carlos Sainz'];
const automobili=[,'Zastava Yugo 55','Fiat Evo','Ferrari SF-23','Red Bull RB19'];
const gradovi=[{naziv:'Baku',duzina:6003.0},{naziv:'Monca',duzina:5793.1}];
let takmicari=[];
let selectedTakmicar=null;

document.addEventListener('DOMContentLoaded',function(){
    const vozacSelect= document.getElementById('vozac');
    vozaci.forEach(vozac=>{
        const option= document.createElement('option');
        option.textContent=vozac;
        vozacSelect.appendChild(option);
    });

    const autoSelect=document.getElementById('automobil');
    automobili.forEach(auto=>{
        const option2=document.createElement('option');
        option2.textContent=auto;
        autoSelect.appendChild(option2);
    });

    const gradSelect=document.getElementById('grad');
    gradovi.forEach(grad=>{
        const option3=document.createElement('option');
        option3.textContent=grad.naziv;
        gradSelect.appendChild(option3);
    })
});

function loadTableItems(){
    const table= document.getElementById('body');
    let dataHtml='';
    for (const item of takmicari) {
        dataHtml+=`<tr> 
        <td>${item.vozac}</td>
        <td>${item.automobil}</td>
        <td>${item.start}</td>
        <td>${item.kraj}</td>
        <td>${item.broj}</td>
        <td>${item.vreme}</td> `
    }
    table.innerHTML=dataHtml;
}
function add(){
    const vozac = document.getElementById('vozac').value;
    const automobil = document.getElementById('automobil').value;
    const start = document.getElementById('start').value;
    const broj = document.getElementById('broj').value;
    const vreme = document.getElementById('vreme').value;

    const takmicar={vozac:vozac,automobil:automobil,start:start,kraj:0,broj:broj,vreme:vreme};
    const exsits= takmicari.some(takm=> takm.vozac===vozac);
    if(exsits){
        console.log("Vec se trka");
        return;
    }
    const exsits2= takmicari.some(takm=> takm.start===start);
    if(exsits2){
        console.log("Vec neko startuje sa te pozicije");
        return;
    }
    const exsits3= takmicari.some(takm=> takm.broj==broj);
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
        takmicar.kraj=index+1;
    });
}

function obrisi(){
    const name=selectedTakmicar.Vozac;
    takmicari=takmicari.filter(takmicar => takmicar.vozac !== name);
    sort(); 
    loadTableItems(); 
}
function clicked(){
    let tabela=document.querySelector('.tabela');
    tabela.addEventListener('click',function(event){
        let clickedRow= event.target.closest('tr');
        if(clickedRow){
            let rowData= extractData(clickedRow);
            console.log(rowData);
            selectedTakmicar= rowData;
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
    const suvo=document.getElementById('suvo').value;
    const grad=document.getElementById('grad').value;
    const vreme= takmicari[0].vreme;
    const grad2=gradovi.find(grad3=>grad3.naziv===grad);
    const brojTakmicara= takmicari.length;

    const trka= {grad:grad, duzina:brojKrugova*grad2.duzina, brojKrugova:brojKrugova,brojTakmicara:brojTakmicara ,datum:datum,vreme:vreme,suvo:suvo,takmicari:takmicari};
    console.log(trka);
}