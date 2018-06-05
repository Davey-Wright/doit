$(()=>{

  function taskHTML(task){
    let checkedStatus = task.done ? 'checked' : '';
    let liClass = task.done ? "completed" : "";
    let taskElement = `<li id="listItem-${task.id}" class="${ liClass }">` +
      '<div class="view">' +
        `<input class="toggle" type="checkbox" data-id=${task.id} ${checkedStatus}>` +
          `<label>${task.title}</label>` +
      '</div>' +
    '</li>';

    return taskElement;
  };

  function toggleTask(e){
    let taskId = $(e.target).data('id');
    let doneValue = Boolean($(e.target).is(':checked'));
    $.ajax({
      url: '/tasks/' + taskId,
      type: 'PUT',
      data: {
        task: {
          done: doneValue
        }
      }
    }).success((task)=>{
      let liElement = taskHTML(task);
      $(`#listItem-${task.id}`).replaceWith(liElement);
      $('.toggle').change(toggleTask);
    })
  }


  $.get('/tasks').success((data)=>{

    let htmlString = '';

    $.each(data, (index, task)=>{
      htmlString += taskHTML(task);
    });

    $('.todo-list').html(htmlString);

    $('.toggle').change(toggleTask);

  });



  $('#new-form').submit((e)=>{
    e.preventDefault();
    let task_title = $('.new-todo').val();
    let payload = {
      task: {
        title: task_title
      }
    }
    $.post('/tasks', payload).success((task)=>{
      let htmlString = taskHTML(task);
      console.log(task)
      $('.todo-list').append(htmlString);
      $('.new-todo').val('');
      $('.toggle').change(toggleTask);
    });
  });


});
