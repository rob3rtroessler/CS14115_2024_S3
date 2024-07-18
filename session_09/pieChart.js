/* * * * * * * * * * * * * *
*         PieChart         *
* * * * * * * * * * * * * */


class PieChart {

    // constructor method to initialize Timeline object
    constructor(parentElement) {
        this.parentElement = parentElement;
        this.circleColors = ['#b2182b','#d6604d','#f4a582','#fddbc7'];

        // call initVis method
        this.initVis()
    }

    initVis(){
        let vis = this;

        // margin conventions
        vis.margin = {top: 10, right: 50, bottom: 10, left: 50};
        vis.width = $("#" + vis.parentElement).width() - vis.margin.left - vis.margin.right;
        vis.height = $("#" + vis.parentElement).height() - vis.margin.top - vis.margin.bottom;

        // init drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");

        // add title
        vis.svg.append('g')
            .attr('class', 'title pie-title')
            .append('text')
            .text('Title for Pie Chart')
            .attr('transform', `translate(${vis.width / 2}, 20)`)
            .attr('text-anchor', 'middle');

        // pie chart setup
        vis.pieChartGroup = vis.svg
            .append('g')
            .attr('class', 'pie-chart')
            .attr("transform", "translate("+ vis.width / 2 + "," + vis.height / 2 + ")");

        vis.outerRadius = vis.height / 3;
        vis.innerRadius = 0;

        vis.pie = d3.pie()
            .value(d => d.value);

        vis.arc = d3.arc()
            .innerRadius(vis.innerRadius)
            .outerRadius(vis.outerRadius);

        // call next method in pipeline
        this.wrangleData();
    }

    // wrangleData method
    wrangleData(){
        let vis = this

        vis.displayData = []

        // generate random data
        for (let i = 0; i < 4; i++){
            let random = Math.floor(Math.random() * 100)
            vis.displayData.push({
                value: random,
                color: vis.circleColors[i]
            })
        }

        vis.updateVis()

    }

    // updateVis method
    updateVis(){
        let vis = this;

        let arcs = vis.pieChartGroup.selectAll(".arc")
            .data(vis.pie(vis.displayData))

        arcs.enter()
            .append("path")
            .attr("class", 'arc')
            .merge(arcs)
            .attr("fill", d => d.data.color)
            .attr("d", vis.arc)


    }
}