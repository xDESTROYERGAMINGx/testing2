const btnA = document.getElementById('btnA');
const btnB = document.getElementById('btnB');
const notification = document.getElementById('copy-notification');

function copyText(text) {
  navigator.clipboard.writeText(text).then(() => {
    notification.textContent = `CLAN ID "${text}" COPIED TO YOUR CLIPBOARD`;
    notification.classList.add('show');

    setTimeout(() => {
      notification.classList.remove('show');
    }, 2000);
  }).catch(err => {
    notification.textContent = 'Failed to copy. Please try manually.';
    notification.classList.add('show');
    setTimeout(() => {
      notification.classList.remove('show');
    }, 2000);
    console.error('Clipboard copy failed:', err);
  });
}

btnA.addEventListener('click', () => copyText('#9UYJPCL0'));
btnB.addEventListener('click', () => copyText('#29222ULQ9'));
