async function deletePostFormHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    const response = await fetch(`/api/post/${id}`, {
      method: 'DELETE'
      }
    );
  
    if (response.ok) {
      document.location.replace(`/`);
    } else {
      alert('Failed to delete post');
    }
  };
  
  document.querySelector('.delete-post-form').addEventListener('submit', deletePostFormHandler);