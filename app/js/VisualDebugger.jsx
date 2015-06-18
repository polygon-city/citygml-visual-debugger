var React = require("react");
var _ = require("lodash");
var mui = require("material-ui");
var ThemeManager = new mui.Styles.ThemeManager();
var TextField = mui.TextField;
var RaisedButton = mui.RaisedButton;
var Paper = mui.Paper;
var Canvas = require("./Canvas");

var points3dto2d = require("points-3d-to-2d");

var citygmlPolygons = require("citygml-polygons");
var citygmlBoundaries = require("citygml-boundaries");
var citygmlPoints = require("citygml-points");

var VisualDebugger = React.createClass({
  getInitialState: function() {
    return {
      citygml: "",
      points: []
    };
  },

  onInputChange: function(e) {
    this.setState({
      citygml: e.target.value
    });
  },

  onVisualiseClick: function(e) {
    this.processCitygml(this.state.citygml);
  },

  processCitygml: function(citygml) {
    var polygons = citygmlPolygons(citygml);

    var pointsArr = [];

    _.each(polygons, function(polygon, pIndex) {
      var boundaries = citygmlBoundaries(polygon);
      var points = citygmlPoints(boundaries.exterior[0]);
      var points2d = points3dto2d(points);

      pointsArr.push(points2d.points);
    });

    this.setState({
      points: pointsArr
    });
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  render() {
    var containerStyleLeft = {
      boxSizing: "border-box",
      height: "100%",
      position: "fixed",
      minWidth: "300px",
      width: "20%",
      padding: "20px"
    };

    var containerStyleRight = {
      boxSizing: "border-box",
      padding: "20px",
      margin: "0 0 0 20%",
      width: "80%"
    };

    var canvasses = [];
    _.each(this.state.points, function(points, pIndex) {
      canvasses.push(
        <Canvas key={pIndex} points={points} name={pIndex} />
      );
    });

    var output;

    if (canvasses.length > 0) {
      output = (
        <Paper style={{padding: "10px"}}>
          {canvasses}
        </Paper>
      );
    }

    return (
      <div>
        <section style={containerStyleLeft}>

          <h1>Visual CityGML Debugger</h1>

          <TextField hintText="Paste CityGML" fullWidth={true} onChange={this.onInputChange} />

          <RaisedButton label="Visualise" primary={true} style={{marginTop: "10px"}} onClick={this.onVisualiseClick} />

        </section>

        <section style={containerStyleRight}>
          {output}
        </section>
      </div>
    );
  }
});

module.exports = VisualDebugger;
