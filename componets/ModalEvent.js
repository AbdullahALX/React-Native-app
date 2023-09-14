import { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Modal,
  Button,
  Pressable,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  FlatList,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const COLORS = {
  primary: '#7f44d4',
  white: '#fff',
  toSquare: '#B28FE5',
  brownColor: '#433E3E',
};

const ModalEvent = (props) => {
  const [visible, setVisible] = useState(true);

  return (
    <Modal
      style={styles.modal}
      animationType="slide"
      visible={visible}
      transparent={true}
      onRequestClose={() => {
        setVisible(!visible);
      }}
      on
    >
      <TouchableWithoutFeedback onPress={() => setVisible(!visible)}>
        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.3)',
          }}
        />
      </TouchableWithoutFeedback>

      <View style={styles.container}>
        <ScrollView style={{}}>
          <Text style={styles.desTitle}>Description</Text>

          <View style={{ width: '90%' }}>
            <Text adjustsFontSizeToFit style={styles.desText}>
              {props.description}
            </Text>
          </View>

          <Text style={styles.desTitle}>Invitees</Text>
          <View style={{ width: '90%', paddingBottom: 60 }}>
            <Text adjustsFontSizeToFit style={styles.desText}>
              {props.invitees}
            </Text>
          </View>
          <Text style={styles.desTitle}>Date & time</Text>
          <View style={{ width: '90%', paddingBottom: 60 }}>
            <Text adjustsFontSizeToFit style={styles.desText}>
              {props.dataOnly} {props.timeOnly}
            </Text>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  desTitle: {
    position: 'relative',
    fontSize: 22,
    textAlign: 'left',
    color: COLORS.toSquare,
    fontWeight: '800',
    marginLeft: 33,
    marginTop: 35,
    letterSpacing: 1,

    padding: 10,
    width: '40%',
  },
  desText: {
    fontSize: 17,
    textAlign: 'left',
    color: COLORS.brownColor,
    marginLeft: 43,
    marginTop: 5,
    textAlign: 'left',
    fontWeight: '500',
  },
  container: {
    height: height * 0.4,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: COLORS.white,
    borderColor: COLORS.primary,
    borderTopLeftRadius: 50,
  },
  modal: {},
});

export default ModalEvent;
