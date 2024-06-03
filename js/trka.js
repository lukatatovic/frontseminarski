let data=[
    {id:1,nazivGrada:"Baku",duzina:12000.0,brojKrugova:2,brojTakmicara:2,datum:'2024-09-14',vreme:"01-02-45",trkaPoSuvom:"Da",
    takmicari:[{vozac:"Charles Leclerc",automobil:"Ferrari SF-23",start:2,kraj:1,vremev:"01-02-45",broj:15},{vozac:"Max Verstappen",automobil:"Red Bull RB19",start:1,kraj:2,vremev:"01-03-07",broj:1}]},
    {id:2,nazivGrada:"Monca",duzina:34759.2,brojKrugova:53,brojTakmicara:3,datum:'2023-09-03',vreme:"02-12-25",trkaPoSuvom:"Ne"},
    {id:3,nazivGrada:"Baku",duzina:18000.0,brojKrugova:6,brojTakmicara:3,datum:'2024-06-22',vreme:"01-44-57",trkaPoSuvom:"Da"}
];

let selectedRace;

document.addEventListener("DOMContentLoaded",()=> {loadTableItems(data);});

function loadTableItems(items){
    const table= document.getElementById('body');
    let dataHtml='';
    for(const item of items){
        dataHtml+=`<tr> 
        <td>${item.id}</td>
        <td>${item.nazivGrada}</td>
        <td>${item.duzina}</td>
        <td>${item.brojKrugova}</td>
        <td>${item.brojTakmicara}</td>
        <td>${item.datum}</td>
        <td>${item.vreme}</td>
        <td>${item.trkaPoSuvom}</td> </tr>`
        
    }
    table.innerHTML=dataHtml;
}
function search(){
    const searchValue=document.getElementById('search').value.toLowerCase();
    const filter= data.filter(item=>item.nazivGrada.toLowerCase().includes(searchValue));
    loadTableItems(filter);
    refresh();
}
function clicked(){
    let tabela=document.querySelector('.tabela');
    tabela.addEventListener('click',function(event){
        let clickedRow= event.target.closest('tr');
        if(clickedRow){
            let rowData= extractData(clickedRow);
            let number=rowData["ID"];
            console.log(number);
            loadTableTakmicari(number-1);
        }
    })
}

function extractData(row){
    let rowData = {};
    let cells = row.querySelectorAll('td');
    let headers = document.querySelectorAll('th');

    cells.forEach(function(cell, index) {
        let columnName = headers[index].textContent;
        let cellValue = cell.textContent;
        rowData[columnName] = cellValue;
    });
    return rowData;
}
function loadTableTakmicari(index){
    const tabelaTakmicari= document.getElementById('body-takmicari');
    const trka=data[index];
    selectedRace=trka;
    const takmicari= trka.takmicari;
    let dataTakmicari='';
    for (const takmicar of takmicari) {
        dataTakmicari+=`<tr> 
        <td>${takmicar.vozac}</td>
        <td>${takmicar.automobil}</td>
        <td>${takmicar.start}</td>
        <td>${takmicar.kraj}</td>
        <td>${takmicar.vremev}</td>
        <td>${takmicar.broj}</td>
                         </tr>`
        
    }
    tabelaTakmicari.innerHTML=dataTakmicari;
}
function obrisi(){
    const race= selectedRace.id;
    data= data.filter(r=> r.id!=race);
    loadTableItems(data);
    refresh();
}
function refresh(){
    let tabelaTakmicari2= document.getElementById('body-takmicari');
    let dataHtml2='';
    tabelaTakmicari2.innerHTML=dataHtml2;
}