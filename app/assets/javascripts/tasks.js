$(()=>{

  function taskHTML(task){
    let checkedStatus = task.done ? 'checked' : '';
    let taskElement = '<li>' +
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
    });
  }

  $('#new-task-form').submit((e)=>{
    e.preventDefault();
    let task_title = $('.new-task').val();
    let payload = {
      task: {
        title: task_title
      }
    }
    $.post('/tasks', payload).success((task)=>{
      let htmlString = taskHTML(task);
      $('.todo-list').append(htmlString);
      $('.new-task').val('');
      $('.toggle').change(toggleTask);
    });
  });

  $.get('/tasks').success((data)=>{

    let htmlString = '';

    $.each(data, (index, task)=>{
      htmlString += taskHTML(task);
    });

    $('.todo-list').html(htmlString);

    $('.toggle').change(toggleTask);

  });

});
