export function displayAlertBoxes(alertType: string){
    if (!['success', 'info', 'warning', 'danger'].includes(alertType)) {
        alert('Invalid alert type');
        return;
    }

    const existingAlertBox = document.getElementById('alert-box');
    if (existingAlertBox) {
        existingAlertBox.remove();
    }

    const alertBox = document.createElement('div');
    alertBox.className = alertType;
    alertBox.id = 'alert-box';
    alertBox.textContent = `This is a ${alertType} alert box!`;
    document.getElementsByClassName('content')[0].appendChild(alertBox);
}

