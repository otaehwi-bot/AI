// 스크롤 시 나타나기
(function () {
  var els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('show'); }); return; }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('show'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  els.forEach(function (e) { io.observe(e); });
})();

// 행성 필터 (planets.html)
(function () {
  var btns = document.querySelectorAll('.filters button');
  if (!btns.length) return;
  btns.forEach(function (b) {
    b.addEventListener('click', function () {
      btns.forEach(function (x) { x.classList.remove('on'); });
      b.classList.add('on');
      var f = b.dataset.f;
      document.querySelectorAll('.planet').forEach(function (p) {
        p.hidden = !(f === 'all' || p.dataset.type === f);
      });
    });
  });
})();

// 크기 비교 막대 + 나이 계산기 (facts.html)
(function () {
  var planets = [
    { n: '수성', d: 4879, y: 0.2408 },
    { n: '금성', d: 12104, y: 0.6152 },
    { n: '지구', d: 12756, y: 1 },
    { n: '화성', d: 6792, y: 1.8808 },
    { n: '목성', d: 142984, y: 11.862 },
    { n: '토성', d: 120536, y: 29.457 },
    { n: '천왕성', d: 51118, y: 84.011 },
    { n: '해왕성', d: 49528, y: 164.79 }
  ];

  var bars = document.getElementById('bars');
  if (bars) {
    planets.forEach(function (p) {
      var pct = Math.max(p.d / 142984 * 100, 2);
      var row = document.createElement('div');
      row.className = 'bar-row';
      row.innerHTML = '<span>' + p.n + '</span><div class="bar"><span data-w="' + pct.toFixed(1) + '"></span></div><b>' + p.d.toLocaleString('ko-KR') + ' km</b>';
      bars.appendChild(row);
    });
    var fill = function () { bars.querySelectorAll('.bar span').forEach(function (s) { s.style.width = s.dataset.w + '%'; }); };
    if ('IntersectionObserver' in window) {
      var o = new IntersectionObserver(function (en) { if (en[0].isIntersecting) { fill(); o.disconnect(); } }, { threshold: 0.3 });
      o.observe(bars);
    } else { fill(); }
  }

  var out = document.getElementById('ageOut'), input = document.getElementById('age');
  if (out && input) {
    var render = function () {
      var age = parseFloat(input.value);
      if (isNaN(age) || age < 0) { out.textContent = '0 이상의 숫자를 입력해 주세요.'; return; }
      out.innerHTML = planets.map(function (p) {
        return '<div><small>' + p.n + '</small><b>' + (age / p.y).toFixed(1) + '살</b></div>';
      }).join('');
    };
    input.addEventListener('input', render);
    document.getElementById('ageForm').addEventListener('submit', function (e) { e.preventDefault(); render(); });
    render();
  }
})();
