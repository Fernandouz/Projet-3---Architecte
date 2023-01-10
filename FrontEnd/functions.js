const cookies = document.cookie.split("; ");
const token = function () {
  if (document.cookie) {
    return cookies[1].slice(6);
  }
};

// Telecharge l'ensemble des travaux
export async function fetchWorks() {
  const a = new AbortController();
  const r = await fetch("http://localhost:5678/api/works", {
    signal: a.signal,
  });
  if (r.ok) {
    return r.json();
  }
}

export function createWork(id, imgSrc, title, category) {
  const element = document.createElement("figure");
  const img = document.createElement("img");
  const fig = document.createElement("figcaption");
  img.src = imgSrc;
  img.alt = title;
  img.crossOrigin = "anonymous";
  fig.innerHTML = title;
  element.setAttribute("id", id);
  // On attribue une classe pour la mise en place des filtres
  element.classList.add("cat" + category);
  element.append(img, fig);
  return element;
}

// Permet l'affichage pour modifier les travaux
export function adminInterface() {
  document.querySelector(".filters").style.display = "none";
  const logout = document.querySelector("header nav li a");
  logout.innerHTML = "logout";
  // gestion du logout
  logout.addEventListener("click", (e) => {
    e.preventDefault();
    document.cookie = "userId=; expires=Mon, 02 Oct 2000 01:00:00 GMT";
    document.cookie = "token=; expires=Mon, 02 Oct 2000 01:00:00 GMT";
    window.location.href = "index.html";
  });
  // affichage des icones modifier
  document.querySelectorAll(".modifier").forEach((div) => {
    div.innerHTML = `<i class="fa-regular fa-pen-to-square"></i> modifier`;
  });
}
