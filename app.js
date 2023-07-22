// validate form inputs before submitting data

function validateForm(){
    var username = document.getElementById("username").value;
    var taskname = document.getElementById("taskname").value;
    var description = document.getElementById("description").value;
    var duration = document.getElementById("duration").value;

    if(username == ""){
        alert("User Name is required");
        return false;
    }

    if(taskname == ""){
        alert("Task Name is required");
        return false;
    }

    if (description == ""){
        alert("Description is required");
        return false;
    }

    if (duration == ""){
        alert("Duration is required");
        return false;
    }

    return true
}

// function to show data from local storage

function showData(){
    var peopleList;
    if(localStorage.getItem("peopleList") == null){
        peopleList = [];
    }
    else{
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    var html = "";

    peopleList.forEach(function (element, index){
        html += "<tr>";
        html += "<tr>" + element.username + "</td>";
        html += "<tr>" + element.taskname + "</td>";
        html += "<tr>" + element.description + "</td>";
        html += "<tr>" + element.duration + "</td>";
        html +=
            '<td><button> onclick="deleteData(' + 
            index +
            ')" class="btn btn-danger">Delete</button><buttononclick="updateData(' +index + 
            ')" class="btn btn-warning m-2">Edit</button></td>';
        html +="</tr>";
    });

    document.querySelector("#managementTable tbody").innerHTML = html;
} 

// loads all data from local storage when document or page loaded

document.onload = showData();

// function all data to local storage

function AddData(){
    // if form is validate
    if(validateForm() == true){
        var username = document.getElementById("username").value;
        var taskname = document.getElementById("taskname").value;
        var description = document.getElementById("description").value;
        var duration = document.getElementById("duration").value;

        var peopleList;
        if (localStorage.getItem("peopleList") == null) {
            peopleList = [];
        }   else {
            peopleList = JSON.parse(localStorage.getItem("peopleList"));
        }

        peopleList.push({
            username : username,
            taskname : taskname,
            description : description,
            duration : duration,
        });

        localStorage.setItem("peopleList", JSON.stringify(peopleList));
        showData();
        document.getElementById("username").value = "";
        document.getElementById("taskname").value = "";
        document.getElementById("description").value = "";
        document.getElementById("duration").value = "";
    }
}

// function to delete data from local storage

function deleteData(index){
    var peopleList;
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    } else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    peopleList.slice(index, 1);
    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();
}

// function to update/edit data in local storage
function updateData(index){
    // Submit button will hide and Update button will show for updating of Data in local storage
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";

    var peopleList;
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    }   else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    document.getElementById("username").value = peopleList[index].username;
    var peopleList;
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    }   else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    document.getElementById("username").value = peopleList[index].username;
    document.getElementById("taskname").value = peopleList[index].taskname;
    document.getElementById("description").value = peopleList[index].description;
    document.getElementById("duration").value = peopleList[index].duration;

    document.querySelector("#Update").onclick = function(){
        if(validateForm() == true){
            peopleList[index].username = document.getElementById("username").value;
            peopleList[index].taskname = document.getElementById("taskname").value;
            peopleList[index].description = document.getElementById("description").value;
            peopleList[index].duration = document.getElementById("duration").value;

            localStorage.setItem("peopleList", JSON.stringify(peopleList));

            showData();

            document.getElementById("username").value = "";
            document.getElementById("taskname").value = "";
            document.getElementById("description").value = "";
            document.getElementById("duration").value = "";

    // Update button will hide and Submit button will show
    document.getElementById("Submit").style.display = "block";
    document.getElementById("Update").style.display = "none";
        }
    }
}

