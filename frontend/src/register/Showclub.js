import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';

class Showclub extends Component {

  constructor(props) {
    super(props);
    this.state = {clubs: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('http://localhost:8080/api/clubs')
      .then(response => response.json())
      .then(data => this.setState({clubs: data, isLoading: false}));
  }

  async remove(clubId) {
    await fetch(`http://localhost:8080/api/clubs/${clubId}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedClubs = [...this.state.clubs].filter(i => i.clubId !== clubId);
      this.setState({clubs: updatedClubs});
    });
  }

  render() {
    const {clubs, isLoading} = this.state;
    console.log(this.state.clubs)
    if (isLoading) {
      return <p>Loading...</p>;
    }

    const clublist = clubs.map(club => {
    //   const address = `${group.address || ''} ${group.city || ''} ${group.stateOrProvince || ''}`;
      return <tr key={club.clubId}>
        <td style={{whiteSpace: 'nowrap'}}>{club.clubName}</td>
        {/* <td>{address}</td>
        <td>{group.events.map(event => {
          return <div key={event.id}>{new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: '2-digit'
          }).format(new Date(event.date))}: {event.title}</div>
        })}</td> */}


        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/clubs/" + club.clubId}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(club.clubId)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/clubs">Add Club</Button>
          </div>
          <h3>Club</h3>
          <Table className="mt-4">
            <thead>
            <tr>
              <th width="200%">Name</th>
            </tr>
            </thead>
            <tbody>
            {clublist}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default Showclub;