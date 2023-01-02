import { fetchWorks, openModal } from "./functions.js";
import { createWork } from "./functions.js";
import { adminInterface } from "./functions.js";
import {} from "./modal.js";

let admin = { id: "", token: "" };

try {
  if (document.cookie != "undefined") {
    const cookies = document.cookie.split("; ");
    admin.id = cookies[0].slice(-1);
    admin.token = cookies[1].slice(6);
  }
} catch {}

if (admin.id === "1") {
  adminInterface();
}

const worksList = await fetchWorks();
const gallery = document.querySelector(".gallery");

worksList.forEach((work) => {
  gallery.append(
    createWork(work.id, work.imageUrl, work.title, work.category.id)
  );
});

const filters = document.querySelectorAll(".filter");

filters.forEach((filter) => {
  filter.addEventListener("click", (e) => {
    if (e.target.classList.value === "filter 1") {
      document
        .querySelectorAll(".cat1")
        .forEach((fig) => fig.classList.add("active"));
      document.querySelectorAll(".cat2 , .cat3").forEach((fig) => {
        fig.classList.remove("active");
        fig.classList.add("hidden");
      });
    } else if (e.target.classList.value === "filter 2") {
      document
        .querySelectorAll(".cat2")
        .forEach((fig) => fig.classList.add("active"));
      document.querySelectorAll(".cat1 , .cat3").forEach((fig) => {
        fig.classList.remove("active");
        fig.classList.add("hidden");
      });
    } else if (e.target.classList.value === "filter 3") {
      document
        .querySelectorAll(".cat3")
        .forEach((fig) => fig.classList.add("active"));
      document.querySelectorAll(".cat1 , .cat2").forEach((fig) => {
        fig.classList.remove("active");
        fig.classList.add("hidden");
      });
    } else if (e.target.classList.value === "filter all") {
      document.querySelectorAll(".cat1, .cat2, .cat3").forEach((fig) => {
        fig.classList.add("active");
        fig.classList.remove("hidden");
      });
    }
  });
});

const modifier = document.querySelectorAll(".modifier");
const modal = document.querySelector("dialog");

//modal.Attribute("open");

modifier.forEach((lien) => {
  lien.addEventListener("click", openModal);
});

//postWork("FrontEnd/assets/images/abajour-tahina.png", "abajour", 1);
