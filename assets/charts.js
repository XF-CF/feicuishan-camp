/* 翡翠山户外营地 · 数据图表（ECharts，本地依赖） */
(function () {
  if (typeof echarts === 'undefined') return;

  var C = {
    ink: '#15231b',
    muted: '#5d6b62',
    rule: '#dedbce',
    accent: '#1d6b45',
    accent2: '#a96522'
  };
  var FONT = "'WorkSans','Noto Sans CJK SC','Source Han Sans SC','PingFang SC','Microsoft YaHei',sans-serif";
  var TIP = {
    backgroundColor: 'rgba(14,26,19,.94)',
    borderWidth: 0,
    padding: [8, 12],
    textStyle: { color: '#e9efe7', fontFamily: FONT, fontSize: 12 }
  };

  var instances = [];

  /* ---------- 1. 项目投资构成 ---------- */
  var el1 = document.getElementById('chart-invest');
  if (el1) {
    var c1 = echarts.init(el1, null, { renderer: 'canvas' });
    c1.setOption({
      textStyle: { fontFamily: FONT },
      color: [C.accent, C.accent2],
      tooltip: Object.assign({ trigger: 'item' }, TIP, {
        formatter: function (p) {
          return p.name + '<br>' + p.value + ' 万元 · ' + p.percent + '%';
        }
      }),
      legend: {
        bottom: 0, icon: 'circle', itemWidth: 9, itemHeight: 9, itemGap: 22,
        textStyle: { color: C.muted, fontSize: 12, fontFamily: FONT }
      },
      series: [{
        name: '项目投资构成',
        type: 'pie',
        radius: ['50%', '74%'],
        center: ['50%', '44%'],
        avoidLabelOverlap: true,
        itemStyle: { borderColor: '#fff', borderWidth: 3 },
        label: {
          show: true, fontWeight: 700,
          formatter: '{b}\n{c} 万元 · {d}%',
          color: C.ink, fontSize: 12, lineHeight: 18, fontFamily: FONT
        },
        labelLine: { length: 10, length2: 14, lineStyle: { color: C.rule } },
        data: [
          { value: 1000, name: '中央预算内专项资金' },
          { value: 350, name: '地方配套及自筹' }
        ]
      }]
    });
    instances.push(c1);
  }

  /* ---------- 2. 重点分区与设施规模 ---------- */
  var el2 = document.getElementById('chart-scale');
  if (el2) {
    var items = [
      ['露天营地 · 营地一', 2780],
      ['露天营地 · 营地二', 2250],
      ['一期碎石营地', 785],
      ['一期草皮绿化', 550],
      ['稻田区木栈桥', 408],
      ['全杉木三角木屋（4 栋）', 225],
      ['攀岩活动场', 145],
      ['稻田区观景平台', 143],
      ['临水茶亭', 70]
    ];
    var c2 = echarts.init(el2, null, { renderer: 'canvas' });
    c2.setOption({
      textStyle: { fontFamily: FONT },
      grid: { left: 6, right: 62, top: 8, bottom: 4, containLabel: true },
      tooltip: Object.assign({ trigger: 'axis', axisPointer: { type: 'shadow', shadowStyle: { color: 'rgba(29,107,69,.07)' } } }, TIP, {
        formatter: function (ps) { return ps[0].name + '<br>' + ps[0].value + ' ㎡'; }
      }),
      xAxis: {
        type: 'value',
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: C.rule, type: 'dashed' } },
        axisLabel: { color: C.muted, fontSize: 11, fontFamily: FONT }
      },
      yAxis: {
        type: 'category',
        inverse: true,
        data: items.map(function (d) { return d[0]; }),
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { color: C.ink, fontSize: 12, fontFamily: FONT }
      },
      series: [{
        type: 'bar',
        barWidth: 15,
        itemStyle: {
          borderRadius: [0, 8, 8, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: C.accent },
            { offset: 1, color: '#3aa06a' }
          ])
        },
        label: {
          show: true, position: 'right', distance: 8,
          formatter: '{c} ㎡', color: C.muted, fontSize: 11, fontFamily: FONT
        },
        data: items.map(function (d) { return d[1]; })
      }]
    });
    instances.push(c2);
  }

  /* ---------- 自适应 ---------- */
  var timer = null;
  function resize() { instances.forEach(function (c) { c.resize(); }); }
  window.addEventListener('resize', function () {
    clearTimeout(timer);
    timer = setTimeout(resize, 150);
  });
  window.addEventListener('load', resize);
})();
