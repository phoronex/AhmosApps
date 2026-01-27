// Toast Notification System
class Toast {
    constructor() {
        this.container = null;
        this.toasts = [];
        this.init();
    }

    init() {
        // Create toast container if it doesn't exist
        if (!document.querySelector('.toast-container')) {
            this.container = document.createElement('div');
            this.container.className = 'toast-container';
            document.body.appendChild(this.container);
        } else {
            this.container = document.querySelector('.toast-container');
        }
    }

    show(message, type = 'info', duration = 4000) {
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        // Get icon based on type
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };

        const icon = icons[type] || '📢';

        // Toast content
        toast.innerHTML = `
            <span class="toast-icon">${icon}</span>
            <span class="toast-message">${message}</span>
            <button class="toast-close">&times;</button>
        `;

        // Add to container
        this.container.appendChild(toast);
        this.toasts.push(toast);

        // Auto remove after duration
        const autoRemove = setTimeout(() => {
            this.remove(toast);
        }, duration);

        // Close button click
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => {
            clearTimeout(autoRemove);
            this.remove(toast);
        });

        // Touch/click anywhere on toast to dismiss (optional)
        toast.addEventListener('click', (e) => {
            if (e.target === toast || e.target.classList.contains('toast-message')) {
                clearTimeout(autoRemove);
                this.remove(toast);
            }
        });

        // Return toast element for manual control
        return {
            element: toast,
            remove: () => this.remove(toast)
        };
    }

    remove(toast) {
        if (!toast.parentNode) return;

        toast.classList.add('fade-out');

        // Wait for animation to complete before removing
        setTimeout(() => {
            if (toast.parentNode === this.container) {
                this.container.removeChild(toast);
            }
            // Remove from array
            const index = this.toasts.indexOf(toast);
            if (index > -1) {
                this.toasts.splice(index, 1);
            }
        }, 300);
    }

    // Convenience methods
    success(message, duration) {
        return this.show(message, 'success', duration);
    }

    error(message, duration) {
        return this.show(message, 'error', duration);
    }

    warning(message, duration) {
        return this.show(message, 'warning', duration);
    }

    info(message, duration) {
        return this.show(message, 'info', duration);
    }

    // Remove all toasts
    clear() {
        this.toasts.forEach(toast => this.remove(toast));
    }
}

// Create global instance
const toast = new Toast();

// Make it globally available
window.showToast = function (message, type = 'info', duration = 4000) {
    return toast.show(message, type, duration);
};

// Add convenience global functions
window.showSuccess = function (message, duration) {
    return toast.success(message, duration);
};

window.showError = function (message, duration) {
    return toast.error(message, duration);
};

window.showWarning = function (message, duration) {
    return toast.warning(message, duration);
};

window.showInfo = function (message, duration) {
    return toast.info(message, duration);
};

/*
// Usage Examples

// Basic usage
showToast('Operation completed successfully!');

// With type
showToast('File saved successfully!', 'success');
showToast('Failed to load data', 'error');
showToast('Please check your input', 'warning');
showToast('New update available', 'info');

// With custom duration (in milliseconds)
showToast('This will disappear in 2 seconds', 'info', 2000);

// Using convenience functions
showSuccess('Data copied to clipboard!');
showError('Network connection failed');
showWarning('This action cannot be undone');
showInfo('Processing your request...');

// Advanced: Get reference to control the toast
const myToast = showToast('Processing...', 'info', 0);
// Later, remove it manually
setTimeout(() => {
    myToast.element.remove(); // or myToast.remove() if using the class method
}, 3000);

*/