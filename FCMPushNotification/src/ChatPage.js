import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableHighlight, FlatList } from 'react-native';
import firebase from 'react-native-firebase';
import SenderMsgRow from './SenderMsgRow'
export default class ChatPage extends Component {

    constructor(props) {
        super(props);

        this.array = [{
            title: 'ONE',id:'1'
        },
        {
            title: 'TWO',id:'2'
        },
        {
            title: 'THREE',id:'3'
        },
        {
            title: 'FOUR',id:'4'
        },
        {
            title: 'FIVE',id:'5'
        }
        ],

            this.state = {
                textmessage: '',
                dataBaseRefrence: '',
                arrayHolder: [],
            }
    }

    componentDidMount() {
        // int userOne = Integer.parseInt(contactid);
        // int userTwo = Integer.parseInt(prefManager.getLoggedInId());
        const ref = firebase.database().ref("messages/chat_between_user_" + "1" +"_and_user_" + "2");  
        this.setState({ dataBaseRefrence: ref })
        this.setState({ arrayHolder: [...this.array] })
  
        firebase.database().ref("messages/chat_between_user_" + "1" +"_and_user_" + "2").on('value', (snapshot) =>{
            var messageArray = [];
            snapshot.forEach((childSnapshot) => {
                var  childData = childSnapshot.child("message").val();
                var  senderId = childSnapshot.child("id").val();
                console.log('child data : - ',senderId)
                messageArray.push({
                    title: childData,id: senderId
                });
            });  
           this.setState({ arrayHolder: messageArray})
        });
    }

    sendMessage = () => {

        this.state.dataBaseRefrence.push({ 
            message: this.state.textmessage,
           id:'2'
        })
        this.textInput.clear()

    }

    render() {
        return (
            <View style={styles.container}>


                <FlatList style={{ marginTop: 0, marginBottom: 40, paddingEnd: 3, paddingLeft: 3, backgroundColor: 'green' }}
                    data={this.state.arrayHolder}
                    extraData={this.state.arrayHolder}
                    renderItem={({ item }) => <SenderMsgRow msgText= {item.title}  senderId={item.id}/>}
                    numColumns={1}
                    keyExtractor={(item) => item.toString()} />  


                <View style={styles.bottom}>
                    <View style={styles.bottomChild}>
                        <TextInput
                            style={styles.messageInputText}
                            placeholder='Enter a message'
                            onChangeText={TextInputValue => this.setState({ textmessage: TextInputValue })}
                            ref={input => { this.textInput = input }}
                            underlineColorAndroid="transparent" />

                        <View style={styles.sendButtonContainer}>
                            <TouchableHighlight onPress={this.sendMessage}>
                                <Image style={styles.sendButtonImage} source={require('./img/sendbutton.png')} />
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',

    },
    bottom: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute', //Here is the trick
        bottom: 0, //Here is the trick
    },
    bottomChild: {
        flexDirection: 'row', flex: 1
    },
    messageInputText: {
        width: '80%', paddingStart: 20, borderColor: 'green', borderWidth: 1
    },
    sendButtonContainer: {
        flex: 1, justifyContent: 'center', borderColor: 'red', borderWidth: 1
    },
    sendButtonImage: {
        alignSelf: 'flex-end', marginEnd: 20,
    }
})