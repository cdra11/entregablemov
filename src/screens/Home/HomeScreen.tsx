import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Avatar, Text } from 'react-native-paper'
import { styles } from '../../theme/styles'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';

//Interfaz - FormUser
interface UserAuth{
    name:string;

}

export const HomeScreen = () => {
    //hook useState - formulario: cambiar el esado del formulario
    const [userAuth, setUserAuth] = useState<UserAuth>({
        name:""
    });
    //hook useEffect: validar el estado de autenticación
    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user){
            setUserAuth({name:user.displayName ?? 'NA'})
        }
      })
    }, [])
    

  return (
    <View style={styles.rootHome}>
        <View style={styles.headerHome}>
        <Avatar.Text size={50} label='JX'></Avatar.Text>
        <View>
            <Text variant='bodySmall'>
                Bienvenido.
            </Text>
            <Text variant='labelLarge'>
                {userAuth.name}
            </Text>
        </View>
        </View>
    </View>
  )
}

export default HomeScreen
