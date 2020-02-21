$(function(){
    $('#alert').hide()
    $('#createTrip').hide()
    $('#updateTrip').hide()
    $('#registerForm').hide()
    
    if(!localStorage.token){
        $('#createTripButton').hide()
        $('#logoutButton').hide()
        $('#tripList').hide()
    } else {
        getTrips()
        $('#loginForm').hide()
    }

    $('#submitLogin').click(function(){
        login()
    })
    
    $('#submitRegister').click(function(){
        register()
    })
    
    $('#logoutButton').click(function(){
        logout()
    })

    
    $('#goToRegister').click(function(){
        $('#registerForm').slideDown('slow')
        $('#loginForm').slideUp('slow')
    })
    
    $('#goToLogin').click(function(){
        $('#loginForm').slideDown('slow')
        $('#registerForm').slideUp('slow')
    })

    $('#createTripButton').click(function(){
        $('#tripList').slideUp('slow')
        $('#createTrip').slideDown('slow')
        $('#submit-create').click(function(){
            createTrip()
        })
    })

    $(document).on('click','.btn-edit-trip', function(){
        let id = $(this).attr('id')
        console.log(id)
        showUpdateForm(id)
    })
})

function login(){
    let email = $('#email').val()
    let password = $('#password').val()
    let body = {
        email,
        password
    }
    axios({
        url : 'http://localhost:3000/login/',
        method : 'post',
        data : body
    })
    .then(({data})=>{
        
        console.log(data)
        localStorage.token = data.access_token
        getTrips()
        $('#loginForm').slideUp('slow')
        $('#createTripButton').slideDown()
        $('#logoutButton').slideDown()
        $('#tripList').slideDown()
        $('#email').val('')
        $('#password').val('')
    })
    .catch(err =>{
        console.log(err.response.data.message)
        $("#alert").text(err.response.data.message)
        setTimeout(() => {
            $("#alert").slideUp('slow')
        }, 2000);
        $("#alert").slideDown('slow')
        $('#email').val('')
        $('#password').val('')
    })
}

function register(){
    let email = $('#emailRegister').val()
    let password = $('#passwordRegister').val()
    let name = $('#nameRegister').val()
    let body = {
        email,
        password,
        name
    }
    axios({
        url : 'http://localhost:3000/register/',
        method : 'post',
        data : body
    })
    .then(({data})=>{
        console.log(data)
        localStorage.token = data.access_token
        getTrips()
        $('#registerForm').slideUp('slow')
        $('#createTripButton').slideDown()
        $('#logoutButton').slideDown()
        $('#tripList').slideDown()
        $('#email').val('')
        $('#password').val('')
    })
    .catch(err =>{
        console.log(err.response.data.message)
        $("#alert").text(err.response.data.message)
        setTimeout(() => {
            $("#alert").slideUp('slow')
        }, 2000);
        $("#alert").slideDown('slow')
        $('#email').val('')
        $('#password').val('')
    })
}

function logout(){
    localStorage.clear('token')
    $('#createTripButton').hide()
    $('#logoutButton').hide()
    $('#tripList').hide()
    $('#loginForm').slideDown('slow')
}

function getTrips(){
    $('#tripCards').empty()
    axios({
        url : 'http://localhost:3000/trips/',
        method : 'get',
        headers : {
            access_token : localStorage.token
        }
    })
    .then(({data})=>{
        data.forEach(trip => {
            $('#tripCards').append(`
            <div class="col-4 mb-4">
                <div class="card text-center">
                <div class="card-body">
                    <h5 class="card-title">${trip.title}</h5>
                    <p class="card-text">>${trip.location}</p>
                    <p class="card-text">>${trip.date}</p>
                    <button id=${trip.id} class="btn btn-primary btn-edit-trip">Edit</button>
                </div>
                </div>
            </div>
            `)
        });
    })
    .catch(err => {
        console.log(err.response.data.message)
        $("#alert").text(err.response.data.message)
        setTimeout(() => {
            $("#alert").slideUp('slow')
        }, 2000);
        $("#alert").slideDown('slow')
    })
}

function createTrip(){
    let body = {
        title : $('#title-create').val(),
        location : $('#location-create').val(),
        date : $('#date-create').val(),
    }
    console.log(body)
    axios({
        url : 'http://localhost:3000/trips/',
        method : 'post',
        headers : {
            access_token : localStorage.token
        },
        data : body
    })
    .then(({data})=>{
        console.log(data)
        $("#alert").text(data.message)
        setTimeout(() => {
            $("#alert").slideUp('slow')
        }, 2000);
        $("#alert").slideDown('slow')
        getTrips()
        $('#tripList').slideDown('slow')
        $('#createTrip').slideUp('slow')
    })
    .catch(err => {
        $("#alert").text(err.response.data.message)
        setTimeout(() => {
            $("#alert").slideUp('slow')
        }, 2000);
        $("#alert").slideDown('slow')
    })
}

function showUpdateForm(id){
    axios({
        url : 'http://localhost:3000/trips/'+id,
        method : 'get',
        headers : {
            access_token : localStorage.token
        }
    })
    .then(({data})=>{
        $('#title-update').val(data.title)
        $('#location-update').val(data.location)
        $('#date-update').val(data.date)
        $('#tripList').slideUp('slow')
        $('#updateTrip').slideDown('slow')
        $(document).on('click', '#btn-update', function(){
            updateTrip(id)
        })
    })
}

function updateTrip(id){
    let body = {
        title : $('#title-update').val(),
        location : $('#location-update').val(),
        date : $('#date-update').val(),
    }
    console.log(body)
    axios({
        url : 'http://localhost:3000/trips/'+id,
        method : 'put',
        headers : {
            access_token : localStorage.token
        },
        data : body
    })
    .then(({data})=>{
        console.log(data)
        getTrips()
        $('#updateTrip').slideUp('slow')
        $('#tripList').slideDown('slow')
        $("#alert").text(data.message)
        setTimeout(() => {
            $("#alert").slideUp('slow')
        }, 2000);
        $("#alert").slideDown('slow')
    })
    .catch(err => {
        console.log(err)
        $("#alert").text(err.response.data.message)
        setTimeout(() => {
            $("#alert").slideUp('slow')
        }, 2000);
        $("#alert").slideDown('slow')
    })
}