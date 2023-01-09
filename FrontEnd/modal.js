export async function openModal() {
  const modal = document.querySelector("dialog");
  // Si la modale a deja été ouverte on return
  const existing = document.querySelector(".modal-wrap");
  if (existing !== null) {
    modal.setAttribute("open", "");
    modal.addEventListener("click", closeModale);
    document
      .querySelector(".close-modal")
      .addEventListener("click", closeModale);
    document.querySelector(".js-stop").addEventListener("click", (e) => {
      e.stopPropagation();
    });
    return;
  }
  // Chargement de la page en AJAX
  const html = await fetch("modal.html").then((r) => r.text());
  const element = document.createRange().createContextualFragment(html);
  modal.append(element);
  for (let i = 0; i < localStorage.length; i++) {
    const work = JSON.parse(localStorage.getItem(localStorage.key(i)));
    document
      .querySelector(".modal-galery")
      .append(createModalElement(work.imageUrl, work.id));
  }
  // Ouvre la modale
  modal.setAttribute("open", "");
  modal.addEventListener("click", closeModale);
  document.querySelector(".close-modal").addEventListener("click", closeModale);
  document.querySelector(".js-stop").addEventListener("click", (e) => {
    e.stopPropagation();
  });
  // Supprimer un element de la modale
  modal.querySelectorAll(".delete-item").forEach((item) => {
    item.addEventListener("click", (e) => deleteWork(e));
  });
  // Pour ouvrir le formulaire de POST
  const buttonAdd = document.querySelector(".add-pic");
  buttonAdd.addEventListener("click", (e) => openForm());
}

async function deleteWork(e) {
  const elementToDel = e.currentTarget.parentNode.parentNode;
  const id = elementToDel.getAttribute("id");
  const galery = Array.from(document.querySelectorAll(".gallery figure"));
  const parentDelete = galery.find((element) => element.id === id); // trouve dans le tableau des figures
  sessionStorage.setItem("toSup" + id, id);
  localStorage.removeItem(id);
  elementToDel.remove();
  parentDelete.remove();
}

function createModalElement(url, id) {
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

// Change l'affichage dans la modale pour ajouter un travail
export function openForm() {
  document.querySelector(".modal-supp").style.display = "none";
  document.querySelector(".modal-add").style.display = "flex";
  document.querySelector(".modal-add i").addEventListener("click", (e) => {
    document.querySelector(".modal-supp").style.display = "flex";
    document.querySelector(".modal-add").style.display = "none";
    const form = document.querySelector(".modal-add form");
    form.reset();
    const img = document.querySelector(".input-photo img");
    if (img !== null) img.remove();
  });
  // Gerer le formulaire
  const formPost = document.querySelector(".modal-add form");
  const fileInput = formPost.querySelector("#image");
  // Permet de preview l'image dans le formulaire
  fileInput.addEventListener("change", (e) => {
    const element = document.createElement("img");
    formPost.querySelector(".input-photo").append(element);
    element.src = URL.createObjectURL(e.target.files[0]);
  });
  // Poster un nouveau travail
  formPost.addEventListener("submit", (e) => {
    e.preventDefault();
    const formPost = document.querySelector(".modal-add form");
    const data = new FormData(formPost);
    postWork(data);
  });
}

// On recupère le token d'autenthification
const cookies = document.cookie.split("; ");
const token = function () {
  if (document.cookie) {
    return cookies[1].slice(6);
  }
};

export async function postWork(FormData) {
  let response = await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      ContentType: "multipart/form-data",
      accept: "application/json",
      Authorization: "Bearer " + token(),
    },
    body: FormData,
  });
}

const closeModale = function () {
  const modal = document.querySelector("dialog");
  const form = document.querySelector(".modal-add form");
  form.reset();
  const img = document.querySelector(".input-photo img");
  if (img !== null) img.remove();
  modal.removeAttribute("open");
  modal.removeEventListener("click", closeModale);
  modal.querySelector(".close-modal").removeEventListener("click", closeModale);
  modal
    .querySelector(".js-stop")
    .removeEventListener("click", (e) => e.stopPropagation);
  if (sessionStorage.length === 0) {
    return;
  } else if (sessionStorage.length > 1) {
    for (let i = 0; i < sessionStorage.length; i++) {
      const id = sessionStorage.getItem(sessionStorage.key(i));
      console.log(id);
      fetch("http://localhost:5678/api/works/" + id, {
        method: "DELETE",
        headers: {
          accept: "* /*",
          Authorization: "Bearer " + token(),
        },
      }).then((r) => {
        if (r.ok === false) {
          alert("Erreur de la suppression, veuillez réessayer s'il vous plait");
        }
      });
    }
    sessionStorage.clear();
  } else {
    const id = sessionStorage.getItem(sessionStorage.key(0));
    const reponse = fetch("http://localhost:5678/api/works/" + id, {
      method: "DELETE",
      headers: {
        accept: "* /*",
        Authorization: "Bearer " + token(),
      },
    });
    if (reponse.ok) {
    } else {
      alert("Erreur de la suppression, veuillez réessayer s'il vous plait");
    }
    sessionStorage.clear();
  }
};
