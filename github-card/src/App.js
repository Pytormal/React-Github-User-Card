import React from 'react';
import axios from 'axios';
import './App.css';

class App extends React.Component {
  state = {
    gitcards: ['https://api.github.com/users/pytormal'],
    newCard: 'friends',
    card: 'pytormal'
  }
  componentDidMount() {
    axios.get('https://api.github.com/users/pytormal/followers')
      .then(res => {
        this.setState({ gitcards: res.data.message })
          
      })
      .catch(err => console.error(err));
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.card !== this.state.card) {
      axios.get(`https://api.github.com/users/pytormal/followers`)
        .then(res => {
        this.state({ card: res.data.message})
        })
      .catch(err => console.error(err))
  }
  }

  handleClick = e => {
    this.setState({
      card: this.state.newCard
    });
  }
  
    handleChange = e => {
      this.setState({
        newCard: e.target.value
      })
    }
  
  render() {
    return (
      <>
        <input value={this.state.newCard} onChange={this.handleChange} /><button onClick={this.handleClick}> search name</button>
        {this.state.gitcards.map(followers_url => {
          return <div key={followers_url}><img src={followers_url} alt='friend cards'/></div>
        })}
        </>
    )
  }
}

export default App;
