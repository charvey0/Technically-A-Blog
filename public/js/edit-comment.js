async function editCommentFormHandler(event) {
    event.preventDefault();
    const body = document.querySelector('#body').value;

    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    const response = await fetch(`/api/comment/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        body,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (response.ok) {
      document.location.replace(`/api/comment/${id}`);
    } else {
      alert('Failed to comment post');
    }
  };
  
  document.querySelector('.edit-comment-form').addEventListener('submit', editCommentFormHandler);