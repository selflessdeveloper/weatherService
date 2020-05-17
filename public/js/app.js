console.log('Client side script loaded');
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const errorOrDescription = document.querySelector('#errorOrDescription');
    errorOrDescription.textContent = 'Fetching Results. Please wait'

    const inputElement = document.querySelector('input');
    let inputAddress = inputElement.value;
    fetch(`http://localhost:3000/weather?address=${inputAddress}`).then((response) => {
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