function analyzeResume() {
    const resume = document.getElementById('resumeText').value.toLowerCase();
    const job = document.getElementById('jobText').value.toLowerCase();

    if (!resume || !job) {
      alert('We need both inputs to scan the future!');
      return;
    }

    // Advanced filtering to remove common words
    const stopWords = ['this', 'that', 'with', 'from', 'your', 'their', 'work', 'have'];
    const keywords = job
      .replace(/[^a-zA-Z ]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 3 && !stopWords.includes(word));

    const uniqueKeywords = [...new Set(keywords)];
    let matched = [];
    let missing = [];

    uniqueKeywords.forEach(skill => {
      if (resume.includes(skill)) {
        matched.push(skill);
      } else {
        missing.push(skill);
      }
    });

    const score = uniqueKeywords.length > 0 ? Math.round((matched.length / uniqueKeywords.length) * 100) : 0;

    const output = document.getElementById('output');
    output.style.display = 'block';
    
    // Animate score count
    animateScore(score);

    renderTags('matchedSkills', matched, 'matched');
    renderTags('missingSkills', missing, 'missing');
    
    output.scrollIntoView({ behavior: 'smooth' });
  }

  function animateScore(target) {
    let current = 0;
    const duration = 1000;
    const step = target / (duration / 10);
    const scoreDiv = document.getElementById('score');
    
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        scoreDiv.textContent = target + '%';
        clearInterval(interval);
      } else {
        scoreDiv.textContent = Math.round(current) + '%';
      }
    }, 10);
  }

  function renderTags(id, list, type) {
    const container = document.getElementById(id);
    container.innerHTML = list.length > 0 ? '' : '<small>Nothing found</small>';
    list.slice(0, 15).forEach(skill => { // Limit to top 15 for cleanliness
      const span = document.createElement('span');
      span.className = `tag ${type}`;
      span.textContent = skill;
      container.appendChild(span);
    });
  }