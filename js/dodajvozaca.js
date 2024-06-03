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
    const vozac= {ime:ime,prezime:prezime,datumRodjenja:datum,drzava:drzava};
    console.log(vozac);
}
