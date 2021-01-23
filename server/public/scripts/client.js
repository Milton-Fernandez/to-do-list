$(document).ready(function () {
    console.log('jQuery sourced.');
    refreshTasks();
});

function refreshTasks(task){
    $('#taskList').empty();
    for(let i = 0; i < task.length; i++){
        let task = task[i];
        $('#taskList').append(`<tr>
                    <td>${task.task}</td>
                    <td>${task.published}</td>
                    <td?${task.status}</td>
        </tr>`);
    }

}