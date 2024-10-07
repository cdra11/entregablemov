import React, { useState } from 'react'
import { View } from 'react-native'
import { Button, Snackbar, Text, TextInput } from 'react-native-paper'
import { styles } from '../theme/styles'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebaseConfig'
import { CommonActions, useNavigation } from '@react-navigation/native'

//interfaz - FormLogin
interface FormLogin {
    email:string,
    password:string
}

//interfaz
interface ShowMessage{
    visible:boolean;
    message:string;
    color:string;
  }
const LoginScreen = () => {

//hoook - useState
const [formLogin, setformLogin] = useState<FormLogin>({
    email:"",
    password:""
})

// hook - useState: permitir que la contraseña sea visible o no.
const [hiddenPassword, sethiddenPassword] = useState<boolean>(true);

//hook - useState: cambiar el estado del mensaje
const [showMessage, setshowMessage] = useState<ShowMessage>({
    visible:false,
    message:"",
    color:'#fff'
      }
    );

//hook - useNavigation: permitir la navegación de un screen a otro.

const navigation = useNavigation();

//función: actualizar el estado del formulario
    const handleSetValues=(key:string, value:string)=>{
        setformLogin({...formLogin, [key]:value});
    }

//función: iniciar sesión con el usuario registrado
const handleSignIn= async()=>{
    if(!formLogin.email || !formLogin.password){
        setshowMessage({
            visible:true,
            message:'Completa todos los campos!',
            color:'#8c0f0f'
        });
        return;
    }
    console.log(formLogin);
    try{
    const response = await signInWithEmailAndPassword(
        auth,
        formLogin.email,
        formLogin.password
    );
    //console.log(response);
} catch(e){
    console.log(e);
    setshowMessage({
        visible:true,
        message:'Correo y/o contraseña incorrecta.',
        color:'#8c0f0f'
    });
}
}

    return (
        <View style={styles.root}>
        <Text style={styles.text}>Inicia Sesión</Text>
        <TextInput
          label="Correo"
          mode='outlined'
          placeholder='Escribe tu correo'
          onChangeText={(value)=>handleSetValues('email',value)}
        />
        <TextInput
          label="Contraseña"
          mode='outlined'
          placeholder='Escribe tu contraseña'
          secureTextEntry = {hiddenPassword}
          onChangeText={(value)=>handleSetValues('password',value)}
          right={<TextInput.Icon icon='eye' onPress={()=>sethiddenPassword(!hiddenPassword)}>
    
          </TextInput.Icon>}
        />
          <Button mode="contained" onPress={handleSignIn}>
        Iniciar
      </Button>
      <Text style={styles.textRedirect}
      onPress={()=>navigation.dispatch(CommonActions.navigate({name:'Register'}))}>
            ¿No tienes una cuenta? Regístrate ahora.
            </Text>
      <Snackbar
            visible={showMessage.visible}
            onDismiss={()=>setshowMessage({...showMessage,visible:false})}
            style={{...styles.message,
    
            }}>
            {showMessage.message}
          </Snackbar>
        </View>
      )
    }

export default LoginScreen
