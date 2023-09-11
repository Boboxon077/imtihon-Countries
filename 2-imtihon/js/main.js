const ligth = document.querySelector(".light");
const dark = document.querySelector(".dark");
const body = document.querySelector("body");
const cards = document.querySelector(".cards");
const input = document.querySelector("input");
const form = document.querySelector(".form");
const select = document.querySelector("select");
const loader = document.querySelector(".lds-ring");
const backdrop = document.querySelector(".backdrop");
const api = `https://countries-api-v7sn.onrender.com/countries?limit=250`;
fetch(api)
  .then((data) => {
    return data.json();
  })
  .then((data) => {
    data.data.forEach((child) => {
      cards.innerHTML += `
        <a href="about.html?${child.name.slug}" class="card">
          <img
            src="${child.flags.svg}"
            alt=""
          />
          <h2>${child.name.common}</h2>
          <p><span>Population</span>: ${child.population.toLocaleString(
            "en-US"
          )}</p>
          <p><span>Region</span>: ${child.region}</p>
          <p><span>Capital</span>: ${child.capital}</p>
        </a>
        `;
    });
    backdrop.classList.toggle("d-f");
    loader.classList.toggle("d-f");
  })
  .catch((err) => {
    console.log(err);
  });

// ! input

input.addEventListener("input", (e) => {
  console.log(e.target.value);
  fetch(
    `https://countries-api-v7sn.onrender.com/countries?search=${e.target.value}`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      cards.innerHTML = "";
      data.data.forEach((child) => {
        cards.innerHTML += `
        <a href="about.html?${child.name.slug}" class="card">
          <img
            src="${child.flags.svg}"
            alt=""
          />
          <h2>${child.name.common}</h2>
          <p><span>Population</span>: ${child.population.toLocaleString(
            "en-US"
          )}</p>
          <p><span>Region</span>: ${child.region}</p>
          <p><span>Capital</span>: ${child.capital}</p>
        </a>
        `;
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

// ! form

// ! region

function changeSelect() {
  let url = `https://countries-api-v7sn.onrender.com/countries?region=${select.value}`;
  if (select.value === "") {
    url = api;
  }
  backdrop.classList.toggle("d-f");
  loader.classList.toggle("d-f");
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      cards.innerHTML = "";
      data.data.forEach((child) => {
        cards.innerHTML += `
        <a href="about.html?${child.name.slug}" class="card">
          <img
            src="${child.flags.svg}"
            alt=""
          />
          <h2>${child.name.common}</h2>
          <p><span>Population</span>: ${child.population.toLocaleString(
            "en-US"
          )}</p>
          <p><span>Region</span>: ${child.region}</p>
          <p><span>Capital</span>: ${child.capital}</p>
        </a>
        `;
      });
      backdrop.classList.toggle("d-f");
      loader.classList.toggle("d-f");

      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
  console.log(select.value);
}

let mode = localStorage.getItem("mode")
  ? localStorage.getItem("mode")
  : "light";
if (localStorage.getItem("mode")) {
  if (mode === "light") {
    body.classList = "light";
  } else if (mode === "dark") {
    body.classList = "dark";
  }
}
function changeMode() {
  if (mode === "light") {
    body.classList = "dark";
    mode = "dark";
  } else if (mode === "dark") {
    body.classList = "light";
    mode = "light";
  }
  localStorage.setItem("mode", mode);
}
