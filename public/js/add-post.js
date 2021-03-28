async function newPostFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('#title').value;
    const body = document.querySelector('#body').value;
  
    const response = await fetch(`/api/post`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        body,
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
  