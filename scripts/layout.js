async function loadJSON(path) {
    let response = await fetch(path);
    let dataset = await response.json(); // Now available in global scope
    return dataset;
}

let tableArr;
let matchData;
let chart;
let chartMap;
let spiderData;
let donutData;

Highcharts.theme = {
    colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
        '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
    chart: {
        backgroundColor: {
            linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
            stops: [
                [0, '#2a2a2b'],
                [1, '#3e3e40']
            ]
        },
        style: {
            fontFamily: '\'Unica One\', sans-serif'
        },
        plotBorderColor: '#606063'
    },
    title: {
        style: {
            color: '#E0E0E3',
            fontSize: '20px'
        }
    },
    subtitle: {
        style: {
            color: '#E0E0E3',
        }
    },
    xAxis: {
        gridLineColor: '#707073',
        labels: {
            style: {
                color: '#E0E0E3'
            }
        },
        lineColor: '#707073',
        minorGridLineColor: '#505053',
        tickColor: '#707073',
        title: {
            style: {
                color: '#A0A0A3'
            }
        }
    },
    yAxis: {
        gridLineColor: '#707073',
        labels: {
            style: {
                color: '#E0E0E3'
            }
        },
        lineColor: '#707073',
        minorGridLineColor: '#505053',
        tickColor: '#707073',
        tickWidth: 1,
        title: {
            style: {
                color: '#A0A0A3'
            }
        }
    },
    tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        style: {
            color: '#F0F0F0'
        }
    },
    plotOptions: {
        series: {
            dataLabels: {
                color: '#F0F0F3',
                style: {
                    fontSize: '13px'
                }
            },
            marker: {
                lineColor: '#333'
            },
        },
        boxplot: {
            fillColor: '#505053'
        },
        candlestick: {
            lineColor: 'white'
        },
        errorbar: {
            color: 'white'
        }
    },
    legend: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        itemStyle: {
            color: '#E0E0E3'
        },
        itemHoverStyle: {
            color: '#FFF'
        },
        itemHiddenStyle: {
            color: '#606063'
        },
        title: {
            style: {
                color: '#C0C0C0'
            }
        },
    },
    credits: {
        style: {
            color: '#666'
        },
        enabled: false
    },
    labels: {
        style: {
            color: '#707073'
        }
    },
    drilldown: {
        activeAxisLabelStyle: {
            color: '#F0F0F3'
        },
        activeDataLabelStyle: {
            color: '#F0F0F3'
        }
    },
    navigation: {
        buttonOptions: {
            symbolStroke: '#DDDDDD',
            theme: {
                fill: '#505053'
            }
        }
    },
    rangeSelector: {
        buttonTheme: {
            fill: '#505053',
            stroke: '#000000',
            style: {
                color: '#CCC'
            },
            states: {
                hover: {
                    fill: '#707073',
                    stroke: '#000000',
                    style: {
                        color: 'white'
                    }
                },
                select: {
                    fill: '#000003',
                    stroke: '#000000',
                    style: {
                        color: 'white'
                    }
                }
            }
        },
        inputBoxBorderColor: '#505053',
        inputStyle: {
            backgroundColor: '#333',
            color: 'silver'
        },
        labelStyle: {
            color: 'silver'
        }
    },
    navigator: {
        handles: {
            backgroundColor: '#666',
            borderColor: '#AAA'
        },
        outlineColor: '#CCC',
        maskFill: 'rgba(255,255,255,0.1)',
        series: {
            color: '#7798BF',
            lineColor: '#A6C7ED'
        },
        xAxis: {
            gridLineColor: '#505053'
        }
    },
    scrollbar: {
        barBackgroundColor: '#808083',
        barBorderColor: '#808083',
        buttonArrowColor: '#CCC',
        buttonBackgroundColor: '#606063',
        buttonBorderColor: '#606063',
        rifleColor: '#FFF',
        trackBackgroundColor: '#404043',
        trackBorderColor: '#404043'
    },
    exporting: {
        buttons: {
            contextButton: {
                enabled: false
            }
        }
    }
};

Highcharts.setOptions(Highcharts.theme);

function plotStandings(stands) {
    chart = Highcharts.chart('standingsChart', {

        title: {
            text: 'Premier League Team Final Place Each Season'
        },

        subtitle: {
            text: 'From 2009-Present'
        },

        tooltip: {
            shared: true
        },

        yAxis: {
            title: {
                text: 'Final Place'
            },
            reversed: true
        },

        xAxis: {
            accessibility: {
                rangeDescription: 'Range: 2009 to 2021'
            }
        },

        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },

        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: 2009
            }
        },

        series: stands,

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }

    });
}

function plotMatches(teamName) {
    Highcharts.chart('stockChart', {
        chart: {
            type: 'column'
        },
        title: {
            text: teamName + ' Results v. Other Prem Teams'
        },
        subtitle: {
            text: 'From 2009 - Present'
        },
        xAxis: {
            categories: matchData[teamName]['teams'],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Count'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:14px">v. {point.key}</span><table>',
            pointFormat: '<tr><td style="font-size:12px;background-color:black;color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="font-size:12px;background-color:black;padding:0"><b>{point.y:.1f}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
            }
        },
        series: matchData[teamName]['results'],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    },
                    chart: {
                        inverted: true
                    }
                }
            }]
        }
    });
}

function plot(tiles) {
    chartMap = Highcharts.mapChart('container', {
        chart: {
            map: 'countries/gb/gb-all',
            events: {
                load: function () {
                    var chart = this,
                        points = chart.series[1].data,
                        searchInput = document.getElementById('input')


                    function changeMatches() {
                        var found = false;
                        points.every(function (point) {
                            if (point.id.toLowerCase() === searchInput.value.toLowerCase()) {
                                buildPlots(point.id);
                                point.update({
                                    color: 'red'
                                })
                                chart.tooltip.refresh(point);
                                found = true;

                                return false;
                            }
                            return true;
                        });

                        if (found === false) {
                            alert('Team not found please try again!');
                        }
                        searchInput.value = '';
                    }
                    searchInput.addEventListener('keypress', function (e) {
                        if (e.key === 'Enter') {

                            var searchInput = document.getElementById('input');
                            if (searchInput.value.toLowerCase().includes('manchester') || searchInput.value.toLowerCase().includes('man')) {
                                searchInput.value = searchInput.value.toLowerCase().replace('manchester', 'man');
                                changeMatches();
                            } else if (searchInput.value.toLowerCase().includes('united') && !searchInput.value.toLowerCase().includes('sheffield')) {
                                searchInput.value = searchInput.value.toLowerCase().replace(' united', '');
                                changeMatches();
                            } else {
                                changeMatches();
                            }
                        }
                    });
                }
            }
        },

        title: {
            text: 'Prem Stadium Map'
        },

        mapNavigation: {
            enabled: true
        },

        tooltip: {
            formatter: function () {
                return this.point.id + ':<b> ' + this.point.val + ' </b> titles <br>Stadium: '
                    + this.point.name + ' <br>Capacity: ' + this.point.cap;
            }
        },

        plotOptions: {
            series: {
                marker: {
                    fillColor: '#FFFFFF',
                    lineWidth: 2,
                    lineColor: Highcharts.getOptions().colors[1]
                },
                point: {
                    events: {
                        click: function () {
                            this.update({
                                color: 'red'
                            });
                            buildPlots(this.id);
                        }
                    }
                }
            },
        },

        legend: {
            align: 'left',
            layout: 'vertical',
            floating: true
        },

        series: [{
            mapData: Highcharts.maps['countries/gb/gb-all'],
            name: 'PremierMap',
            borderColor: '#707070',
            nullColor: 'rgb(200, 200, 200, 0.3)',
            showInLegend: false,
            data: []
        }, {
            type: 'mappoint',
            name: 'Teams',
            dataLabels: {
                format: '{point.id}'
            },
            data: tiles
        }],
    });
}

function plotDonut(teamName) {
    let toolDict = donutData[teamName]['toolDict']
    Highcharts.chart('donutChart', {
        colors: ['#808080', '#50B432', '#ED561B'],
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false
        },
        title: {
            text: teamName + ' Shot<br>Conversion<br>Rates',
            align: 'center',
            verticalAlign: 'middle',
            y: 100
        },
        tooltip: {
            formatter: function() {
                return this.y + ' (' + this.percentage.toFixed(1) + '%) of <b>' + teamName + "'s</b> shots are " + 
                this.key + '<br>' + toolDict[this.key]
            }
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: true,
                    distance: -65,
                    style: {
                        fontWeight: 'bold',
                        color: 'white'
                    }
                },
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '85%'],
                size: '140%'
            }
        },
        series: [{
            type: 'pie',
            name: 'Browser share',
            innerSize: '50%',
            data: donutData[teamName]['data']
        }],
        credits: {
            enabled: false
        },
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    size: '20%'
                }
            }]
        }
    });
}

function plotSpider(teamName) {
    let testDic = spiderData[teamName]['toolDict'];
    Highcharts.chart('spiderChart', {

        chart: {
            polar: true,
            type: 'line'
        },

        title: {
            text: teamName + ' Goal Stats',
            align: 'center'
        },

        legend: {
            enabled: false
        },

        pane: {
            size: '80%'
        },

        xAxis: {
            categories: ['Away Scored', 'Total Scored', 'Home Conceded', 'Away Conceded', 'Total Conceded', 'Home Scored'],
            tickmarkPlacement: 'on',
            lineWidth: 0
        },

        yAxis: {
            gridLineInterpolation: 'polygon',
            lineWidth: 0,
            min: 0
        },

        tooltip: {
            formatter: function () {
                return '<b>' + this.y + '</b> Goals<br>' + testDic[this.x] + '<br> Out of 20 teams'
            }
        },

        series: spiderData[teamName]['seriesData'],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    pane: {
                        size: '55%'
                    }
                }
            }]
        }

    });
}

function buildTable(pos, notFirst) {
    var x;
    var j;

    if (pos <= 10) {
        x = 0;
        j = 10;
    } else {
        x = 10;
        j = 20;
    }

    let tableRef = document.getElementById('otherTable');

    for (x; x < j; x++) {
        let currArr = tableArr[x];
        let newRow = tableRef.insertRow(tableRef.rows.length);

        if ((x + 1) === pos && notFirst) {
            newRow.id = 'selected';
        }

        if (x <= 3) {
            newRow.classList.add("wpos");
        } else if (x >= 17) {
            newRow.classList.add("lpos");
        } else {
            newRow.classList.add("pos");
        }

        var cell1 = newRow.insertCell(0);
        var cell2 = newRow.insertCell(1);
        var cell3 = newRow.insertCell(2);
        var cell4 = newRow.insertCell(3);
        var cell5 = newRow.insertCell(4);
        var cell6 = newRow.insertCell(5);
        var cell7 = newRow.insertCell(6);
        var cell8 = newRow.insertCell(7);
        var cell9 = newRow.insertCell(8);
        var cell10 = newRow.insertCell(9);
        var cell11 = newRow.insertCell(10)

        cell1.innerHTML = currArr[0];
        cell2.innerHTML = currArr[1];
        cell3.innerHTML = currArr[2];
        cell4.innerHTML = currArr[3];
        cell5.innerHTML = currArr[4];
        cell6.innerHTML = currArr[5];
        cell7.innerHTML = currArr[6];
        cell8.innerHTML = currArr[7];
        cell9.innerHTML = currArr[8];
        cell10.innerHTML = currArr[9];
        cell11.innerHTML = currArr[10];
    }
}

function removeTable() {
    let tableRef = document.getElementById('otherTable');
    var rowCount = tableRef.rows.length;
    while (--rowCount) {
        tableRef.deleteRow(rowCount);
    }
}

function buildPlots(name) {
    removeTable();
    standingsPromise.then(function (result) {
        buildTable(result.find(x => x.name === name).data.slice(-1)[0], true);
    });

    Highcharts.each(chart.series, function (s) {
        if (s.name === name) {
            s.show();
        } else {
            s.hide();
        }
    });
    chart.redraw();

    let currTeam = chartMap.get(name);
    let xpad = 5,
        ypad = 50
    chartMap.mapZoom();
    chartMap.mapZoom(0.1, currTeam.plotX + xpad, currTeam.plotY + ypad, currTeam.plotX + xpad, currTeam.plotY + ypad);

    plotDonut(name);
    plotSpider(name);
    plotMatches(name);
}

function init() {
    matchPromise = loadJSON('./data/matchup_data.json');
    standingsPromise = loadJSON('./data/standings.json');
    tilesPromise = loadJSON('./data/point_data.json');
    tilesPromise.then(function (tiles) {
        plot(tiles);
    });
    matchPromise.then(function (matches) {
        matchData = matches;
        // plotMatches();
    });
    standingsPromise.then(function (stands) {
        plotStandings(stands);
    });
    tablePromise = loadJSON('./data/table_data.json');
    tablePromise.then(function (rows) {
        tableArr = rows;
        buildTable(1, false);
    });
    spiderPromise = loadJSON('./data/spider_data.json');
    spiderPromise.then(function (goals) {
        spiderData = goals;
        // plotSpider();
    });
    donutPromise = loadJSON('./data/donut_data.json');
    donutPromise.then(function (shots) {
        donutData = shots;
        // plotDonut();
    });
}

document.addEventListener('DOMContentLoaded', init, false);