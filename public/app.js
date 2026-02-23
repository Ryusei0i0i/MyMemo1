// CREATE
async function fetchMemos() {
    const res = await fetch('/memos');
    const memos = await res.json();
    return memos;
}
function convertToJST(memos) {
    return memos.map(memo => ({
        ...memo,
        created_at: new Date(memo.created_at).toLocaleString('ja-JP'),
        updated_at: new Date(memo.updated_at).toLocaleString('ja-JP')
    }));
}
function renderMemos(memos) {
    const list = document.getElementById('list');
    list.innerHTML = '';

    memos.forEach(memo => {
        const li = document.createElement('li');
        li.innerHTML = `
        <h3>${memo.title}</h3>
        <p>${memo.content}</p>
        <small>created_at:${memo.created_at}</small>
        <small>created_at:${memo.updated_at}</small>
        <h4>Update Memo</h4>
        <form id="memoUpdateForm" class="update-btn" data-id='${memo.id}'>
            <input type="text" id="title" name="title" placeholder="Title" required />
            <br />
            <textarea id="content" name="content" placeholder="Content" required></textarea>
            <br />
            <button class='update-btn' type="submit">Update</button>
        </form>
        <button class='delete-btn' data-id='${memo.id}'>Delete</button>
        `;
        list.appendChild(li)
    });
}
async function showMemos() {
    const rawMemos = await fetchMemos();
    const memos = await convertToJST(rawMemos);
    await renderMemos(memos);
}

window.addEventListener('DOMContentLoaded', () => {
    showMemos();
})

//POST
const form = document.getElementById('memoForm');
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    const res = await fetch('/memos',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title,
            content
        })
    });
    await showMemos();
});
//UPDATE
document.addEventListener('submit', async (e) => {
    e.preventDefault();

    const form = e.target;
    const id = form.dataset.id;

    const title = form.querySelector(`input[name='title']`).value;
    const content = form.querySelector(`textarea[name='content']`).value;

    await fetch(`/memos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content })
    });

    await showMemos();
});

//DELETE
document.addEventListener('click', async (e) =>{
    if(!e.target.classList.contains('delete-btn')) return;

    const id = e.target.dataset.id;

    await fetch(`/memos/${id}`, {
        method: 'DELETE'
    });

    await showMemos();
})