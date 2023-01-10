const form = document.querySelector("form");

async function fetchUser(mail, mdp) {
  let user = {
    email: mail,
    password: mdp,
  };

  let response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  let result = await response.json();

  return result;
}

// Soumission du formulaire
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const mail = data.get("email");
  const password = data.get("password");
  // appel fetch et recuperation des token d'authentification dans la reponse
  fetchUser(mail, password).then((res) => {
    if (res.userId === 1) {
      // sauvegarde dans les cookies
      document.cookie = "userId=" + res.userId;
      document.cookie = "token=" + res.token;
      window.location.href = "index.html";
    } else {
      document.querySelector(".alert-form").innerHTML =
        "Erreur dans l'identifiant ou le mot de passe";
    }
  });
});

console.log();
