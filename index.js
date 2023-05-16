let backgroundUrl = "";
const backUpUrl =
  "https://images.unsplash.com/photo-1533371452382-d45a9da51ad9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODE2NDMyMDI&ixlib=rb-4.0.3&q=80&w=1080://images.unsplash.com/photo-https://images.unsplash.com/photo-1421789665209-c9b2a435e3dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODE2NDMwNDg&ixlib=rb-4.0.3&q=80&w=1080-6102ad35701e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODE2MzUxNjM&ixlib=rb-4.0.3&q=80&w=1080";
const bodyEle = document.querySelector("body");
const authorEle = document.querySelector("#author-name");
const cryptoEle = document.querySelector("#crypto-links");
const currentPriceEle = document.querySelector("#current-price");
const high24hEle = document.querySelector("#high-24h");
const low24hEle = document.querySelector("#low-24h");
const timeEle = document.querySelector("#time");
const weatherEle = document.querySelector("#weather-icon");
const tempEle = document.querySelector("#temp");
const cityNameEle = document.querySelector("#city-name");
// BACKGROUND IMAGE//
// ================
fetch(
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
)
  .then((res) => {
    // console.log(res);
    return res.json();
  })
  .then((data) => {
    // console.log(data);
    if (data.errors) {
      throw Error;
    }
    backgroundUrl = data.urls.regular;
    bodyEle.style.backgroundImage = `url(${backgroundUrl})`;
    authorEle.textContent = `By: ${data.user.name}`;
  })
  .catch((error) => {
    // console.log(error);
    bodyEle.style.backgroundImage = `url(${backUpUrl})`;
    authorEle.textContent = "Yousef Espanioly";
  });

// CRYPTO COIN//
// =============
fetch("https://api.coingecko.com/api/v3/coins/ethereum")
  .then((res) => {
    // console.log(res);
    if (res.ok === false) {
      throw Error;
    }
    return res.json();
  })
  .then((data) => {
    // console.log(data);
    cryptoEle.innerHTML = `<h3 class="crypto-heading">${data.name}</h3>
                         <img class="crypto-img" alt="crypto coin picture" src=${data.image.small} />`;

    currentPriceEle.textContent = `Current price: ${data.market_data.current_price.pkr}`;
    high24hEle.textContent = `24 Hour high: ${data.market_data.high_24h.pkr}`;
    low24hEle.textContent = `24 Hour Low: ${data.market_data.low_24h.pkr}`;
  })
  .catch((error) => {
    cryptoEle.innerHTML = `<h3 class="crypto-heading">Something went wrong</h3>`;
  });

// CURRENT TIME
// ==============
function displayDate() {
  let currentTime = new Date();
  // console.log(currentTime);
  let timeInPm = currentTime.toLocaleTimeString("en-us", {
    timeStyle: "short",
  });
  // console.log(timeInPm);
  timeEle.textContent = timeInPm;
}

setInterval(displayDate, 1000);

// CURRENT POSITION
// ===============
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => {
    // console.log(position);
    const { latitude, longitude } = position.coords;
    // console.log(latitude, longitude);

    // fetching weather
    // ==============
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=949bf576a54e81c1585137679e5bc580&units=metric`
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("Something went wrong");
        }
        return res.json();
      })
      .then((data) => {
        weatherEle.setAttribute(
          "src",
          `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        );
        tempEle.textContent = `${Math.trunc(data.main.temp)} °C `;
        cityNameEle.textContent = `${data.name}`;
        console.log(data);
      })
      .catch((error) => console.error(error));
  });
}
