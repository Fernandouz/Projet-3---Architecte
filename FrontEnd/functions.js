import { openForm } from "./modal.js";

export async function fetchWorks() {
  const r = await fetch("http://localhost:5678/api/works");
  if (r.ok === true) {
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
  element.classList.add("cat" + category);
  element.append(img, fig);
  return element;
}

export function adminInterface() {
  document.querySelector(".filters").style.display = "none";
  const logout = document.querySelector("header nav li a");
  logout.innerHTML = "logout";
  logout.addEventListener("click", (e) => {
    e.preventDefault();
    document.cookie = "userId=; expires=Mon, 02 Oct 2000 01:00:00 GMT";
    document.cookie = "token=; expires=Mon, 02 Oct 2000 01:00:00 GMT";
    window.location.href = "index.html";
  });
  document.querySelectorAll(".modifier").forEach((div) => {
    div.innerHTML = `<i class="fa-regular fa-pen-to-square"></i> modifier`;
  });
}

function createModalElement(url, id) {
  const div = document.querySelectorAll(".modal-galery");
  const element = document.createElement("figure");
  const img = document.createElement("img");
  const fig = document.createElement("figcaption");
  const trash = document.createElement("div");
  img.src = url;
  img.crossOrigin = "anonymous";
  fig.innerHTML = "editer";
  trash.innerHTML = `<i class="fa-solid fa-trash-can delete-item"></i>`;
  element.append(trash);
  element.append(img);
  element.append(fig);
  element.setAttribute("id", id);
  return element;
}

export async function openModal() {
  const modal = document.querySelector("dialog");
  modal.setAttribute("open", "");
  const images = await fetchWorks();
  images.forEach((image) => {
    const url = image.imageUrl;
    const id = image.id;
    document.querySelector(".modal-galery").append(createModalElement(url, id));
  });
  modal.addEventListener("click", closeModale);
  modal.querySelector(".close-modal").addEventListener("click", closeModale);
  modal.querySelector(".js-stop").addEventListener("click", (e) => {
    e.stopPropagation();
  });
  modal.querySelectorAll(".delete-item").forEach((item) => {
    item.addEventListener("click", (e) => {
      const elementToDel = e.currentTarget.parentNode.parentNode;
      const id = elementToDel.getAttribute("id");
      const galery = Array.from(document.querySelectorAll(".gallery figure"));
      const parentDelete = galery.find((element) => element.id === id); // trouve dans le tableau des figures
      elementToDel.remove();
      parentDelete.remove();
      fetchDelete(id);

      console.log();
    });
  });
  const buttonAdd = document.querySelector(".add-pic");
  buttonAdd.addEventListener("click", (e) => openForm());
}

const closeModale = function () {
  const modal = document.querySelector("dialog");
  document.querySelector(".modal-galery").innerHTML = "";
  modal.removeAttribute("open");
  modal.removeEventListener("click", closeModale);
  modal.querySelector(".close-modal").removeEventListener("click", closeModale);
  modal
    .querySelector(".js-stop")
    .removeEventListener("click", (e) => e.stopPropagation);
};

const cookies = document.cookie.split("; ");
const token = function () {
  if (document.cookie) {
    return cookies[1].slice(6);
  }
};

async function fetchDelete(id) {
  const r = await fetch("http://localhost:5678/api/works/" + id, {
    method: "DELETE",
    headers: {
      accept: "*/*",
      Authorization: "Bearer " + token(),
    },
  });
  return r;
}

console.log();
console.log();
