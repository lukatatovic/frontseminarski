function add(){
    const marka= document.getElementById('marka').value;
    const model= document.getElementById('model').value;
    const brks= document.getElementById('brks').value;
    const zapremina= document.getElementById('zapremina').value;
    const auto={marka:marka,model:model,brojKS:brks,zapreminaMotora:zapremina};
    fetch('http://localhost:9000/automobil',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(auto)
    })
    .then(response =>{
        if(!response.ok){
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    }).then(data=>{
        console.log(data);
    })
    .catch(error =>{
        console.error('Greška:', error);
    });
}