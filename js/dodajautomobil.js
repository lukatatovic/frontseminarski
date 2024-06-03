function add(){
    const marka= document.getElementById('marka').value;
    const model= document.getElementById('model').value;
    const brks= document.getElementById('brks').value;
    const zapremina= document.getElementById('zapremina').value;

    const auto={marka:marka,model:model,brks:brks,zapremina:zapremina};
    console.log(auto);
}