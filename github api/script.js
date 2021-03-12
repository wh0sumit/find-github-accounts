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
            html_url: data.html_url,
            follower: data.followers,
            following: data.following,
            repo: data.public_repos
        }

        fetchUser(user);
        $('.user').append(card);

    }



    function fetchUser(user) {
        return card = `<div class="card p-lg-5 bg-dark rounded-3 text-light" >
                            <div class="col g-0 ">
                              <div class="center">
                                <img src="${user.avatar}" alt="..." class="rounded-circle m-3" wdith="250px" height="150px">
                              </div>
                          
                                <div class="card-body text-center">
                                  <h3 class="card-title"> ${user.name} 🔥</h3>
                                  <h5 class="card-title" >${user.login}</h5>
                                    <a href="${user.html_url}" class="text-decoration-none" target="_blank"><button class="btn btn-light border-0 rounded-0">Visit Profile 🔗</button></a>
                                  <p class="card-text my-2">
                                    <small class="text-muted">Bio : ${user.bio}</small>
                                  </p>
                                <div class="d-flex justify-content-center flex-wrap" >
                                <p class="card-text mx-2">Email 💌 ${user.email}  </p> |
                                <p class="card-text mx-2">Location 📌 ${user.location} </p>
                                </div>
                                 
                                <div class="d-flex justify-content-center flex-wrap" >
                                 <h5 class="text-center mx-2"><span class="badge rounded-pill bg-danger text-light">Followers: ${user.follower}</span></h5>
                                 <h5 class="text-center mx-2"><span class="badge rounded-pill bg-success text-light">Following: ${user.following}</span></h5>
                                 <h5 class="text-center mx-2"><span class="badge rounded-pill bg-primary text-light">Public Repo: ${user.repo}</span></h5>
                                </div>
                                <p class="card-text my-2">
                                <a href="${user.blog}" class="text-decoration-none" target="_blank"><button class="btn btn-sm btn-light border-0 rounded-0">Portfolio/Blog 🔗</button></a>
                                  </p>
                            
                                </div>
                              </div>
                              </div>
                        
                            <h6 class="text-center mt-5 ">Made With ❤️ By ~ <a href="https://wh0sumit.github.io/" class="text-decoration-none" target="_blank">Sumit Kumar Singh</a></h6>
                            <div class="text-center p-2">
                                <a href="https://github.com/WH0SUMIT" class="text-dark fs-4 mx-2" target="_blank"><i class="fab fa-github"></i></a>
                                <a href="https://www.linkedin.com/in/wh0sumit/" class="text-dark fs-4 mx-2" target="_blank"><i class="fab fa-linkedin-in"></i></a>
                            </div>`;
    }



});
