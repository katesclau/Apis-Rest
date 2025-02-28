$(document).ready(function() {
  $.ajax({
    url: 'api/data', // Url of the method
    method: 'GET', // method of the Url
    success: function(data){ // Clean the List || return the data's in parameter data
      $('#dataList').empty();

      data.forEach(function(row){
        $('#dataList').append('<tr><td>' + row.id_user + '</td>' + 
                                  '<td><input type="text" class="username-input" data-user-id="' + row.id_user + '" value="' + row.username + '"/></td>' + 
                                  '<td><input type="text" class="password-input" data-user-id="' + row.id_user + '" value="' + row.password + '"/></td>' + 
                                  '<td> <button class="delete-button" data-id="' + row.id_user + '"><i class="fa-solid fa-trash"></i></button></td>' + 
                                  '<td> <button class="update-button" data-id="' + row.id_user + '"><i class="fa-solid fa-pencil"></i></button></td></tr>');
      });
      },
      error:function(){
        console.log('Error in get data from server');
      }
  })
});

$(document).on('click', '.delete-button', function() { // Initializes an event when '.delete-button' is clicked
  const userId = $(this).data('id'); // Set the value of the attribute 'data-id' setted on data.forEach
  const $button = $(this);

  $.ajax({
    url: '/api/delete/' + userId,
    method: 'DELETE',
    success: function(data) { // Makes an solicitation AJAX using  the method DELETE for the URL '/api/delete/cod user'
      $button.closest('tr').remove(); // Finds the <tr> element more closelly that contains the clicked button and delete then
      alert(data.message);
    },
    error: function() {
      console.log('Error for excluding a user from server')
    }
  });
});


$(document).on('click', '.update-button', function() {
  console.log('Clique no botão de atualização');
  const userId = $(this).data('id');
  const $row = $(this).closest('tr');
  const username = $row.find('.username-input').val();
  const password = $row.find('.password-input').val();

  $.ajax({
    url: '/api/update',
    method: 'PUT',
    data: JSON.stringify({ userId, username, password }),
    contentType: 'application/json',
    success: function(data) {
      console.log('User ID:', userId);
      console.log('New username:', username);
      console.log('New password:', password);
      $row.find('.username-input').val(username);
      $row.find('.password-input').val(password);
      alert(data.message);
    },
    error: function(){
      console.log('Error on updating a user on server');
    }
  });
});

