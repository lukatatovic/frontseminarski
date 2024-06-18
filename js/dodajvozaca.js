const drzave=['Srbija','Holandija','Velika Britanija','Monako','Nemacka','Spanija','Brazil','SAD','Francuska','Australija','Kanada','Japan']

document.addEventListener('DOMContentLoaded',function(){
    const vozacSelect= document.getElementById('drzava');
    drzave.forEach(drzava=>{
        const option= document.createElement('option');
        option.textContent=drzava;
        vozacSelect.appendChild(option);
    });}
);

function add(){
    const ime= document.getElementById('ime').value;
    const prezime= document.getElementById('prezime').value;
    const datum= document.getElementById('datum').value;
    const drzava= document.getElementById('drzava').value;
    const vozac= {ime:ime,prezime:prezime,datum_rodjenja:datum,drzava:drzava};
    fetch('http://localhost:9000/vozac',{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(vozac)
    })
    .then(response => {
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
