async function deleteCommentFormHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    const response = await fetch(`/api/comment/${id}`, {
      method: 'DELETE'
      }
    );
  
    if (response.ok) {
      document.location.replace(`/`);
    } else {
      alert('Failed to delete comment');
    }
  };
  
  document.querySelector('.delete-comment-form').addEventListener('submit', deleteCommentFormHandler);