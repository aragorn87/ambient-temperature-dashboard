import React from 'react';
import Plot from 'react-plotly.js';

class PlotlyTest extends React.Component {
  render() {
    let x = []
    let y = []
    this.props.data.forEach((entry) => {
        x.push(entry.x)
        y.push(entry.y)
    })
    return (
      <Plot
        data={[
          {
            x: x,
            y: y,
            type: 'line',
            mode: 'lines+markers',
            marker: {color: 'red'},
          },
        //   {type: 'bar', x:x, y: y},
        ]}
        layout={ {width: 1200, height: 500, paper_bgcolor: 'rgba(0,0,0,0)', plot_bgcolor:'rgba(0,0,0,0)'} }
      />
    );
  }
}

export default PlotlyTest