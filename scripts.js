import {keys} from "./config.js"

//Váriaveis que vão armazenar as keys e a url api das bandeiras
const keyWeather = keys.weather;
const keyBackground = keys.background
const urlCountryFlag = "https://flagsapi.com/BE/shiny/32.png";

//Váriaveis que vão armazenar os elementos
const inputCidade = document.getElementById('input-cidade');
const botao = document.getElementById('search-button');
const iconLocation = document.querySelector('.icon-location');
const cityName = document.querySelector('.city-name');
const countryFlag = document.querySelector('.country-flag img');
const temperatura = document.querySelector('.temperature');
const clima = document.querySelector('.weather');
const informations = document.querySelector('.informations');

//Criando as funções
botao.addEventListener('click', () =>{
if(!inputCidade.value){
    swal.fire({
        "icon": "error",
        "title": "Oops",
        "text": "É necessário digitar o nome de uma cidade para que a busca seja realizada"
    })
}else{
    //Buscando os dados da API do clima
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputCidade.value}&units=metric&lang=pt_br&appid=${keyWeather}`)
    .then(response => response.json())
    .then(data =>{
        if(data){
        cityName.innerHTML = `${data.name}`
        temperatura.innerHTML = `${parseInt(data.main.temp)}°`;
        clima.innerHTML = `${data.weather[0].description}`;
       countryFlag.setAttribute('src', `https://flagsapi.com/${data.sys.country}/shiny/24.png`)
       informations.style.display = 'block';
        //Buscando as imagens para o background
    fetch(`https://api.unsplash.com/search/photos?query=${inputCidade.value}&client_id=${keyBackground}`)
    .then(response => response.json())
    .then(data =>{
        const images = data.results;
        if(images.length > 0){
            const novoBackground = images[0].urls.regular;
            document.body.style.backgroundImage = `url(${novoBackground})`;
        }
    })
        }else{
            inputCidade.value = '';
            
        }
    })
    .catch(error =>{
        swal.fire({
            "icon": "error",
            "title": "Oops",
            "text": "Não foi possível achar nenhuma cidade com esse nome"
        })
        inputCidade.value = "";
        informations.style.display = 'none';
        document.body.style.backgroundColor = "#033F63";
    })

}
})