var React = require("react");
var _ = require("lodash");

var Canvas = React.createClass({
  componentDidMount: function() {
    this.setState({
      ctx: this.getDOMNode().getContext("2d")
    });

    this.debugPolygon(this.props.points, this.props.name);
  },

  debugPolygon: function(polygon, name, size) {
    var canvas = this.getDOMNode();

    size = 250;
    var padding = 15;
    var titleOffset = 25;

    var ctx = canvas.getContext("2d");

    ctx.lineWidth = 1;
    ctx.lineJoin = "round";
    ctx.lineCap = "butt";

    ctx.strokeStyle = "rgba( 0, 0, 0, 1.0 )";

    // Paint background white

    ctx.fillStyle = "rgba( 255, 255, 255, 1.0 )";
    ctx.fillRect(0, 0, size, size);

    // Label polygon
    ctx.font = "12px Arial";
    ctx.textAlign = "left";
    ctx.textBaseline = "bottom";
    ctx.fillStyle = "rgba( 0, 0, 0, 1.0 )";
    ctx.fillText(name, 10, titleOffset);

    var min = {x: Infinity, y: Infinity};
    var max = {x: -Infinity, y: -Infinity};

    _.forEach(polygon, function(coords, index) {
      if (coords[0] > max.x) {
        max.x = coords[0];
      }

      if (coords[0] < min.x) {
        min.x = coords[0];
      }

      if (coords[1] > max.y) {
        max.y = coords[1];
      }

      if (coords[1] < min.y) {
        min.y = coords[1];
      }
    });

    // Scaling value to keep polygon within canvas
    var scale = (size - titleOffset - padding * 2) / Math.max(max.x - min.x, max.y - min.y);

    // Offset for centering polygon within canvas
    var offset = {x: (size - (max.x - min.x) * scale) / 2, y: (titleOffset / 2) + (size - (max.y - min.y) * scale) / 2};

    // Draw polygon

    ctx.beginPath();

    _.forEach(polygon, function(coords, index) {
      // Localise and scale coordinates
      var localCoords = {x: offset.x + (coords[0] - min.x) * scale, y: offset.y + (coords[1] - min.y) * scale};

      if (index === 0) {
        ctx.moveTo(localCoords.x, localCoords.y);
      } else {
        ctx.lineTo(localCoords.x, localCoords.y);
      }
    });

    ctx.closePath();

    //var r = Math.floor(Math.random()* 256);
    //var g = Math.floor(Math.random()* 256);
    //var b = Math.floor(Math.random()* 256);

    //var colour = "rgb(" + r + ", " + g + "," + b + ")";
    var colour = "#666";

    ctx.fillStyle = colour;
    ctx.fill();

    ctx.strokeStyle = "#333";
    ctx.stroke();

    // Draw vertices
    // TODO: De-duplicate all this looping and coordinate calculation

    var toggle = false;

    _.forEach(polygon, function(coords, index) {
      // Localise and scale coordinates
      var localCoords = {x: offset.x + (coords[0] - min.x) * scale, y: offset.y + (coords[1] - min.y) * scale};

      ctx.strokeStyle = (!toggle) ? "rgb(255, 0, 0)" : "rgb(0, 255, 0)";

      ctx.beginPath();

      if (!toggle) {
        ctx.moveTo(localCoords.x - 5, localCoords.y - 5);
        ctx.lineTo(localCoords.x + 5, localCoords.y + 5);
        ctx.moveTo(localCoords.x + 5, localCoords.y - 5);
        ctx.lineTo(localCoords.x - 5, localCoords.y + 5);
      } else {
        ctx.moveTo(localCoords.x - 6, localCoords.y);
        ctx.lineTo(localCoords.x + 6, localCoords.y);
        ctx.moveTo(localCoords.x, localCoords.y - 6);
        ctx.lineTo(localCoords.x, localCoords.y + 6);
      }

      ctx.stroke();

      toggle = (!toggle) ? true : false;
    });
  },

  render() {
    return (
      <canvas width={250} height={250} />
    );
  }
});

module.exports = Canvas;
