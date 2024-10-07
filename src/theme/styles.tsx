import { StyleSheet } from 'react-native';

export const styles=StyleSheet.create({
    root:{
        flex:1,
        justifyContent: 'center',
        padding:20,
        gap:10
    },
    text:{
        fontSize:20,
        fontWeight:'bold',
        textAlign:'center',
    },
    message:{
        width:400,
        alignContent:'center',
    },
    textRedirect:{
        marginTop:20,
        textAlign:'center',
        fontSize:15,
        fontWeight:'bold',
        color:'#5d2593'
    },
    rootActivity: { 
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center" 
    },
    rootHome: {
        flex: 1,
        marginHorizontal: 20,
        marginVertical: 50,
        fontSize: 20,
      },
      headerHome: {
        flexDirection: "row",
        gap: 15,
        alignItems: "center",
        fontSize: 60,
      },
      icon: {
        alignItems: "flex-end",
        flex: 1,
      },
})