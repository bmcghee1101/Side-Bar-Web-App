$(document).ready(function(){

const updateTaskList  = () => {
  $('.taskItem').remove()
  $.ajax({
    url: '/api/tasks',
    type: 'GET',
    success: ((response) => {
      response.forEach((task) => {
        const taskListItem = "<div class='taskItem' data-taskId='" + task._id +"'><h2 class='taskItemTitle'>" + task.title + "</h2><p class='taskItemShort'>" + task.content.slice(0, 25) + "...</p></div>"
        $('#sidebar').append(taskListItem)
      })
    })
  })
}

updateTaskList()

// Task list item click
$(document).on('click','.taskItem',function() {
    const taskId = $(this).attr('data-taskId')
    $('#task').attr('data-taskId', taskId)
    $.ajax({
      url: '/api/tasks/' + taskId,
      type: 'GET',
      success: (response) => {
        $('#taskTitle').text(response.title)
        $('#taskBody').text(response.content)
      }
    })
})

$('#new').click(function() {
  $('.modal').css('display', 'block')
})

$('#close').click(function() {
  $('.modal').css('display', 'none')
})

$('#newSave').click(function() {
  const t = $('#newTitle').val()
  const c = $('#newContent').val()
  $.ajax({
    contentType: 'application/json',
    dataType: 'json',
    url: '/api/tasks',
    type: 'POST',
    data: JSON.stringify({
      title: t,
      content: c
    }),
    success: (response) => {
      console.log(response)
      updateTaskList()
      $('.modal').css('display', 'none')
    }
  })
  
})






});


