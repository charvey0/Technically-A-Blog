async function newPostFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('#title').value;
    const body = document.querySelector('#body').value;
    const user_id = document.querySelector('#user_id').value;
  
    const response = await fetch(`/api/post`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        body,
        user_id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to add post');
    }
  }
  
  document.querySelector('.new-post-form').addEventListener('submit', newPostFormHandler);
  