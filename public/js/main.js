const submitBtn = document.getElementById("submitBtn");
const cityName = document.getElementById("cityName");
const city_name = document.getElementById("city_name");
const day = document.getElementById("day");
const today_date = document.getElementById("today_date");
const temp = document.getElementById("temp");
const temp_status = document.getElementById("temp_status");
const data_hide = document.querySelector('.middle_layer');

const getInfo = async (e) => {
  e.preventDefault();
  console.log('clicked');

  let cityVal = cityName.value;
  if (cityVal === "") {
    city_name.innerText = "please write the city name";
    data_hide.classList.add('data_hide');
  } else {
    try {
      let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=49d694a46b04beaf0eb2ce3f3f833417`;

      let response = await fetch(apiURL);
      let data = await response.json();
      console.log(data, "API response");

      if (data.cod === "404") {
        city_name.innerText = "City not found";
        data_hide.classList.add('data_hide');
      } else {
        const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let days = new Date();
        let today = weekday[days.getDay()];
        day.innerHTML = `${today}`;

        let date = days.getDate();
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let month = months[days.getMonth()];
        today_date.innerHTML = `${date} ${month}`;

        city_name.innerText = `${data.name} ${data.sys.country}`;
        temp.innerHTML = `<span> ${Math.round(data.main.temp - 273.15)}</span>&deg;C`;

        if (data?.weather && data?.weather[0]) {
          let tempMood = data?.weather[0]?.main;

          if (tempMood === "Clear") {
            temp_status.innerHTML = "<i class='fas fa-sun' style='color: #eccc68;'></i>";
          } else if (tempMood === "Clouds") {
            temp_status.innerHTML = "<i class='fas fa-cloud' style='color: #f1f2f6;'></i>";
          } else if (tempMood === "Rain") {
            temp_status.innerHTML = "<i class='fas fa-cloud-rain' style='color: #a4b0be;'></i>";
          } else {
            temp_status.innerHTML = "<i class='fas fa-cloud' style='color: #f1f2f6;'></i>";
          }
        } else {
          temp_status.innerHTML = "<i class='fas fa-cloud' style='color: #f1f2f6;'></i>";
        }

       
      }
      data_hide.classList.remove('data_hide');
    } catch (error) {
      console.log(error);
      data_hide.classList.add('data_hide');
    }
  }
};

submitBtn.addEventListener("click", getInfo);
