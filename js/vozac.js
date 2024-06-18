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
        <td>${item.datum_rodjenja}</td>
        <td>${item.drzava}</td>
     </tr>`;
    }
    tableBody.innerHTML=dataHtml;
}
function search(){
    const searchValut= document.getElementById('search').value.toLowerCase();
    /*const filterData= data.filter(item=> item.ime.toLowerCase().includes(searchValut));
    */
    fetch(`http://localhost:9000/vozac/ime?ime=${searchValut}`)
    .then(response=>{
        return response.json();
    }).then(data=>{
        loadTableItems(data);
        console.log(data);
    })
    .catch(error=> {
        console.error('Greška:', error);
    });
    document.getElementById('id').value = "";
    document.getElementById('ime').value = "";
    document.getElementById('prezime').value = "";
    document.getElementById('datum').value = "";
    document.getElementById('drzava').value = "";
    //loadTableItems(filterData);
}
document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:9000/vozac')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(dataa => {
            loadTableItems(dataa);
            data=dataa;
            console.log(data);
        })
        .catch(error => {
            console.error('Greška:', error);
        });
});
function selectDriver(index) {
    document.getElementById('editModal').className='modal2';
    //1.const driver = data[index];
   /* 2.for(let item of data){
        if(item.id=index){
            var driver=item;
        }
    }*/
    let id=Number(index);
    fetch(`http://localhost:9000/vozac/${id}`)
    .then(response=>{
        return response.json();
    })
    .then(data=>{
        console.log(data);
        document.getElementById('id').value = data.id;
        document.getElementById('ime').value = data.ime;
        document.getElementById('prezime').value = data.prezime;
        document.getElementById('datum').value = data.datum_rodjenja;
        document.getElementById('drzava').value = data.drzava;
        selectedDriver=data;
    })
    .catch(error=> {
        console.error('Greška:', error);
    });
    console.log(selectedDriver);
}
function clicked() {
    let table = document.querySelector('.tabela');
    table.addEventListener('click', function(event) {
        let clickedRow = event.target.closest('tr');
        if (clickedRow) {
            let rowIndex = Array.from(clickedRow.parentElement.children).indexOf(clickedRow);
            let rowData= extractRowData(clickedRow);
            let number =rowData["ID"];
            console.log(number);
           // 1.selectDriver(number-1);
           selectDriver(number);
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
    /*
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
    }*/
   const id= selectedDriver.id;
   const editDriver={
    id: id,
    ime: document.getElementById('ime').value,
    prezime:document.getElementById('prezime').value,
    datum_rodjenja: document.getElementById('datum').value,
    drzava:document.getElementById('drzava').value
    };
    fetch(`http://localhost:9000/vozac/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editDriver)
    })
    .then(response=>{
        return response.json();
    })
    .then(data => {
        console.log('Vozac updated:', data);
        document.getElementById('editModal').className = 'modal';
        reload();
    })
    .catch(error => {
        console.error('Greška:', error);
    });
    

}
function closed(){
    document.getElementById('editModal').className='modal';
    selectedDriver=null;
}
function reload(){
    fetch('http://localhost:9000/vozac')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(dataa => {
            loadTableItems(dataa);
            data=dataa;
            console.log(data);
        })
        .catch(error => {
            console.error('Greška:', error);
        });
}