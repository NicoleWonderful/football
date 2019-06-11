import React, { Fragment } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Checkbox, Radio, Table, Badge } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import reqwest from 'reqwest';


class App extends React.Component {
  state = {
    data: [],
    loading: false,
    lang: 1,
    showRed: true,
    showYellow: true
  };
  fetch = () => {
    this.setState({ loading: true });
    reqwest({
      url: 'worldcup2018.json',
      method: 'get',
      type: 'json',
    }).then(data => {
      this.setState({
        data: data.results,
        loading: false
      });
    });
  };
  componentDidMount() {
    this.fetch();
  }
  handleLanChange = (e) => {
    this.setState({
      lang: e.target.value
    })
  }
  handleShowRed = (e) => {
    this.setState({
      showRed: e.target.checked
    })
  }
  handleShowRed = (e) => {
    this.setState({
      showYellow: e.target.checked
    })
  }
  render() {
    const columns = [
      {
        title: '賽事',
        dataIndex: 'league',
        render: event => <span>{event[this.state.lang]}</span>
      },
      {
        title: '時間',
        dataIndex: 'matchTime',
        render: (value, record) => <span title={record.matchYear + "-" + record.matchDate + "-" + record.matchTime}>{record.matchDate + "-" + record.matchTime}</span>
      },
      {
        title: '主隊',
        dataIndex: 'home',
        render: (home,record) => <div>
            <Badge
              className="mr-2"
              count={record.homeYellow}
            style={{ display: this.state.showYellow ? 'block' : 'none',backgroundColor: 'yellow', border:'1px solid black' ,borderRadius:'0',color: 'black', boxShadow: '0 0 0 1px #d9d9d9 inset' }}
            />
            <Badge
              className="mr-2"
              count={record.homeRed}
            style={{ display: this.state.showRed ? 'block' : 'none',backgroundColor: 'red', border:'1px solid black' ,borderRadius: '0' ,color: '#fff', boxShadow: '0 0 0 1px #d9d9d9 inset' }}
            />
        <span>{home[this.state.lang]}</span>
        </div>
      },
      {
        title: '全場比分',
        dataIndex: 'score',
        render: (value, record) => <span>{record.homeScore}-{record.guestScore}</span>
      },
      {
        title: '客隊',
        dataIndex: 'guest',
        render: (guest,record) => <div>
          <span>{guest[this.state.lang]}</span>
          <Badge
            className="m1-2"
            count={record.guestRed}
            style={{display:this.state.showRed ? 'block' : 'none', backgroundColor: 'red', border: '0.5px solid black', borderRadius: '0', color: '#fff', boxShadow: '0 0 0 1px #d9d9d9 inset' }}
          />
          <Badge
            className="m1-2"
            count={record.guestYellow}
            style={{ display: this.state.showYellow ? 'block' : 'none' ,backgroundColor: 'yellow', border: '0.5px solid black', borderRadius: '0', color: 'black', boxShadow: '0 0 0 1px #d9d9d9 inset' }}
          />
        </div>
      },
      {
        title: '半場比分',
        dataIndex: 'halfScore',
        render: (value, record) => <span>{record.homeHalfScore}-{record.guestHalfScore}</span>
      }
    ];
    return (
      <Fragment>
        <nav className="navbar bg-dark text-white">
          <div className="container">
            <span className="navbar-brand mb-0 h1">Navbar</span>
          </div>
        </nav>
        <div className="container mt-3">
          <div className="filter my-3">
            <Checkbox checked={this.state.showRed} onChange={this.handleShowRed}>顯示紅牌</Checkbox>
            <Checkbox checked={this.state.showYellow} onChange={this.handleShowYellow}>顯示黃牌</Checkbox>
            <Radio.Group defaultValue="this.state.lang" onChange={this.handleLanChange}>
              <Radio.Button value="0">简体</Radio.Button>
              <Radio.Button value="1">繁體</Radio.Button>
              <Radio.Button value="2">English</Radio.Button>
            </Radio.Group>
          </div>
          <Table dataSource={this.state.data}
            columns={columns}
            size="middle"
            pagination={false}
            rowKey={record => record.matchId}
            loading={this.state.loading}
          />
          </div>
      </Fragment>
    )
  }
 
}

export default App;
