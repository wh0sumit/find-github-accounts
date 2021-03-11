$(document).ready(() => {
    let username, card;

    $('.btn').on('click', () => {
        username = $('#search').val();
        $('.user').empty();
        getUser().catch(() => {
            let error = "We Cannot Find This User ! Please Try Again"
            $('.user').append(`<h4 class="text-center">${error} </h4>`);
        });

    });


    async function getUser() {
        $('.user').css('display', 'block');

        function handleErrors(response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        }
        const response = await fetch(`https://api.github.com/users/${username}`).then(handleErrors);
        const data = await response.json();
        const user = {
            login: data.login,
            name: data.name,
            email: data.email,
            avatar: data.avatar_url,
            bio: data.bio,
            location: data.location,
            blog: data.blog,
            html_url: data.html_url
        }
        fetchUser(user);
        $('.user').append(card);


    }


    function fetchUser(user) {
        return card = `<div class="card p-lg-5 bg-dark text-light" >
                            <div class="col g-0 ">
                              <div class="center">
                                <img src="${user.avatar}" alt="..." class="rounded-circle m-3" wdith="250px" height="150px">
                              </div>
                          
                                <div class="card-body text-center">
                                  <h3 class="card-title"> ${user.name}</h3>
                                  <h5 class="card-title" >${user.login}</h5>
                                    <a href="${user.html_url}" class="text-decoration-none" target="_blank"><button class="btn btn-light border-0 rounded-0">Visit Profile</button></a>
                                  <p class="card-text my-2">
                                    <small class="text-muted">Bio : ${user.bio}</small>
                                  </p>
                                  <p class="card-text">Email : ${user.email}</p>
                                  <p class="card-text">
                                    <a href="${user.blog}" class="text-decoration-none text-light " target="_blank" >Portfolio/Blog</a>
                                  </p>
                                </div>
                              </div>
                              </div>`;
    }



});