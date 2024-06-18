let data1=[
    {id:1,nazivGrada:"Baku",duzina:12000.0,brojKrugova:2,brojTakmicara:2,datum:'2024-09-14',vreme:"01-02-45",trkaPoSuvom:"Da",
    takmicari:[{vozac:"Charles Leclerc",automobil:"Ferrari SF-23",start:2,kraj:1,vremev:"01-02-45",broj:15},{vozac:"Max Verstappen",automobil:"Red Bull RB19",start:1,kraj:2,vremev:"01-03-07",broj:1}]},
    {id:2,nazivGrada:"Monca",duzina:34759.2,brojKrugova:53,brojTakmicara:3,datum:'2023-09-03',vreme:"02-12-25",trkaPoSuvom:"Ne"},
    {id:3,nazivGrada:"Baku",duzina:18000.0,brojKrugova:6,brojTakmicara:3,datum:'2024-06-22',vreme:"01-44-57",trkaPoSuvom:"Da"}
];

let selectedRace;

document.addEventListener("DOMContentLoaded",function() {
    fetch('http://localhost:9000/trka')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            loadTableItems(data);
            data1=data;
            console.log(data);
        })
        .catch(error => {
            console.error('Greška:', error);
        });
}

);

function loadTableItems(items){
    const table= document.getElementById('body');
    let dataHtml='';
    for(const item of items){
        dataHtml+=`<tr> 
        <td>${item.id}</td>
        <td>${item.grad.naziv}</td>
        <td>${item.duzina}</td>
        <td>${item.brojKrugova}</td>
        <td>${item.brojTakmicara}</td>
        <td>${item.datum}</td>
        <td>${item.vreme}</td>
        <td>${item.trkaPoSuvom}</td> </tr>`
        //console.log("takmicari  trka id: "+item.id+" "+ item.takmicari);
       /* for(const takm of item.takmicari){
            console.log(takm);
        }*/
    }
    table.innerHTML=dataHtml;
}
function search(){
    const searchValue=document.getElementById('search').value.toLowerCase();
    fetch(`http://localhost:9000/trka/naziv?naziv=${searchValue}`)
    .then(response=>{
        return response.json();
    }).then(data=>{
        loadTableItems(data);
        
    })
    .catch(error=> {
        console.error('Greška:', error);
    });
    refresh();
}
function clicked(){
    let tabela=document.querySelector('.tabela');
    tabela.addEventListener('click',function(event){
        let clickedRow= event.target.closest('tr');
        if(clickedRow){
            let rowData= extractData(clickedRow);
            let number=rowData["ID"];
            selectedRace= rowData;
            loadTableTakmicari(number);
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
    var dataTakmicari='';
    fetch(`http://localhost:9000/takmicar/${index}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            for(const takmicar of data){
                
                dataTakmicari+=`<tr> 
                <td>${takmicar.vozac.ime+' '+takmicar.vozac.prezime}</td>
                <td>${takmicar.automobil.marka+' '+takmicar.automobil.model}</td>
                <td>${takmicar.startnaPozicija}</td>
                <td>${takmicar.zavrsnaPozicija}</td>
                <td>${takmicar.brojNaAutomobilu}</td>
                <td>${takmicar.vreme}</td>
                                 </tr>`
                                
            }
            console.log(dataTakmicari);
            tabelaTakmicari.innerHTML=dataTakmicari;
        })
        .catch(error => {
            console.error('Greška:', error);
        });
    /*
    const trka=data1[index];
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
                         </tr>`*/
        
    //tabelaTakmicari.innerHTML=dataTakmicari;
}
function obrisi(){
    const race= selectedRace.ID;
    fetch(`http://localhost:9000/trka/${race}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
    })
    .then(data => {
        console.log('Trka deleted:', data);
    })
    .catch(error => {
        console.error('Greška:', error);
    });
    refresh();
}
function refresh(){
    let tabelaTakmicari2= document.getElementById('body-takmicari');
    let dataHtml2='';
    tabelaTakmicari2.innerHTML=dataHtml2;
    fetch('http://localhost:9000/trka')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            loadTableItems(data);
            data1=data;
            console.log(data);
        })
        .catch(error => {
            console.error('Greška:', error);
        });

}