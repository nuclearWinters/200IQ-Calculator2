import React, { Component } from "react"
import { StyleSheet, Image, Text, View, YellowBox, Button, TextInput } from 'react-native';
import { auth } from "./firebaseData"

class LoginScreen extends Component {
    constructor(){
        super();
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePass = this.handleChangePass.bind(this);
        this.state = {
            email: null,
            password: null
        }
    }
    static navigationOptions = {
        title: 'Login',
    };

    componentWillMount(){
        auth.onAuthStateChanged(firebase_user => {
            console.log(firebase_user)
            if (firebase_user) {
                this.props.navigation.navigate('Main')
            }
        })
    }

    handleChangeEmail(e){
        this.setState(
            {
                email: e
            }
        )
    }

    handleChangePass(e){
        this.setState(
            {
                password: e
            }
        )
    }

    render() {
        return (
            <View>
                <TextInput
                    placeholder="E-mail goes here..."
                    onChangeText={this.handleChangeEmail}
                />
                <TextInput
                    placeholder="Password goes here..."
                    onChangeText={this.handleChangePass}
                />
                <Button
                    title="SUBMIT"
                    onPress={() => {
                        const promise = auth.signInAndRetrieveDataWithEmailAndPassword(this.state.email, this.state.password)
                        promise.catch(error => {console.log(error.message)})
                    }}
                />
            </View>
        );
    }
}

export default LoginScreen