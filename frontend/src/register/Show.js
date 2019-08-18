import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {members: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('http://localhost:8080/api/members')
      .then(response => response.json())
      .then(data => this.setState({members: data, isLoading: false}));
  }

  async remove(id) {
    await fetch(`http://localhost:8080/api/member/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedMembers = [...this.state.members].filter(i => i.id !== id);
      this.setState({members: updatedMembers});
    });
  }

  render() {
    const {members, isLoading} = this.state;
    console.log(this.state.members)
    if (isLoading) {
      return <p>Loading...</p>;
    }

    const memberlist = members.map(member => {
    //   const address = `${group.address || ''} ${group.city || ''} ${group.stateOrProvince || ''}`;
      return <tr key={member.id}>
        <td style={{whiteSpace: 'nowrap'}}>{member.name}</td>
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
            <Button size="sm" color="primary" tag={Link} to={"/members/" + member.id}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(member.id)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/members">Add Member</Button>
          </div>
          <h3>Member list</h3>
          <Table className="mt-4">
            <thead>
            <tr>
              <th width="200%">Name</th>
            </tr>
            </thead>
            <tbody>
            {memberlist}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default Show;