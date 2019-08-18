import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));




export default class DatePickers extends Component {
    emptyItem = {
        changwat: '',
        Birthday: '',
        Date:'',
        varx:''

    }


    constructor(props) {
        super(props);
        this.state = {
            setItem: this.emptyItem,
            
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        const item = { ...this.state.setItem };
        item[name] = value;
        
        this.setState({ setItem: item });
        console.log(item)
       
    }

    async handleSubmit(event) {

        event.preventDefault();
        const { setItem } = this.state;
        console.log(setItem)
        await fetch('http://localhost:8080/api/changwatx', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(setItem),
        });

    }


    render() {
        
        return <div>
            <form className={useStyles.container} noValidate>
                <TextField
                    id="date"
                    label="Birthday"
                    type="date"
                    defaultValue="2017-05-24"
                    className={useStyles.textField}
                    InputLabelProps={{
                        shrink: true,
                        readOnly: true,
                    }}
                    name="varx"
                    onChange={this.handleChange}

                />


            </form>
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Button color="primary" type="submit">Save</Button>
                </FormGroup>
            </Form>
        </div>
    }
}