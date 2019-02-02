import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableHighlight, TouchableOpacity, FlatList, ImageBackground ,AsyncStorage} from 'react-native';
import firebase from 'react-native-firebase';
import SenderMsgRow from './SenderMsgRow'
export default class ChatPage extends Component {

    constructor(props) {
        super(props);

        this.array = [],

            this.state = {
                textmessage: '',
                dataBaseRefrence: '',
                arrayHolder: [],
                fcmToken:'',
                uId:''
            }
    }

    componentDidMount() {
        const ref = firebase.database().ref("messages/chat_between_user_" + "1" + "_and_user_" + "2");
        this.setState({ dataBaseRefrence: ref })
        this.setState({ arrayHolder: [...this.array] })

        AsyncStorage.getItem('fcmToken').then((valueToken) => {
            console.log('fcmToken is ', valueToken);
            this.setState({fcmToken: valueToken})
           });
           
           AsyncStorage.getItem('userid').then((valueUid) => {
             console.log('userid is ', valueUid);
             this.setState({uId: valueUid})
            });

        firebase.database().ref("messages/chat_between_user_" + "1" + "_and_user_" + "2").on('value', (snapshot) => {
            var messageArray = [];
            snapshot.forEach((childSnapshot) => {
                var childData = childSnapshot.child("message").val();
                var senderId = childSnapshot.child("id").val();
                console.log('child data : - ', senderId)
                messageArray.push({
                    title: childData, id: senderId
                });
            });
            this.setState({ arrayHolder: messageArray })
        });
    }

    sendMessage = () => {

        this.state.dataBaseRefrence.push({
            message: this.state.textmessage,
            id: '2'
        })
        this.textInput.clear()
   
    }

    updateSingleData =() => {
     
 
            
            console.log('userid 11 is ', this.state.fcmToken + ' '+ this.state.uId);
        firebase.database().ref('users/'+this.state.uId).set({
            userid:this.state.uId,
            fcmToken: this.state.fcmToken        
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={require('./img/chat_background.png')} style={{ width: '100%', height: '100%' }}>

                    <FlatList style={{ marginTop: 0, marginBottom: 50, paddingEnd: 3, paddingLeft: 3, }}
                        ref={ref => this.flatList = ref}
                        onContentSizeChange={() => this.flatList.scrollToEnd({ animated: true })}
                        onLayout={() => this.flatList.scrollToEnd({ animated: true })}
                        data={this.state.arrayHolder}
                        extraData={this.state.arrayHolder}
                        renderItem={({ item }) => <SenderMsgRow msgText={item.title} senderId={item.id} />}
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
                                <TouchableOpacity underlayColor="white" onPress={this.updateSingleData}>
                                    <View style={styles.sendButtonContainerChild}>
                                        <Image style={styles.sendButtonImage} source={require('./img/sendbutton.png')} />
                                    </View>
                                </TouchableOpacity >
                            </View>

                        </View>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
    },
    bottom: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute', //Here is the trick
        bottom: 0, //Here is the trick
    },
    bottomChild: {
        flexDirection: 'row', flex: 1,       
    },
    messageInputText: {
        width: '80%', paddingStart: 20, borderRadius: 20, backgroundColor: '#fff', marginEnd: 5, marginStart: 5, marginBottom: 5,elevation: 4,
    },
    sendButtonContainer: {
        flex: 1, justifyContent: 'flex-end', backgroundColor: 'transparent'
    },
    sendButtonContainerChild: {
        elevation: 4, height: 50, width: 50, borderRadius: 50, backgroundColor: '#075e54', justifyContent: 'center', alignSelf: 'flex-end', alignItems: 'center', marginEnd: 5, marginBottom: 5
    },
    sendButtonImage: {

    },
})    