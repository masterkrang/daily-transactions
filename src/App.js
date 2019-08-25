import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import CanvasJSReact from './assets/canvasjs.react';
import '../node_modules/react-vis/dist/style.css';


import {
  makeWidthFlexible,
  HorizontalGridLines,
  VerticalGridLines,
  XAxis,
  XYPlot,
  YAxis,
  LineMarkSeries,
  LineSeries
} from 'react-vis';

const FlexibleXYPlot = makeWidthFlexible(XYPlot);


class App extends React.Component {

  constructor() {
    super();

    this.state = {
      data: [],
      width: 0,
      height: 0,
      token: "MAIL"
    }

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

    this.db = firebase.firestore();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);

    this.db.collection('transactions').where('token', '==', this.state.token).orderBy('day').limit(100).get().then((querySnapshot) => {
      let arr = [];
      let acc = 0;
      querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data().count}`);
          let d = doc.data()
          let txs = d.count
          let day = d.day
          let date = new Date(day);
          let dateString = `${date.getMonth()}/${date.getDate()}/${date.getYear()}`
          arr.push({x: date, y: txs})
      });
      console.log(arr)
      this.setState({data: arr})
    });

  }

  render() {
		return (
      <div>
        <h1>daily txs</h1>
        <h2>{this.state.token}</h2>
        <XYPlot
          xType="time"
          width={this.state.width - 100}
          height={500}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis title="day" />
          <YAxis title="daily txs" />
              <LineSeries
                  data={this.state.data}
                  style={{stroke: 'violet', strokeWidth: 10}}/>
        </XYPlot>
      </div>

		);
  }
}

export default App;
