console.log("Hello World");

const form = document.querySelector("#form");
const container = document.querySelector("#container");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const containerDivs = document.querySelectorAll(".dataContainer");

  // Loop through the container divs and remove each one
  containerDivs.forEach(function (containerDiv) {
    containerDiv.parentNode.removeChild(containerDiv);
  });
  const searchTerm = form.elements[0].value;
  const res = await axios.get(
    `https://api.tvmaze.com/search/shows?q=${searchTerm}`
  );
  createData(res);
});

const createData = (res) => {
  res.data.map((result) => {
    try {
      // console.log(result.show);
      const medium = result.show.image.medium;
      const showName = result.show.name;
      const showGenre = result.show.genres;
      const dataContainer = document.createElement("div");
      ulElement = document.createElement("ul");
      dataContainer.setAttribute("class", "dataContainer");
      dataContainer.classList.add("shadow-lg", "box-border","h-50","w-60","p-4","border-5","...");
      const showImg = document.createElement("IMG");
      const showNameEle = document.createElement("DIV");
      showNameEle.classList.add("showName", "justify-self-center");
      showNameEle.textContent += showName;
      ulElement.classList.add("ul-flex")
      showImg.setAttribute("src", medium);
      dataContainer.append(showImg);
      dataContainer.append(showName);
      dataContainer.append(ulElement);
      for (i in showGenre) {
        const showGenreEle = document.createElement("li");
        showGenreEle.textContent = showGenre[i];
        ulElement.append(showGenreEle);
      }
      container.appendChild(dataContainer);
    } catch (e) {
      console.log("ERROR!", e);
    }
  });
};
