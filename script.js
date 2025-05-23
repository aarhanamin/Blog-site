let posts = JSON.parse(localStorage.getItem("blogPosts")) || [];
let editingIndex = null;

function savePost() {
  const titleInput = document.getElementById('title');
  const contentInput = document.getElementById('content');
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  if (!title || !content) {
    alert("Please enter both title and content.");
    return;
  }

  const post = {
    title,
    content,
    date: new Date().toLocaleString()
  };

  if (editingIndex !== null) {
    posts[editingIndex] = post;
    editingIndex = null;
    document.getElementById("form-title").innerText = "Create New Post";
    document.getElementById("submitBtn").innerText = "Post";
  } else {
    posts.unshift(post);
  }

  localStorage.setItem("blogPosts", JSON.stringify(posts));
  renderPosts();

  titleInput.value = '';
  contentInput.value = '';
}

function renderPosts() {
  const blogSection = document.getElementById('blog-posts');
  blogSection.innerHTML = '';

  posts.forEach((post, index) => {
    const postDiv = document.createElement('div');
    postDiv.className = 'post';

    postDiv.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.content}</p>
      <small>Posted on: ${post.date}</small><br>
      <button onclick="editPost(${index})">Edit</button>
      <button onclick="deletePost(${index})" style="margin-left:10px;">Delete</button>
    `;

    blogSection.appendChild(postDiv);
  });
}

function deletePost(index) {
  if (confirm("Are you sure you want to delete this post?")) {
    posts.splice(index, 1);
    localStorage.setItem("blogPosts", JSON.stringify(posts));
    renderPosts();
  }
}

function editPost(index) {
  const post = posts[index];
  document.getElementById('title').value = post.title;
  document.getElementById('content').value = post.content;
  editingIndex = index;
  document.getElementById("form-title").innerText = "Edit Post";
  document.getElementById("submitBtn").innerText = "Update";
}

renderPosts();
