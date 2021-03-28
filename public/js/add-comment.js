async function newCommentFormHandler(event) {
    event.preventDefault();
  
    const body = document.querySelector('#body').value;
  
    const response = await fetch(`/api/comment`, {
      method: 'POST',
      body: JSON.stringify({
        body,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to add comment');
    }
  }
  
  document.querySelector('.new-comment-form').addEventListener('submit', newCommentFormHandler);
  