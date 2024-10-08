import React, { useState } from 'react'
import { View } from 'react-native'
import { Button, Snackbar, Text, TextInput } from 'react-native-paper'
import { styles } from '../theme/styles'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebaseConfig'
import { CommonActions, useNavigation } from '@react-navigation/native'

//interfaz - FormRegister
interface FormRegister {
    email:string,
    password:string

}

//interfaz
interface ShowMessage{
  visible:boolean;
  message:string;
  color:string;
}


const RegisterScreen = () => {
    //hook - useState: cambiar el estado del formulario
    const [formRegister, setformRegister] = useState<FormRegister>({
        email:"",
        password:"",
    });

    //hook - useState: cambiar el estado del mensaje
    const [showMessage, setshowMessage] = useState<ShowMessage>({
      visible:false,
      message:"",
      color:'#fff'
    }
    );

    // hook - useState: permitir que la contraseña sea visible o no.
    const [hiddenPassword, sethiddenPassword] = useState<boolean>(true);

    //hook - useNavigation: permitir la navegación de un screen a otro.
    const navigation = useNavigation();

    //función: actualizar el estado del formulario
    const handleSetValues=(key:string, value:string)=>{
        setformRegister({...formRegister, [key]:value});
    }

    //función: registrar nuevos usuarios
    const handleRegister=async()=>{
        if(!formRegister.email || !formRegister.password){
            setshowMessage({
              visible:true,
              message:'Completa todos los campos',
              color:'#8c0f0f'
            });
            return;
        }
        console.log(formRegister);
        try{
        const response = await createUserWithEmailAndPassword(
          auth,
          formRegister.email,
          formRegister.password
        );
        setshowMessage({
          visible:true,
          message:'Registro exitoso',
          color:'#2cc84b'
        });
      }catch(e){
        console.log(e);
        setshowMessage({
          visible:true,
          message:'No se logró completar la acción. Intente más tarde.',
          color:'#8c0f0f'
        });

      }
    }

  return (
    <View style={styles.root}>
    <Text style={styles.text}>Regístrate</Text>
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
      <Button mode="contained" onPress={handleRegister}>
    Registrar
  </Button>
  <Text style={styles.textRedirect}
      onPress={()=>navigation.dispatch(CommonActions.navigate({name:'Login'}))}>
            ¿Ya tienes una cuenta? Inicia sesión ahora.
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

export default RegisterScreen
