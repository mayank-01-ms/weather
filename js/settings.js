const isGPSOptionSet = localStorage.getItem('useGPS');
const currentCity = localStorage.getItem('cityName');
let temperatureUnit = localStorage.getItem('temperatureUnit');
if(!temperatureUnit){
    temperatureUnit = 'C';
}

const useGPSToggle = document.getElementById('_switch');
const currentCityDiv = document.querySelector('.city');
const errorMsgDiv = document.querySelector('.error_msg');
const celsiusBtn = document.getElementById('C');
const farenheitBtn = document.getElementById('F');
const updateCityOption = document.querySelector('.update_city_option');

let locationPermission = false;
if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(() => {
        locationPermission = true;
    })
}

// if user has set to use GPS turn on the toggle else show error msg if lcation permission not available
if(isGPSOptionSet && isGPSOptionSet == 'true'){
    if(locationPermission){
        useGPSToggle.checked = true;
        updateCityOption.classList.add('disabled');
    }else{
        errorMsgDiv.style.display = 'block';
        updateCityOption.classList.remove('disabled');
    }
}

// show current city if set
if(currentCity){
    currentCityDiv.innerText = currentCity;
}

// setting temperture unit
if(temperatureUnit == 'C'){
    celsiusBtn.checked = true;
}else{
    farenheitBtn.checked = true;
}

// update user preference to use GPS
useGPSToggle.onchange = () => {
    if(useGPSToggle.checked){
        if(locationPermission){
            localStorage.setItem('useGPS', 'true');
            updateCityOption.classList.add('disabled');
        }else{
            localStorage.setItem('useGPS', 'false');
            useGPSToggle.checked = false;
            errorMsgDiv.style.display = 'block';
            updateCityOption.classList.remove('disabled');
        }
    }else{
        localStorage.setItem('useGPS', 'false');
        errorMsgDiv.style.display = 'none';
        updateCityOption.classList.remove('disabled');
    }
}

// remove the saved information and show the home page
document.getElementById('update_city').onclick = () => {
    // checking the value again as user might change this after the script has been loaded
    const isGPSOptionSet = localStorage.getItem('useGPS');
    if(isGPSOptionSet && isGPSOptionSet == 'true') return;

    localStorage.removeItem('latitude');
    localStorage.removeItem('longitude');
    localStorage.removeItem('cityName');
    document.location.href = "/weather";
}

celsiusBtn.onchange = () => {
    celsiusBtn.checked = true;
    localStorage.setItem('temperatureUnit', 'C');
}
farenheitBtn.onchange = () => {
    farenheitBtn.checked = true;
    localStorage.setItem('temperatureUnit', 'F');
}