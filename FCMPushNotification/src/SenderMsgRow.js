import React,{ Component } from 'react'
import {View ,Text,StyleSheet} from 'react-native'

const SenderMsgRow = (props) =>{
  //  console.log('sender id : - ',props.senderId)
    return(
        <View style = {styles.container}>

           {props.senderId === '2' ? <Text style={styles.textMessage}>{props.msgText} </Text>:

             <Text style={styles.textMessagen}>{props.msgText}</Text>}
        </View>
    )
}
export default SenderMsgRow  

const styles = StyleSheet.create({
    container:{
        flex: 1, justifyContent: 'center'  
    },
    textMessage: {
        alignSelf: 'flex-end', marginEnd: 10,backgroundColor:'#dcf8c7',margin:10,marginStart:80,padding:10, borderRadius: 5,    
    },
    textMessagen: {
        alignSelf: 'flex-start',backgroundColor:'white',margin:10,marginEnd:100,padding:10
    }
})