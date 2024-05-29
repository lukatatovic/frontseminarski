let data=[
    {id:1,marka:"Zastava",model:"Yugo 55",brks:46,zapremina:1.1},
    {id:2,marka:"Fiat",model:"Grande Punto",brks:88,zapremina:1.3},
    {id:3,marka: "Ferrari", model: "SF-23", brks: 1050, zapremina: 1.6},
    {id:4,marka: "Red Bull", model: "RB19", brks: 1080, zapremina: 1.6},
    {id:5,marka: "McLaren", model: "MC160", brks: 1030, zapremina: 1.6},
    {id:6,marka: "Alfa Romeo", model: "C43", brks: 1040, zapremina: 1.6},
    
]
let selectedCar=null;
document.addEventListener("DOMContentLoaded",()=> {loadTableItems(data);});
function loadTableItems(items){
    const table= document.getElementById('body');
    let dataHtml='';
    for(const item of items){
        dataHtml+=`<tr> 
        <td>${item.id}</td>
        <td>${item.marka}</td>
        <td>${item.model}</td>
        <td>${item.brks}</td>
        <td>${item.zapremina}</td> `
        
    }
    table.innerHTML=dataHtml;
}
function search(){
    const searchValue= document.getElementById('search').value.toLowerCase();
    const filterData= data.filter(item=> item.marka.toLowerCase().includes(searchValue));
    document.getElementById('editModal').className='modal';
    document.getElementById('id').value = "";
    document.getElementById('marka').value = "";
    document.getElementById('model').value = "";
    document.getElementById('snaga').value = "";
    document.getElementById('zapremina').value = "";
    loadTableItems(filterData);
}
function clicked(){
    let tabela=document.querySelector('.tabela');
    tabela.addEventListener('click',function(event){
        let clickedRow= event.target.closest('tr');
        if(clickedRow){
            let rowData= extractData(clickedRow);
            let number=rowData["ID"];
            selectCar(number-1);
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
    if(selectedCar!==null){
        let id= document.getElementById('id').value;
        const editedCar={
            id:id,
            marka:document.getElementById('marka').value,
            model:document.getElementById('model').value,
            brks:document.getElementById('snaga').value,
            zapremina:document.getElementById('zapremina').value
        };
        const index=data.findIndex(d=> d.id==id);
        if(index!==-1){
            data[index]=editedCar;
            selectedCar=null;
            document.getElementById('editModal').className='modal';
            loadTableItems(data);
        }
    } 
}
function closed(){
    document.getElementById('editModal').className='modal';
    selectedCar=null;
}