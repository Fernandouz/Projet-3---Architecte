export function openForm() {
  document.querySelector(".modal-supp").style.display = "none";
  document.querySelector(".modal-add").style.display = "flex";
  document.querySelector(".modal-add i").addEventListener("click", (e) => {
    document.querySelector(".modal-supp").style.display = "flex";
    document.querySelector(".modal-add").style.display = "none";
  });
  // Gerer le formulaire
  const formPost = document.querySelector(".modal-add form");
  formPost.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(formPost);
    //const categoryUp = parseInt(data.get("category"));
    //data.set("category", categoryUp);
    postWork(data);
    for (let key of data.keys()) {
      console.log(key);
    }
    console.log(data.get("image"));
    console.log(data.get("title"));
    console.log(data.get("category"));
  });
}

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

  //console.log(response.status);
}
