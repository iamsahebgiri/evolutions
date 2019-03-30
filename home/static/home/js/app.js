const shared = {
    currentData: [],
}
const app = new Vue({
    el: '#app',
    components: {
        apexchart: VueApexCharts,
    },
    data: {
        checked: true,
        loading: true,
        species: [],
        series: [],
        chartOptions: {
            chart: {
                events: {
                    dataPointSelection: function (event, chartContext, config) {
                        let el = config.dataPointIndex;
                        let seriesIndex = config.seriesIndex;
                        bubble = shared.currentData[0].series[seriesIndex].event[el] ;
                        const swalWithBootstrapButtons = Swal.mixin({
                            customClass: {
                                confirmButton: 'btn btn-soft-info btn-sm',
                                cancelButton: 'btn btn-soft-danger btn-sm',
                            },
                            buttonsStyling: false,
                        })
                        swalWithBootstrapButtons.fire({
                            html: bubble.description ,
                            title: bubble.title,
                            imageUrl: bubble.imgURL,
                            imageHeight: 200,
                            imageAlt: bubble.title,
                            showCancelButton: true,
                            width: 500,
                        })
                    }
                }
            },
            dataLabels: {
                enabled: false
            },
            fill: {
                opacity: 0.8
            },
            title: {
                text: 'Timeline',
                align: 'center'
            },
            xaxis: {
                tickAmount: 12,
                type: 'category',
                labels: {
                    formatter: function (value) {
                        return value.toFixed(0) + " Ma";
                    }
                }
            },
            yaxis: {
                max: 70,
                labels: {
                    formatter: function (value) {
                        return "";
                    }
                }
            },
            legend: {
                position: 'top',
                horizontalAlign: 'left',
            },
            tooltip: {
                x: {
                    show: false
                },
                // custom: function({series, seriesIndex, dataPointIndex, w}) {
                //   return '<div class="arrow_box btn btn-dark btn-sm">' +
                //     '<span>' +  +'</span>' +
                //     '</div>'
                // },
                z: {
                    title: "Importance Level"
                },
            },
        }
    },
    delimiters: ['[[', ']]'],
    beforeMount: function () {
        this.getSpecies();
        this.generateSeries(8);// When app loads sending request to api
    },
    methods: {
        getSpecies: function () {
            api_url = 'api/species'
            this.$http.get(api_url)
                .then((response) => {
                    this.species = response.data;
                    this.loading = false;
                })
                .catch((err) => {
                    this.loading = false;
                    console.log(err);
                })
        },
        generateSeries: function (id) {
            this.series.length = 0; //Empty the array when clicked on a species

            api_url = `/api/species/${id}/`
            this.$http.get(api_url)
                .then((response) => {
                    //Empty the currentData obj to store fresh data
                    if(shared.currentData.length != 0 )
                    {
                        shared.currentData.length = 0; 
                    }
                    shared.currentData.push(response.data); // Store the data from API as global obj
                    let res_series = response.data.series;
                    for (let i = 0; i < res_series.length; i++) {
                        let series = {};
                        series.name = res_series[i].name;
                        series.data = [];
                        for (let j = 0; j < res_series[i].event.length; j++) {
                            let year = res_series[i].event[j].date;
                            let y = Math.floor(Math.random() * 60) + 1;
                            let r = Math.floor(Math.random() * 30) + 10;
                            series.data.push([year, y, r]);
                        }
                        
                        this.series.push(series);
                    }
                   // console.log(this.series);
                    this.loading = false;
                })
                .catch((err) => {
                    this.loading = false;
                    console.log(err);
                })
        },
        howToUse: function () {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-soft-info btn-sm',
                },
                buttonsStyling: false,
            })
            swalWithBootstrapButtons.fire({
                html: '<ol class="text-left"><li>Each bubble denotes an event for the selected species.</li><li> In x-axis, it displays the time when did it happen in Ma (Millions years ago).</li><li> By clicking on bubble, a popup brings you information along with a picture associated with it.</li><li> Try selecting some bubbles to zoom them.</li></ol>',
                title: "How to use",
                type: "info",
                width: 500,
            })
        },
        darkMode: function () {
            if(checked){
                alert("true");
            }
            else{
                alert("false");
            }
          },
    }
});