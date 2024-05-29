let data = [
    {id:1,ime: 'Max', prezime: 'Verstappen', datum: '1997-09-30', drzava: 'Holandija'},
    {id:2,ime: 'Charles', prezime: 'Leclerc', datum: '1997-10-16', drzava: 'Monako'},
    {id:3,ime: 'Lewis', prezime: 'Hamilton', datum: '1985-01-07', drzava: 'Velika Britanija'},
    
];
let selectedDriver=null;
function loadTableItems(items){
    const tableBody= document.getElementById('tableBody');
    let dataHtml= '';
    for(let item of items){
        dataHtml+=`<tr>
        <td>${item.id}</td>
        <td>${item.ime}</td>
        <td>${item.prezime}</td>
        <td>${item.datum}</td>
        <td>${item.drzava}</td>
     </tr>`;
    }
    tableBody.innerHTML=dataHtml;
}
function search(){
    const searchValut= document.getElementById('search').value.toLowerCase();
    const filterData= data.filter(item=> item.ime.toLowerCase().includes(searchValut));
    document.getElementById('id').value = "";
    document.getElementById('ime').value = "";
    document.getElementById('prezime').value = "";
    document.getElementById('datum').value = "";
    document.getElementById('drzava').value = "";
    loadTableItems(filterData);
}
document.addEventListener('DOMContentLoaded', () => {
    loadTableItems(data);
});
function selectDriver(index) {
    document.getElementById('editModal').className='modal2';
    const driver = data[index];
    selectedDriver=driver;
    document.getElementById('id').value = driver.id;
    document.getElementById('ime').value = driver.ime;
    document.getElementById('prezime').value = driver.prezime;
    document.getElementById('datum').value = driver.datum;
    document.getElementById('drzava').value = driver.drzava;
}
function clicked() {
    let table = document.querySelector('.tabela');
    table.addEventListener('click', function(event) {
        let clickedRow = event.target.closest('tr');
        if (clickedRow) {
            let rowIndex = Array.from(clickedRow.parentElement.children).indexOf(clickedRow);
            let rowData= extractRowData(clickedRow);
            let number =rowData["ID"];
            selectDriver(number-1);
           // console.log(rowData["ID"]);
        }
    });
}
function extractRowData(row) {
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

function edit(){
    if(selectedDriver!==null){
        let id=document.getElementById('id').value;
        const editDriver={
            id: id,
            ime: document.getElementById('ime').value,
            prezime:document.getElementById('prezime').value,
            datum: document.getElementById('datum').value,
            drzava:document.getElementById('drzava').value
        };
        const index= data.findIndex(d =>d.id==id);
        if(index!==-1){
            data[index]=editDriver;
            selectedDriver=null;
            document.getElementById('editModal').className='modal';
            loadTableItems(data);
        }
    }else{
        console.log("nije selektovan")
    }
}
function closed(){
    document.getElementById('editModal').className='modal';
    selectedDriver=null;
}