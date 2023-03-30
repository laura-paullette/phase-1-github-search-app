const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
   e.preventDefault();
   const query = e.target.search.value;

   fetch(`https://api.github.com/search/users?q=${query}`)
      .then((res) => res.json())
      .then((user) => {
         const ul = document.querySelector("#user-list");
         for (let i = 0; i < user.items.length; i++) {
            const li = document.createElement("li");
            const userProfile = user.items[i].login;
            li.innerHTML = `<h1>Username: ${userProfile}</h1>
             <img src=${user.items[i].avatar_url} alt=''/>
             <span>${user.items[i].url}</span>`;
            ul.appendChild(li);

            
            li.addEventListener("click", () => {
               fetch(`https://api.github.com/users/${userProfile}/repos`)
                  .then((res) => res.json())
                  .then((repos) => {
                     const ul2 = document.querySelector("#repos-list");
                     for (let i = 0; i < repos.length; i++) {
                        const li2 = document.createElement("li");
                        li2.innerHTML = `<span>${repos[i].full_name}</span>`;
                        ul2.appendChild(li2);
                     }
                     console.log(repos);
                  })
                  .catch((err) => console.log(err.message));
            });
         }
      })
      .catch((err) => console.log(err.message));
});