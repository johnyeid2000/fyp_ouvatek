import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, FlatList, Button, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';

const DevicesScreen = () => {
  const devices = [
    { id: 1, name: 'Cosinus Device' },
    { id: 2, name: 'Watch' },
    { id: 3, name: 'Fitbit' },

  ];

  const [selectedDevice, setSelectedDevice] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const onSearchDevicePressed = () => {
    setShowModal(true);
  };

  const selectDevice = (device) => {
    setSelectedDevice(device);
    setShowModal(false);
  };

  return (
    <View>

      {/* <View style={styles.btnView}>
        <CustomButton
          text="Add a device"
          onPress={onSearchDevicePressed}
          type='Primary'
        />
      </View> */}

      <Pressable onPress={onSearchDevicePressed} >
        <Icon name='plus' style={styles.icon} />
      </Pressable>

      <View style={styles.txtView}>
        {selectedDevice ? (
          <Text style={styles.txt}>Selected device: {selectedDevice.name}</Text>
        ) : (
          <Text style={styles.txt}>No Device connected</Text>
        )}
      </View>

      <Modal
        visible={showModal}
        animationType='slide'
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalView}>
          <FlatList
            data={devices}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.deviceItem}
                onPress={() => selectDevice(item)}
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}
          />

          <View style={{ marginTop: 20, width: 150 }}>
            <Button
              onPress={() => setShowModal(false)}
              title="Cancel"
              color="#651B70"
            />
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default DevicesScreen;
