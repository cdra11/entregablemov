import React, { useState } from "react";
import { View } from "react-native";
import {
  Button,
  Divider,
  IconButton,
  Modal,
  Portal,
  Snackbar,
  Text,
  TextInput,
} from "react-native-paper";
import { styles } from "../../../theme/styles";
import { push, ref, set } from "firebase/database";
import { auth, dbRealTime } from "../../../../src/config/firebaseConfig";
//interface-props
interface Props {
  showModalProduct: boolean;
  setshowModalProduct: Function;
}
// interface formProduct
interface FormProduct {
  author: string;
  book: string;
  price: number;
  stock: number;
  description: string;
}
//interface message
interface showMessage {
  visible: boolean;
  message: string;
  color: string;
}

const NewProductComponent = ({
  showModalProduct,
  setshowModalProduct,
}: Props) => {
  //hook useState:cambiar el estado del formulario
  const [formProduct, setformProduct] = useState<FormProduct>({
    author: "",
    book: "",
    price: 0,
    stock: 0,
    description: "",
  });
  //hooks cambiar estado del mensaje
  const [showMessage, setshowMessage] = useState<showMessage>({
    visible: false,
    message: "",
    color: "#fff",
  });
  //funcion :actualizar el estado del formulario
  const handleSetValues = (key: string, value: string) => {
    setformProduct({ ...formProduct, [key]: value });
  };
  //funcion guardar los productos
  const handleSaveProduct = async () => {
    if (
      !formProduct.author ||
      !formProduct.book ||
      !formProduct.price ||
      !formProduct.stock ||
      !formProduct.description
    ) {
      setshowMessage({
        visible: true,
        message: "Completa todos los campos",
        color: "#7a0808",
      });
      return;
    }
    //console.log(formProduct);
    //1 crear direccionar a base de datos
    const dbRef = ref(dbRealTime, "libros/" + auth.currentUser?.uid);
    //2 crear coleccion que agregue los datos en la dbRef
    const saveProduct = push(dbRef);
    //almacenar datos en basededatos
    try {
      await set(saveProduct, formProduct);
      //cerrar modal
      setshowModalProduct(false);
    } catch (e) {
      console.log(e);
      setshowMessage({
        visible: true,
        message: "No se completo la transacción, intentalo mas tarde",
        color: "#7a0808",
      });
    }
  };
  return (
    <View>
      <Portal>
        <Modal visible={showModalProduct} contentContainerStyle={styles.Modal}>
          <View>
            <Text variant="headlineSmall">Nuevo libro</Text>
            <View style={styles.icon}>
              <IconButton
                icon="close-circle-outline"
                size={30}
                onPress={() => setshowModalProduct(false)}
              />
            </View>
          </View>
          <Divider />
          <TextInput
            label="Autor"
            mode="outlined"
            onChangeText={(value) => handleSetValues("author", value)}
          />
          <TextInput
            label="Libro"
            mode="outlined"
            onChangeText={(value) => handleSetValues("book", value)}
          />
          <View style={styles.rootInputsProduct}>
            <TextInput
              label="Precio"
              mode="outlined"
              keyboardType="numeric"
              style={{ width: "45%" }}
              onChangeText={(value) => handleSetValues("price", value)}
            />
            <TextInput
              label="Stock"
              mode="outlined"
              keyboardType="numeric"
              style={{ width: "45%" }}
              onChangeText={(value) => handleSetValues("stock", value)}
            />
          </View>
          <TextInput
            label="Descripcion"
            mode="outlined"
            multiline
            numberOfLines={3}
            onChangeText={(value) => handleSetValues("description", value)}
          />
          <Button mode="contained" onPress={handleSaveProduct}>
            Agregar
          </Button>
        </Modal>
      </Portal>
      <Snackbar
        visible={showMessage.visible}
        onDismiss={() => setshowMessage({ ...showMessage, visible: false })}
        style={{ ...styles.message, backgroundColor: showMessage.color }}
      >
        {showMessage.message}
      </Snackbar>
    </View>
  );
};

export default NewProductComponent;