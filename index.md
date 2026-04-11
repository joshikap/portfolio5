---
layout: post 
title: Portfolio Home 
hide: true
show_reading_time: false
---

<style>
body {
    background-image: url("/images/gamify/water/space.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

/* FULL SCREEN LOCK */
#gate {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.85);
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    text-align: center;
}
</style>

<!-- 🔒 GATE -->
<div id="gate">
    <h2>🔒 Unlock the Homepage</h2>
    <p>Click 10 times to continue</p>

    <button id="clickBtn" style="font-size:20px; padding:15px 30px; border-radius:10px;">
        Click Me
    </button>

    <p>Progress: <span id="count">0</span> / 10</p>
</div>

<script>
let count = 0;

document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("clickBtn");

    btn.onclick = () => {
        count++;
        document.getElementById("count").innerText = count;

        if (count >= 10) {
            document.getElementById("gate").style.display = "none";
        }
    };
});
</script>

---

Hi! our names are Isha and Joshika!

### Development Environment

> Coding starts with tools, explore these tools and procedures with a click.

<div style="display: flex; flex-wrap: wrap; gap: 10px;">
    <a href="https://opencodingsociety.com" style="text-decoration: none; display: inline-flex; align-items: center; gap: 8px; padding: 10px 14px; border: 1px solid #FA8072; border-radius: 6px; font-weight: 700;">
        <img src="{{ '/favicon.ico' | relative_url }}" alt="OCS logo" style="width: 16px; height: 16px;">
        OCS
    </a>
    <a href="https://github.com/Open-Coding-Society/portfolio" style=" text-decoration: none; display: inline-flex; align-items: center; gap: 8px; padding: 10px 14px; border: 1px solid #FFF; border-radius: 6px; font-weight: 700;">
        <img src="https://github.githubassets.com/favicons/favicon.svg" alt="GitHub logo" style="width: 16px; height: 16px;">
        GitHub
    </a>
    <a href="https://vscode.dev/" style="text-decoration: none; display: inline-flex; align-items: center; gap: 8px; padding: 10px 14px; border: 1px solid #007ACC; border-radius: 6px; font-weight: 700;">
        <img src="https://vscode.dev/favicon.ico" alt="VSCode logo" style="width: 16px; height: 16px;">
        VSCode.dev
    </a>
</div>

<br>

### Class Progress

> Here is my progress through coding, click to see these online

<div style="display: flex; flex-wrap: wrap; gap: 10px;">
    <a href="{{site.baseurl}}/snake" style="text-decoration: none;">
        <div style="background-color: #00FF00; color: black; padding: 10px 20px; border-radius: 5px; font-weight: bold;">
            Snake
        </div>
    </a>
    <a href="{{site.baseurl}}/gamify/parallax" style="text-decoration: none;">
        <div style="background-color: #3c1de8; color: white; padding: 10px 20px; border-radius: 5px; font-weight: bold;">
           Fish
        </div>
    </a>
    <a href="{{site.baseurl}}/gamify/water" style="text-decoration: none;">
        <div style="background-color: #b71dc5; color: white; padding: 10px 20px; border-radius: 5px; font-weight: bold;">
           Squid
        </div>
    </a>
</div>

<br>
