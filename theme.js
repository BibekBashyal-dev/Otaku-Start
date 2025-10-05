// theme.js - Handles theme switching after ENTER THE WORLD

document.addEventListener('DOMContentLoaded', function() {
    const enterBtn = document.getElementById('enter-btn');
    if (!enterBtn) return;
    enterBtn.addEventListener('click', function() {
        // Hide intro with fade
        const intro = document.getElementById('intro-premium');
        intro.classList.add('hide');
        // Show portal warp overlay
        const tt = document.getElementById('timetravel-overlay');
        tt.style.display = 'block';
        tt.innerHTML = '<canvas id="portal-canvas" style="width:100vw;height:100vh;display:block;"></canvas>';
        setTimeout(function() {
            const canvas = document.getElementById('portal-canvas');
            const ctx = canvas.getContext('2d');
            function resize() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
            resize();
            window.addEventListener('resize', resize);
            let t = 0;
            function draw() {
                ctx.clearRect(0,0,canvas.width,canvas.height);
                // Portal ring
                let maxR = Math.max(canvas.width, canvas.height) * 0.7;
                let r = Math.min(maxR, t*32+80);
                let grad = ctx.createRadialGradient(canvas.width/2,canvas.height/2,Math.max(0,r-40),canvas.width/2,canvas.height/2,r);
                grad.addColorStop(0,'rgba(255,255,255,0.0)');
                grad.addColorStop(0.7,'rgba(0,255,240,0.18)');
                grad.addColorStop(0.85,'rgba(255,0,234,0.13)');
                grad.addColorStop(1,'rgba(255,255,255,0.0)');
                ctx.save();
                ctx.globalAlpha = 0.92;
                ctx.beginPath();
                ctx.arc(canvas.width/2,canvas.height/2,r,0,2*Math.PI);
                ctx.fillStyle = grad;
                ctx.filter = `blur(${Math.max(0,16-t/2)}px)`;
                ctx.fill();
                ctx.restore();
                // Center flash
                if (t > 18) {
                    ctx.save();
                    ctx.globalAlpha = Math.max(0, 0.18 - (t-18)*0.01);
                    ctx.beginPath();
                    ctx.arc(canvas.width/2,canvas.height/2,Math.max(0, r*0.18),0,2*Math.PI);
                    ctx.fillStyle = 'rgba(255,255,255,0.7)';
                    ctx.filter = 'blur(16px)';
                    ctx.fill();
                    ctx.restore();
                }
                t += 1.2;
                if (r < maxR) requestAnimationFrame(draw);
            }
            draw();
        }, 10);
        setTimeout(function() {
            tt.style.display = 'none';
            intro.style.display = 'none';
            document.body.classList.add('black-premium-theme');
            document.getElementById('main-content').style.display = '';
        }, 1400);
    });
});
