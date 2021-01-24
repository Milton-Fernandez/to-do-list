$(document).ready(function () {
    console.log('jQuery sourced.');
    getTask();
    clickHandlers();
});

function clickHandlers(){
    $('table').on('click','.delete',deleteTask);
    $('table').on('click', '.complete', completeTask);
    $('#submit').on('click', addTask);
}

function getTask(){
    $.ajax({
        type:'GET',
        url:'/todo'
    }).then(function(response){
        console.log(response);
        refreshTasks(response);
    }).catch(function(error){
        console.log('error in GET',error);
    });
}


function refreshTasks(task) {
    $('#taskList').empty();
    for (let i = 0; i < task.length; i++) {
        let tasks = task[i];
      
        // let isComplete = "";
        // if(tasks.status == "Complete"){
        //     isComplete = "red";
       
        // }


        $('#taskList').append(`<tr class = "${(tasks.status == "Complete") ? "red" : "" }">
                    <td>${tasks.task}</td>
                    <td>${tasks.published}</td>
                    <td>${tasks.status}</td>
                    <td>${(tasks.status == "Complete") ? "": `<button data-completeid = ${tasks.id} class = "complete" >Complete</button>`}</td>
                    <td><button data-taskid = ${tasks.id} class = "delete">Delete</button></td>
        </tr>`);
    }    

}

function addTask(){
    console.log('Submit button clicked');
    let taskData = {};
    taskData.task = $('#task').val();
    taskData.date = $('#date').val();
    $.ajax({
        type:'POST',
        url:'/todo',
        data:taskData
    }).then(function(response){
        console.log('Response from server',response);
        getTask();
        $('#task').val('');
        $('#date').val('');
    }).catch(function(error){
        console.log('Error in POST', error)
        alert('Unable to add task');
    });
}

function completeTask(event){
    const completeid = $(event.target).data('completeid');
    console.log(`Completed Task`);

    $.ajax({
        method:"PUT",
        url:`/todo/${completeid}`,
    
    }).then(function(response){
       
        getTask(); 
    })
 
}


function deleteTask(event){
    const taskid = $(event.target).data('taskid');
    console.log(`Deleting task`);
    $.ajax({
        method:"DELETE",
        url: `/todo/${taskid}`
    }).then(function(response){
        getTask();
    })

}