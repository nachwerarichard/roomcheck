document.getElementById('checklistForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const room = document.getElementById('room').value;
  const formData = new FormData(e.target);
  const date = document.getElementById('date').value;

  const data = {
    room,
    date: new Date().toISOString(),
    items: Object.fromEntries(formData.entries())
  };

delete data.items.date; // remove duplicate from 'items'

  const res = await fetch('/submit-checklist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  const result = await res.json();
  document.getElementById('message').textContent = result.message;
});
