let deferredPrompt;

(()=>{
console.log('init')

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the default prompt
  e.preventDefault();
  // Stash the event so it can be triggered later
  deferredPrompt = e;
  // Show your custom "Add to Home" alert or button
  showAddToHomeAlert();
});

window.addEventListener('appinstalled', () => {
    console.log('PWA was installed');
    // Hide your "Add to Home" alert or button
    const alertDiv = document.querySelector('#addToHomeAlert');
    if (alertDiv) {
      document.body.removeChild(alertDiv);
    }
  });

})()

function showAddToHomeAlert() {
    console.log('showAddToHomeAlert')
  // Display a custom alert or button to prompt the user
  const alertDiv = document.createElement('div');
  alertDiv.classList.add('addToHome_sec');
  alertDiv.innerHTML = `
    <p>برای اینکه ما را دنبال کنید و دسترسی آسان‌تر به محتوای وب سایت داشته باشید، <b>وب سایت من</b> را به صفحه اصلی خود اضافه کنید</p>
    <button id="addToHomeButton">Add to Home</button>
  `;
  document.body.appendChild(alertDiv);

  const addToHomeButton = document.getElementById('addToHomeButton');
  addToHomeButton.addEventListener('click', () => {
    // Trigger the installation prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      // Clear the deferredPrompt variable
      deferredPrompt = null;
      // Remove the alert or button
      document.body.removeChild(alertDiv);
    });
  });
}

