let apikey = "794653a6-4cd4-43c6-86b5-48d0b76f7573";
let input = document.getElementById('inputword');
let search = document.getElementById('search');
let reset = document.getElementById('reset');
let notfound = document.querySelector('.not_found');
let defBox = document.querySelector('.def');

reset.addEventListener('click', function(e){
    e.preventDefault();
    notfound.innerHTML = "";
    defBox.innerHTML = "";
    input.value = "";
})

search.addEventListener('click', function(e){
    e.preventDefault();
    notfound.innerHTML = "";
    defBox.innerHTML = "";
    let word = input.value;
    if(word.length == 0){
        alert('Word is required!');
        return;
    }
    getData(word);
})

async function getData(word){
    // Ajax Call
    const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${apikey}`);
    const data = await response.json();
    // console.log(data);

    if(!data.length){
        notfound.innerHTML = "Sorry, no result found!!"
        return;
    }

    // If data is suggestion
    if(typeof data[0] === 'string'){
        let heading = document.createElement('h3');
        heading.innerHTML = "Did you mean?";
        notfound.appendChild(heading);
        data.forEach(element => {
            let suggestion = document.createElement('span');
            suggestion.classList.add('suggested');
            suggestion.innerText = element;
            console.log(element);
            notfound.appendChild(suggestion);
        });
        return;
    }

    // If definition found
    let definition = data[0].shortdef[0];
    defBox.innerText = definition;
}