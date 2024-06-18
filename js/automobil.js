let data1=[
    {id:1,marka:"Zastava",model:"Yugo 55",brks:46,zapremina:1.1},
    {id:2,marka:"Fiat",model:"Grande Punto",brks:88,zapremina:1.3},
    {id:3,marka: "Ferrari", model: "SF-23", brks: 1050, zapremina: 1.6},
    {id:4,marka: "Red Bull", model: "RB19", brks: 1080, zapremina: 1.6},
    {id:5,marka: "McLaren", model: "MC160", brks: 1030, zapremina: 1.6},
    {id:6,marka: "Alfa Romeo", model: "C43", brks: 1040, zapremina: 1.6},
    
]
let selectedCar=null;
document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:9000/automobil')
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
});
function loadTableItems(items){
    const table= document.getElementById('body');
    let dataHtml='';
    for(const item of items){
        dataHtml+=`<tr> 
        <td>${item.id}</td>
        <td>${item.marka}</td>
        <td>${item.model}</td>
        <td>${item.brojKS}</td>
        <td>${item.zapreminaMotora}</td> `
        
    }
    table.innerHTML=dataHtml;
}
function search(){
    const searchValue= document.getElementById('search').value.toLowerCase();
    fetch(`http://localhost:9000/automobil/marka?marka=${searchValue}`)
    .then(response=>{
        return response.json();
    }).then(data=>{
        loadTableItems(data);
        
    })
    .catch(error=> {
        console.error('Greška:', error);
    });
    document.getElementById('editModal').className='modal';
    document.getElementById('id').value = "";
    document.getElementById('marka').value = "";
    document.getElementById('model').value = "";
    document.getElementById('snaga').value = "";
    document.getElementById('zapremina').value = "";
}
function clicked(){
    let tabela=document.querySelector('.tabela');
    tabela.addEventListener('click',function(event){
        let clickedRow= event.target.closest('tr');
        if(clickedRow){
            let rowData= extractData(clickedRow);

            let id=rowData["ID"];
            let marka=rowData["Marka"];
            let model=rowData["Model"];
            let brks=rowData["Broj KS"];
            let zapremina=rowData["Zapremina motora"];
            const sel= {id:id,marka:marka,model:model,brojKS:brks,zapreminaMotora:zapremina};
            selectedCar= sel;
            document.getElementById('editModal').className='modal2';
            document.getElementById('id').value=selectedCar.id;
            document.getElementById('marka').value=selectedCar.marka;
            document.getElementById('model').value=selectedCar.model;
            document.getElementById('snaga').value=selectedCar.brojKS;
            document.getElementById('zapremina').value=selectedCar.zapreminaMotora;
            //selectCar(number-1);
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
function selectCar(index){
    document.getElementById('editModal').className='modal2';
    const car=data[index];
    selectedCar=car;
    document.getElementById('id').value=car.id;
    document.getElementById('marka').value=car.marka;
    document.getElementById('model').value=car.model;
    document.getElementById('snaga').value=car.brks;
    document.getElementById('zapremina').value=car.zapremina;
}
function edit(){
        const id= selectedCar.id;
        const editedCar={
            id:id,
            marka:document.getElementById('marka').value,
            model:document.getElementById('model').value,
            brojKS:document.getElementById('snaga').value,
            zapreminaMotora:document.getElementById('zapremina').value
        };
        fetch(`http://localhost:9000/automobil/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editedCar)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
        })
        .then(data => {
            console.log('Automobil updated:', data);
            document.getElementById('editModal').className = 'modal';
            reload();
        })
        .catch(error => {
            console.error('Greška:', error);
        });
}
function closed(){
    document.getElementById('editModal').className='modal';
    selectedCar=null;
}
function reload(){
    fetch('http://localhost:9000/automobil')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            loadTableItems(data);
            data1=data;
            
        }).catch(error => {
            console.error('Greška:', error);
        });
        
}