// Initialize Custom Data Analytics Particles
document.addEventListener('DOMContentLoaded', function() {
    // Create custom particle system for data analytics
    const canvas = document.getElementById('particles-js');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Data analytics symbols and shapes
    const dataSymbols = [
        { type: 'chart', symbol: '📊', color: '#00ffff' },
        { type: 'table', symbol: '▦', color: '#ff00ff' },
        { type: 'graph', symbol: '📈', color: '#00ff00' },
        { type: 'pie', symbol: '◴', color: '#ffff00' },
        { type: 'bar', symbol: '▮', color: '#ff6b6b' },
        { type: 'line', symbol: '⎯', color: '#4ecdc4' },
        { type: 'number', symbol: '42', color: '#45b7d1' },
        { type: 'percent', symbol: '%', color: '#96ceb4' },
        { type: 'database', symbol: '🗄️', color: '#f9ca24' },
        { type: 'analytics', symbol: '∑', color: '#f0932b' },
        { type: 'stats', symbol: 'µ', color: '#eb4d4b' },
        { type: 'data', symbol: '💾', color: '#6c5ce7' }
    ];
    
    // Particle class
    class DataParticle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = (Math.random() - 0.5) * 2;
            this.size = Math.random() * 20 + 10;
            this.symbol = dataSymbols[Math.floor(Math.random() * dataSymbols.length)];
            this.opacity = Math.random() * 0.8 + 0.2;
            this.rotation = Math.random() * 360;
            this.rotationSpeed = (Math.random() - 0.5) * 4;
            this.pulse = Math.random() * Math.PI * 2;
            this.pulseSpeed = Math.random() * 0.02 + 0.01;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.rotation += this.rotationSpeed;
            this.pulse += this.pulseSpeed;
            
            // Bounce off edges
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            
            // Keep particles in bounds
            this.x = Math.max(0, Math.min(canvas.width, this.x));
            this.y = Math.max(0, Math.min(canvas.height, this.y));
        }
        
        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity + Math.sin(this.pulse) * 0.2;
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);
            
            // Draw glowing background
            const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size);
            gradient.addColorStop(0, this.symbol.color + '40');
            gradient.addColorStop(1, this.symbol.color + '00');
            ctx.fillStyle = gradient;
            ctx.fillRect(-this.size, -this.size, this.size * 2, this.size * 2);
            
            // Draw symbol
            ctx.fillStyle = this.symbol.color;
            ctx.font = `${this.size}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            if (this.symbol.type === 'number') {
                ctx.fillText(Math.floor(Math.random() * 100), 0, 0);
            } else if (this.symbol.type === 'percent') {
                ctx.fillText('%', 0, 0);
            } else {
                ctx.fillText(this.symbol.symbol, 0, 0);
            }
            
            ctx.restore();
        }
    }
    
    // Create particles
    const particles = [];
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new DataParticle());
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw connections between nearby particles
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.save();
                    ctx.globalAlpha = (150 - distance) / 150 * 0.3;
                    ctx.strokeStyle = '#00ffff';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                    ctx.restore();
                }
            }
        }
        
        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    // Handle mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    
    canvas.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Repel particles near mouse
        particles.forEach(particle => {
            const dx = particle.x - mouseX;
            const dy = particle.y - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.vx += (dx / distance) * force * 0.5;
                particle.vy += (dy / distance) * force * 0.5;
            }
        });
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    // Start animation
    animate();
});

// Project Tags Popup Functionality
document.addEventListener('DOMContentLoaded', function() {
    const viewProjectButtons = document.querySelectorAll('.view-project-btn');
    let currentPopup = null;

    function closePopup() {
        if (currentPopup && currentPopup.parentNode) {
            currentPopup.parentNode.removeChild(currentPopup);
            currentPopup = null;
        }
    }

    function createTagsPopup() {
        const popup = document.createElement('div');
        popup.className = 'tags-popup';
        popup.innerHTML = `
            <div class="tag python-tag">
                <i class="fab fa-python"></i>
                <span>Python</span>
            </div>
            <div class="tag sql-tag">
                <i class="fas fa-database"></i>
                <span>SQL</span>
            </div>
            <div class="tag powerbi-tag">
                <i class="fas fa-chart-pie"></i>
                <span>Power BI</span>
            </div>
        `;

        // Tag click feedback
        popup.querySelectorAll('.tag').forEach(tag => {
            tag.addEventListener('click', () => {
                const name = tag.querySelector('span').textContent;
                showNotification(`${name} selected`, 'info');
                tag.style.boxShadow = '0 0 18px rgba(255,255,255,0.7)';
                setTimeout(() => tag.style.boxShadow = '', 800);
            });
        });

        return popup;
    }

    function positionPopup(popup, button) {
        const rect = button.getBoundingClientRect();
        const scrollY = window.scrollY || window.pageYOffset;
        const scrollX = window.scrollX || window.pageXOffset;

        popup.style.top = `${rect.bottom + 10 + scrollY}px`;
        popup.style.left = `${rect.left + scrollX}px`;
    }

    viewProjectButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();

            // Close if clicking the button that already opened it
            if (currentPopup) {
                closePopup();
            }

            // Create and show new popup
            const popup = createTagsPopup();
            document.body.appendChild(popup);
            positionPopup(popup, this);
            currentPopup = popup;

            // Temporary visual state on button
            this.classList.add('active');

            // Close on outside click
            const outsideClickHandler = (evt) => {
                if (currentPopup && !currentPopup.contains(evt.target) && evt.target !== this) {
                    closePopup();
                    this.classList.remove('active');
                    document.removeEventListener('mousedown', outsideClickHandler);
                }
            };
            document.addEventListener('mousedown', outsideClickHandler);
        });
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closePopup();
        }
    });
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 255, 255, 0.1)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.9)';
            navbar.style.boxShadow = 'none';
        }
    }
});

// Typing Animation for Hero Title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation
document.addEventListener('DOMContentLoaded', () => {
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const originalText = typingElement.textContent;
        setTimeout(() => {
            typeWriter(typingElement, originalText, 80);
        }, 1000);
    }
});

// Counter Animation for Hero Stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Trigger counter animation when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                if (target) {
                    animateCounter(stat, target);
                }
            });
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }
});

// Skills Section Animation
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillItems = entry.target.querySelectorAll('.skill-item');
            skillItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 100);
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.addEventListener('DOMContentLoaded', () => {
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        skillObserver.observe(skillsSection);
    }
});

// Chart.js Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Hero Chart
    const heroCtx = document.getElementById('heroChart');
    if (heroCtx) {
        new Chart(heroCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: '',
                    data: [120, 190, 300, 500, 200, 300],
                    borderColor: '#00ffff',
                    backgroundColor: 'rgba(0, 255, 255, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }, {
                    label: '',
                    data: [85, 90, 88, 92, 95, 98],
                    borderColor: '#ff00ff',
                    backgroundColor: 'rgba(255, 0, 255, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: '#ffffff'
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: '#cccccc'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    },
                    y: {
                        ticks: {
                            color: '#cccccc'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    }
                }
            }
        });
    }

    // Skills Radar Chart
	const skillsCtx = document.getElementById('skillsChart');
	if (skillsCtx) {
		const radarCtx = skillsCtx.getContext('2d');
		const gradient = radarCtx.createLinearGradient(0, 0, 0, skillsCtx.height || 300);
		gradient.addColorStop(0, 'rgba(0, 255, 255, 0.30)');
		gradient.addColorStop(1, 'rgba(255, 0, 255, 0.15)');

		new Chart(skillsCtx, {
			type: 'radar',
			data: {
				labels: ['Python', 'SQL', 'Statistics', 'Excel', 'Power BI'],
				datasets: [{
					label: 'Data Analysis Skills',
					data: [80, 90, 82, 85, 85],
					borderColor: '#00ffff',
					backgroundColor: gradient,
					borderWidth: 3,
					pointBackgroundColor: '#ffffff',
					pointBorderColor: '#00ffff',
					pointBorderWidth: 2,
					pointRadius: 4,
					pointHoverRadius: 7,
					pointHoverBackgroundColor: '#00ffff',
					pointHoverBorderColor: '#ffffff',
					pointHoverBorderWidth: 2
				}]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				plugins: {
					legend: {
						position: 'top',
						labels: { color: '#e6ffff' }
					},
					tooltip: {
						backgroundColor: 'rgba(0, 20, 30, 0.9)',
						borderColor: 'rgba(0, 255, 255, 0.4)',
						borderWidth: 1,
						titleColor: '#e6ffff',
						bodyColor: '#dbefff'
					}
				},
				elements: {
					line: { borderJoinStyle: 'round' },
					point: { hitRadius: 10 }
				},
				scales: {
					r: {
						beginAtZero: true,
						suggestedMin: 0,
						suggestedMax: 100,
						angleLines: {
							color: 'rgba(0, 255, 255, 0.25)',
							lineWidth: 1
						},
						grid: {
							color: 'rgba(255, 255, 255, 0.15)',
							borderDash: [4, 4],
							circular: true
						},
						pointLabels: {
							color: '#ffffff',
							font: { size: 12, weight: '600' }
						},
						ticks: {
							display: true,
							color: '#b3e6ff',
							backdropColor: 'transparent',
							stepSize: 20
						}
					}
				}
			}
		});
	}
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const inputs = contactForm.querySelectorAll('input, textarea');
        
        // Simple validation
        let isValid = true;
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#ff0000';
            } else {
                input.style.borderColor = 'rgba(0, 255, 255, 0.2)';
            }
        });
        
        if (!isValid) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Email validation
        const emailInput = contactForm.querySelector('input[type="email"]');
        if (!isValidEmail(emailInput.value)) {
            showNotification('Please enter a valid email address', 'error');
            emailInput.style.borderColor = '#ff0000';
            return;
        }
        
        // Simulate form submission
        showNotification('Message sent successfully!', 'success');
        contactForm.reset();
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Enhanced Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 15px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
    `;
    
    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.background = 'linear-gradient(135deg, rgba(0, 255, 0, 0.8), rgba(0, 200, 0, 0.8))';
            break;
        case 'error':
            notification.style.background = 'linear-gradient(135deg, rgba(255, 0, 0, 0.8), rgba(200, 0, 0, 0.8))';
            break;
        default:
            notification.style.background = 'linear-gradient(135deg, rgba(0, 255, 255, 0.8), rgba(0, 200, 255, 0.8))';
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 4000);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.skill-category, .project-card, .timeline-item, .contact-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Enhanced Button Click Effects
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-content i {
        font-size: 1.2rem;
    }
`;
document.head.appendChild(style);

// Parallax effect for background elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const circuits = document.querySelectorAll('.bg-circuit');
    const flows = document.querySelectorAll('.data-flow');
    const orbs = document.querySelectorAll('.glow-orb');
    
    circuits.forEach((circuit, index) => {
        const speed = 0.3 + (index * 0.1);
        const yPos = -(scrolled * speed);
        circuit.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.05}deg)`;
    });
    
    flows.forEach((flow, index) => {
        const speed = 0.2 + (index * 0.1);
        const xPos = -(scrolled * speed);
        flow.style.transform = `translateX(${xPos}px)`;
    });
    
    orbs.forEach((orb, index) => {
        const speed = 0.1 + (index * 0.05);
        const yPos = -(scrolled * speed);
        orb.style.transform = `translateY(${yPos}px) scale(${1 + scrolled * 0.0001})`;
    });
});

// Add hover effects to project cards
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 20px 40px rgba(0, 255, 255, 0.3)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 5px 15px rgba(0, 255, 255, 0.1)';
        });
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
        
        // Hide all project tags
        document.querySelectorAll('.project-tags-display').forEach(display => {
            display.style.display = 'none';
        });
        
        // Reset view project buttons
        document.querySelectorAll('.view-project-btn').forEach(button => {
            button.innerHTML = '<i class="fas fa-eye"></i>';
            button.style.background = 'linear-gradient(135deg, #00ffff, #0080ff)';
        });
    }
});

// Enhanced focus styles for accessibility
document.addEventListener('DOMContentLoaded', () => {
    const focusableElements = document.querySelectorAll('a, button, input, textarea');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.style.outline = '2px solid #00ffff';
            element.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', () => {
            element.style.outline = 'none';
        });
    });
});

// Add glow effect to buttons on hover
document.addEventListener('DOMContentLoaded', () => {
    const glowButtons = document.querySelectorAll('.glow-btn');
    
    glowButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            if (!button.classList.contains('view-project-btn')) {
                button.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.6)';
            }
        });
        
        button.addEventListener('mouseleave', () => {
            if (!button.classList.contains('view-project-btn')) {
                button.style.boxShadow = '';
            }
        });
    });
});

// Dynamic data visualization updates
function updateChartData() {
    const heroChart = Chart.getChart('heroChart');
    if (heroChart) {
        const newData = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [{
                label: 'Sales Performance',
                data: [120, 190, 300, 500, 200, 300, 450],
                borderColor: '#00ffff',
                backgroundColor: 'rgba(0, 255, 255, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }, {
                label: 'Customer Satisfaction',
                data: [85, 90, 88, 92, 95, 98, 96],
                borderColor: '#ff00ff',
                backgroundColor: 'rgba(255, 0, 255, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        };
        
        heroChart.data = newData;
        heroChart.update();
    }
}

// Update chart every 5 seconds for demo purposes
setInterval(updateChartData, 5000);
