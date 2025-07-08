const res = await fetch('https://roomcheckbackend.onrender.com', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});


document.getElementById('checklistForm').addEventListener('submit', function (e) {
  e.preventDefault();

  (async () => {
    const room = document.getElementById('room').value;
    const date = document.getElementById('date').value;

    if (!room || !date) {
      document.getElementById('message').textContent = 'Please select a room and date.';
      return;
    }

    const formData = new FormData(e.target);
    const items = Object.fromEntries(formData.entries());
    delete items.date; // remove duplicate

    const data = {
      room,
      date,
      items
    };

    try {
      const res = await fetch('https://roomcheckbackend.onrender.com/submit-checklist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      document.getElementById('message').textContent = result.message || 'Checklist submitted.';

      if (result.emailSent) {
        document.getElementById('message').textContent += ' Email sent for missing items.';
      }
    } catch (err) {
      console.error('Error:', err);
      document.getElementById('message').textContent = 'An error occurred while submitting.';
    }
  })();
});
