
const modalOverlay = document.getElementById('modal-overlay');
const modals = document.querySelectorAll('.modal');
const openModalButtons = document.querySelectorAll('.open-modal');
const closeModalButtons = document.querySelectorAll('.close-modal');


function openModal(modalId) {
    closeAllModals();
    
    modalOverlay.classList.add('active');
    
    const modal = document.getElementById(`modal-${modalId}`);
    if (modal) {
        modal.classList.add('active');
        
        document.body.style.overflow = 'hidden';
    
        const firstFocusableElement = modal.querySelector('button, [href], input, select, textarea');
        if (firstFocusableElement) {
            firstFocusableElement.focus();
        }
    }
}


function closeAllModals() {
    modalOverlay.classList.remove('active');
    
    modals.forEach(modal => {
        modal.classList.remove('active');
    });
    
    document.body.style.overflow = 'auto';
}

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const course = button.getAttribute('data-course');
        openModal(course);
    });
});

closeModalButtons.forEach(button => {
    button.addEventListener('click', closeAllModals);
});

modalOverlay.addEventListener('click', closeAllModals);

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeAllModals();
    }
});

modals.forEach(modal => {
    modal.addEventListener('click', (event) => {
        event.stopPropagation();
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (!this.classList.contains('open-modal')) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});