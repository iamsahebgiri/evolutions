var score = 1;

//Nodes variables
var width = 1200,
  height = 500,
  root;

var force = d3.layout
  .force()
  .size([width, height])
  .on("tick", tick);

var svg = d3
  .select("svg")
  .attr("width", width)
  .attr("height", height);

var link = svg.selectAll(".link"),
  node = svg.selectAll(".node");

d3.json(dataset, function(error, json) {
  if (error) throw error;

  root = json;
  update();
});

function update() {
  var nodes = flatten(root),
    links = d3.layout.tree().links(nodes);

  // Restart the force layout.
  force
    .nodes(nodes)
    .links(links)
    .start();

  // Update the links…
  link = link.data(links, function(d) {
    return d.target.id;
  });

  // Exit any old links.
  link.exit().remove();

  // Enter any new links.
  link
    .enter()
    .insert("line", ".node")
    .attr("class", "link")
    .attr("x1", function(d) {
      return d.source.x;
    })
    .attr("y1", function(d) {
      return d.source.y;
    })
    .attr("x2", function(d) {
      return d.target.x;
    })
    .attr("y2", function(d) {
      return d.target.y;
    });

  // Update the nodes…
  node = node
    .data(nodes, function(d) {
      return d.id;
    })
    .style("fill", color);

  // Exit any old nodes.
  node.exit().remove();

  // Enter any new nodes.
  node
    .enter()
    .append("circle")
    .attr("class", "node")
    .attr("cx", function(d) {
      return d.x;
    })
    .attr("cy", function(d) {
      return d.y;
    })
    .attr("r", function(d) {
      return Math.sqrt(d.size) / 10 || 4.5;
    })
    .style("fill", color)
    .on("click", click)
    .call(force.drag);
}

function tick() {
  link
    .attr("x1", function(d) {
      return d.source.x;
    })
    .attr("y1", function(d) {
      return d.source.y;
    })
    .attr("x2", function(d) {
      return d.target.x;
    })
    .attr("y2", function(d) {
      return d.target.y;
    });

  node
    .attr("cx", function(d) {
      return d.x;
    })
    .attr("cy", function(d) {
      return d.y;
    });
}

// Color leaf nodes orange, and packages white or blue.
function color(d) {
  return d._children ? "#3182bd" : d.children ? "#c6dbef" : "#fd8d3c";
}

// Toggle children on click.
function click(d) {
  //logic behind the game
  document.getElementById("score").innerHTML = score++;
  var popup = document.getElementById("disablePopup");

  if (popup.checked != true) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-soft-info btn-sm",
        cancelButton: "btn btn-soft-danger btn-sm"
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.queue([
      {
        title: d.name,
        confirmButtonText: "Get info",
        html: "Click below to get information about " + d.name,
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return wtf
            .fetch(d.name, "en")
            .then(response => response.paragraphs(0).html())
            .then(data => {
              swalWithBootstrapButtons.insertQueueStep({
                title: d.name,
                html: data,
                width: 700
              });
            })
            .catch(() => {
              swalWithBootstrapButtons.insertQueueStep({
                type: "error",
                title: "Unable process your request!"
              });
            });
        }
      }
    ]);
  }

  if(d.name == 'life'){
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-soft-info btn-sm",
            cancelButton: "btn btn-soft-danger btn-sm"
        },
        buttonsStyling: false,
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Congratulations!',
        html: "You have found life after "+ (score-1) +" clicks",
        type: 'success',
    })
  }

  if (!d3.event.defaultPrevented) {
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
    }
    update();
  }
}

// Returns a list of all nodes under the root.
function flatten(root) {
  var nodes = [],
    i = 0;

  function recurse(node) {
    if (node.children) node.children.forEach(recurse);
    if (!node.id) node.id = ++i;
    nodes.push(node);
  }

  recurse(root);
  return nodes;
}
