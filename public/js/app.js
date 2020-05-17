console.log('Client side script loaded');
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const errorOrDescription = document.querySelector('#errorOrDescription');
    const actualTemperature = document.querySelector('#actualTemperature');
    const feelsLike = document.querySelector('#feelsLike');
    errorOrDescription.textContent = 'Fetching Results. Please wait';
    actualTemperature.textContent = '';
    feelsLike.textContent = '';

    const inputElement = document.querySelector('input');
    let inputAddress = inputElement.value;
    fetch(`/weather?address=${inputAddress}`).then((response) => {
        response.json().then((data) => {
            const errorOrDescriptionElement = document.querySelector('#errorOrDescription');
            const actualTemperatureElement = document.querySelector('#actualTemperature');
            const feelsLikeElement = document.querySelector('#feelsLike');
            if(data.error){
                errorOrDescriptionElement.textContent = data.error
            } else{
                errorOrDescriptionElement.textContent = 'Forecast:'+data.description;
                actualTemperatureElement.textContent = 'Actual Temperature:'+data['Actual Temperature']+'c';
                feelsLikeElement.textContent = 'But it feels like:'+data['FeelLiketemperature']+'c';
            }
        })
    })
})