document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const body = document.body;
    const animatedBox = document.getElementById('animated-box');
    const resetBtn = document.getElementById('reset-btn');
    const saveBtn = document.getElementById('save-btn');
    const clearBtn = document.getElementById('clear-btn');
    const userInput = document.getElementById('user-input');
    const savedDataDiv = document.getElementById('saved-data');
    const themeButtons = {
        light: document.getElementById('light-theme'),
        dark: document.getElementById('dark-theme'),
        rainbow: document.getElementById('rainbow-theme')
    };

    // Animation Types
    const animations = ['animate-spin', 'animate-bounce', 'animate-color'];
    let currentAnimation = '';

    // Load saved theme preference
    const savedTheme = localStorage.getItem('themePreference');
    if (savedTheme) {
        body.classList.add(savedTheme);
    }

    // Load saved data
    const savedData = localStorage.getItem('userData');
    if (savedData) {
        savedDataDiv.textContent = `Saved Data: ${savedData}`;
    }

    // Theme Selection
    Object.keys(themeButtons).forEach(theme => {
        themeButtons[theme].addEventListener('click', () => {
            // Remove all theme classes first
            body.className = '';
            
            // Apply selected theme
            if (theme !== 'light') {
                body.classList.add(`${theme}-theme`);
            }
            
            // Save to localStorage
            localStorage.setItem('themePreference', theme === 'light' ? '' : `${theme}-theme`);
        });
    });

    // Box Animation
    animatedBox.addEventListener('click', function() {
        // Remove current animation
        this.classList.remove(currentAnimation);
        
        // Select a random new animation
        const randomIndex = Math.floor(Math.random() * animations.length);
        currentAnimation = animations[randomIndex];
        
        // Apply new animation
        this.classList.add(currentAnimation);
        
        // Save animation to localStorage
        localStorage.setItem('lastAnimation', currentAnimation);
    });

    // Reset Animation
    resetBtn.addEventListener('click', function() {
        animatedBox.classList.remove(currentAnimation);
        currentAnimation = '';
        localStorage.removeItem('lastAnimation');
    });

    // Save Data
    saveBtn.addEventListener('click', function() {
        if (userInput.value.trim()) {
            localStorage.setItem('userData', userInput.value);
            savedDataDiv.textContent = `Saved Data: ${userInput.value}`;
            userInput.value = '';
            
            // Show confirmation animation
            savedDataDiv.classList.add('animate-bounce');
            setTimeout(() => {
                savedDataDiv.classList.remove('animate-bounce');
            }, 1000);
        }
    });

    // Clear Storage
    clearBtn.addEventListener('click', function() {
        localStorage.clear();
        savedDataDiv.textContent = '';
        userInput.value = '';
        alert('All data cleared from storage!');
    });

    // Apply last animation if exists
    const lastAnimation = localStorage.getItem('lastAnimation');
    if (lastAnimation) {
        animatedBox.classList.add(lastAnimation);
        currentAnimation = lastAnimation;
    }
});
